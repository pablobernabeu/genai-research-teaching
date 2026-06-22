// group.js — the GROUP app.
//
// Flow: sign in anonymously → create a new group (transaction that also claims the
// name) OR join an existing one by code → live-edit the core five with autosave →
// submit for review → see approve/reopen outcomes.
//
// Every Firestore call here is shaped to match exactly one of the allow-rules in
// firestore.rules. The comments flag which rule each operation targets, because the
// app is also a teaching exhibit. Nothing here is a security control: the rules are.

import {
  doc, getDoc, updateDoc, onSnapshot, runTransaction,
  collection, arrayUnion, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  signInAnonymously, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { db, auth, normaliseName, generateJoinCode, SCENARIOS, friendlyError } from "./common.js";

// ---- DOM handles -----------------------------------------------------------
const $ = (id) => document.getElementById(id);
const authNotice = $("authNotice");
const loginView = $("loginView");
const loginForm = $("loginForm");
const loginError = $("loginError");
const loginSubmit = $("loginSubmit");
const workView = $("workView");
const groupTitle = $("groupTitle");
const statusBadge = $("statusBadge");
const joinCodeDisplay = $("joinCodeDisplay");
const copyCode = $("copyCode");
const reopenedNotice = $("reopenedNotice");
const approvedNotice = $("approvedNotice");
const submittedNotice = $("submittedNotice");
const workForm = $("workForm");
const scenarioSel = $("scenario");
const oversightSel = $("oversight");
const saveState = $("saveState");
const submitBtn = $("submitBtn");
const workError = $("workError");
const ownProblemNotice = $("ownProblemNotice");
const timerChip = $("timerChip");
const timerAnnounce = $("timerAnnounce");

// The response textareas we autosave. 'fieldUse' is the optional field reflection — not
// part of the in-build "core three", but stored and restored like the rest.
const RESPONSE_FIELDS = ["problem", "artefact", "caughtErrors", "map", "oversightWhy", "insight", "fieldUse"];
// (oversight is a response too, but it is a <select> handled alongside the textareas)

let uid = null;
let groupId = null;
let unsubscribe = null;   // group doc listener
let currentDoc = null;    // latest snapshot data
let applyingRemote = false; // guard so remote snapshots don't trigger autosave
let saveTimer = null;
// Sticky for this visit: remember the facilitator's reopen note and keep the
// "Resubmit" label across snapshots until a fresh submit. (The doc itself stays
// 'reopened' while edited, so this is mostly belt-and-braces.)
let wasReopened = false;
let reopenedNote = "";

// ---- helpers ---------------------------------------------------------------
function showLoginError(msg) {
  loginError.textContent = msg;
  loginError.hidden = false;
}
function clearLoginError() {
  loginError.hidden = true;
  loginError.textContent = "";
}
function showWorkError(msg) {
  workError.textContent = msg;
  workError.hidden = false;
}
function clearWorkError() {
  workError.hidden = true;
  workError.textContent = "";
}

// Populate the scenario <select> from the shared SCENARIOS list.
function buildScenarioOptions() {
  const placeholder = document.createElement("option");
  placeholder.value = "";
  placeholder.textContent = "— choose a scenario —";
  scenarioSel.appendChild(placeholder);
  for (const s of SCENARIOS) {
    const opt = document.createElement("option");
    opt.value = s.scenario;
    opt.textContent = s.label;
    scenarioSel.appendChild(opt);
  }
}

// Look up the track letter for a chosen scenario label.
function trackForScenario(scenario) {
  const found = SCENARIOS.find((s) => s.scenario === scenario);
  return found ? found.track : "";
}

// ---- Auth ------------------------------------------------------------------
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    authNotice.hidden = true;
    // Only reveal the login form once we actually have an anonymous identity,
    // because both create and join require request.auth != null.
    if (!groupId) loginView.hidden = false;
  } else {
    uid = null;
  }
});

(async function init() {
  buildScenarioOptions();
  let signedIn = false;
  try {
    // The group app always runs as an anonymous user (READ/CREATE/UPDATE rules all
    // require request.auth != null; ownerUids records this uid).
    const cred = await signInAnonymously(auth);
    uid = cred.user.uid;
    signedIn = true;
  } catch (err) {
    authNotice.className = "notice error";
    authNotice.textContent =
      "Could not connect. Check your connection and reload. " + friendlyError(err);
  }
  if (signedIn) {
    // P2: silently resume the group from last time (after a reload/disconnect) before we
    // fall back to the login screen.
    await maybeResume();
    // Watch the facilitator's optional session countdown (any signed-in user may read it).
    watchClock();
  }
})();

// RESUME — after a reload or a dropped connection, get the group straight back to work
// without retyping name + code. We persisted {groupId, joinCode, name} in localStorage.
// The anon uid usually survives a reload, so a direct read succeeds (only owners can read a
// non-approved doc) and we re-attach. If the uid rotated, we silently re-join with the
// stored code (works while draft/reopened). Anything else falls back to the login screen.
async function maybeResume() {
  const stored = readStoredSession();
  if (!stored || !stored.groupId) return;
  const groupRef = doc(db, "groups", stored.groupId);
  try {
    const snap = await getDoc(groupRef);
    if (!snap.exists()) { clearStoredSession(); return; }
    if (snap.data().status === "approved") {
      // Approved work is done and public — do not silently reopen it. Show login.
      clearStoredSession();
      return;
    }
    // A non-approved doc we can read means we are still an owner: re-attach directly.
    enterGroup(stored.groupId);
  } catch (err) {
    // permission-denied => our anon uid rotated and we are no longer an owner.
    if (stored.joinCode && stored.name) {
      try {
        await joinGroup(normaliseName(stored.name), String(stored.joinCode).toUpperCase());
        return; // joinGroup re-adds us and calls enterGroup
      } catch (_) { /* group locked, submitted or gone — fall through to login */ }
    }
    clearStoredSession();
  }
}

// ---- Create or join --------------------------------------------------------
loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  clearLoginError();
  if (!uid) {
    showLoginError("Still connecting — please wait a moment and try again.");
    return;
  }

  const rawName = $("groupName").value;
  const nameLower = normaliseName(rawName);
  const typedCode = $("joinCode").value.trim().toUpperCase();
  // The per-session passcode only matters when CREATING (blank join code). Joining
  // must never send it — the join rule rejects any change beyond ownerUids/updatedAt.
  const sessionCode = $("sessionCode").value.trim();

  if (!nameLower) {
    showLoginError("Please enter a group name.");
    return;
  }

  // Creating (no join code) requires the facilitator's session passcode up front, so
  // we fail fast with a clear message rather than attempting a write the rule denies.
  if (!typedCode && !sessionCode) {
    showLoginError("Enter the session passcode to start a group.");
    return;
  }

  loginSubmit.disabled = true;
  loginSubmit.textContent = typedCode ? "Joining…" : "Creating…";

  try {
    if (typedCode) {
      await joinGroup(nameLower, typedCode);
    } else {
      await createGroup(rawName.trim(), nameLower, sessionCode);
    }
  } catch (err) {
    // friendlyError + specific messages thrown below
    showLoginError(err.userMessage || friendlyError(err));
  } finally {
    loginSubmit.disabled = false;
    loginSubmit.textContent = "Continue";
  }
});

// CREATE — a transaction that (a) claims groupNames/{nameLower} (fails if taken)
// and (b) creates groups/{newId}. Doing both in one transaction means a name can
// never be claimed without its group, or vice versa.
//
// Matches: groupNames create rule (only {groupId}) and groups create rule
// (ownerUids == [uid], status 'draft', name/nameLower/joinCode strings, code >= 4,
// and sessionCode == config/app.sessionCode — the per-session passcode gate).
async function createGroup(displayName, nameLower, sessionCode) {
  const newId = doc(collection(db, "groups")).id; // client-generated id
  const joinCode = generateJoinCode();
  const nameRef = doc(db, "groupNames", nameLower);
  const groupRef = doc(db, "groups", newId);

  try {
    await runTransaction(db, async (tx) => {
      const existing = await tx.get(nameRef);
      if (existing.exists()) {
        const taken = new Error("name-taken");
        taken.userMessage = "That name is already taken — please choose another.";
        throw taken;
      }
      // Uniqueness index: holds only a pointer, no secrets.
      tx.set(nameRef, { groupId: newId });
      // The group document. ownerUids MUST be exactly [uid] and status 'draft' to
      // satisfy the create rule. The typed sessionCode must equal the facilitator's
      // config/app.sessionCode or the rule denies the create. responses start as
      // empty strings (oversight uses '').
      tx.set(groupRef, {
        name: displayName,
        nameLower,
        joinCode,
        sessionCode,
        ownerUids: [uid],
        status: "draft",
        scenario: "",
        track: "",
        responses: {
          problem: "",
          artefact: "",
          caughtErrors: "",
          map: "",
          oversight: "",
          oversightWhy: "",
          insight: "",
          fieldUse: "",
        },
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
    });
  } catch (err) {
    // The create rule denies a wrong passcode (and also denies if the facilitator has
    // not set one yet), surfacing as a permission error. Detect it broadly — a denied
    // write inside a transaction does not always carry err.code === 'permission-denied' —
    // and give a clear, specific hint.
    const code = String((err && err.code) || "");
    const msg = String((err && err.message) || "");
    if (code.includes("permission-denied") || /permission|PERMISSION_DENIED/i.test(msg)) {
      const badCode = new Error("bad-session-code");
      badCode.userMessage = "That session passcode is not right — check with the facilitator (it is needed to start a group).";
      throw badCode;
    }
    throw err;
  }

  enterGroup(newId);
}

// JOIN — resolve the name to a groupId via the public-ish index, then add ourselves
// to ownerUids while echoing back the join code we were given. A WRONG code changes
// the joinCode field, which the join rule's equality check rejects → permission
// denied → we show "wrong join code". Fails closed, exactly as intended.
//
// Matches: groups join rule (joinCode unchanged, only ownerUids + updatedAt change,
// our uid added to ownerUids).
async function joinGroup(nameLower, typedCode) {
  const nameSnap = await getDoc(doc(db, "groupNames", nameLower));
  if (!nameSnap.exists()) {
    const notFound = new Error("no-such-group");
    notFound.userMessage = "No group with that name yet. Check the spelling, or leave the code blank to create it.";
    throw notFound;
  }
  const targetId = nameSnap.data().groupId;
  const groupRef = doc(db, "groups", targetId);

  try {
    await updateDoc(groupRef, {
      // arrayUnion keeps the existing owners (hasAll(...) in the rule) and adds us.
      ownerUids: arrayUnion(uid),
      // We must send the join code we believe is correct; the rule compares it to
      // the stored value. If it differs, the write is denied.
      joinCode: typedCode,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    if (err.code === "permission-denied") {
      // Two causes are indistinguishable from here without a read the rules forbid: a
      // wrong code, or the group is already submitted/approved (locked to new devices).
      // If the group is approved we CAN read it, so we say so precisely; otherwise we
      // name both possibilities rather than blaming the code.
      let message =
        "Could not join. Either the join code is wrong, or this group has already been submitted (submitted groups lock to new devices). Check the code with your group.";
      try {
        const snap = await getDoc(groupRef);
        if (snap.exists() && snap.data().status === "approved") {
          message = "This group's work has already been approved, so it can no longer be joined.";
        }
      } catch (_) {
        // Can't read a draft/submitted group we don't own — keep the combined message.
      }
      const denied = new Error("join-denied");
      denied.userMessage = message;
      throw denied;
    }
    throw err;
  }

  enterGroup(targetId);
}

// ---- Enter the live workspace ----------------------------------------------
function enterGroup(id) {
  groupId = id;
  loginView.hidden = true;
  workView.hidden = false;

  const groupRef = doc(db, "groups", groupId);
  // READ rule: we are an owner, so onSnapshot is permitted. Live updates flow in
  // (e.g. when the facilitator approves or reopens).
  unsubscribe = onSnapshot(
    groupRef,
    (snap) => {
      if (!snap.exists()) return;
      currentDoc = snap.data();
      renderGroup(currentDoc);
    },
    (err) => {
      // With the persistent cache, a brief drop keeps serving from disk; surface it calmly
      // rather than as a dead-end, and reassure that work is not lost.
      if (!navigator.onLine || err.code === "unavailable") {
        showWorkError("Working offline — your changes are saved on this device and will sync when you reconnect.");
      } else {
        showWorkError("Lost the live connection. " + friendlyError(err));
      }
    }
  );
}

// Reflect the latest doc into the form and the surrounding UI.
function renderGroup(data) {
  groupTitle.textContent = data.name || "(unnamed)";
  joinCodeDisplay.textContent = data.joinCode || "––––––";

  const status = data.status || "draft";
  statusBadge.textContent = status;
  statusBadge.className = "badge " + status;

  // Editable only while draft or reopened — the same window the owner-update rule
  // allows. In any other status we lock the form.
  const editable = status === "draft" || status === "reopened";

  // Track the reopened context. Once reopened, remember it (and the note) for the
  // rest of this visit, because our first autosave flips 'reopened' → 'draft'.
  if (status === "reopened") {
    wasReopened = true;
    reopenedNote = data.facilitatorNote && data.facilitatorNote.trim()
      ? data.facilitatorNote
      : "(no note left)";
  }
  if (status === "submitted" || status === "approved") {
    // A clean re-submission / approval ends the reopened context.
    wasReopened = false;
  }

  // Notices per status.
  reopenedNotice.hidden = true;
  approvedNotice.hidden = true;
  submittedNotice.hidden = true;

  if ((status === "reopened" || (status === "draft" && wasReopened))) {
    reopenedNotice.hidden = false;
    reopenedNotice.innerHTML =
      "<strong>Reopened for edits.</strong> Facilitator note: " +
      escapeHtml(reopenedNote) +
      " — make your changes and resubmit.";
  } else if (status === "submitted") {
    submittedNotice.hidden = false;
  } else if (status === "approved") {
    approvedNotice.hidden = false;
  }

  // Push values into the fields without triggering autosave.
  applyingRemote = true;
  scenarioSel.value = data.scenario || "";
  oversightSel.value = (data.responses && data.responses.oversight) || "";
  for (const f of RESPONSE_FIELDS) {
    const el = $(f);
    if (el) el.value = (data.responses && data.responses[f]) || "";
  }
  applyingRemote = false;

  // Lock / unlock every input.
  setFormEnabled(editable);

  // Own-problem red lines: show the reminder only when that path is chosen and editable.
  ownProblemNotice.hidden = !(editable && scenarioSel.value === "Own problem");

  // Persist enough to silently resume after a reload/disconnect (P2). Cleared on approval,
  // since approved work is finished and public.
  if (status === "approved") {
    clearStoredSession();
  } else {
    saveStoredSession({ groupId, joinCode: data.joinCode || "", name: data.name || "" });
  }

  // Submit button: usable only when editable AND a scenario is chosen.
  submitBtn.hidden = !editable;
  submitBtn.disabled = !editable;
  submitBtn.textContent = (status === "reopened" || (status === "draft" && wasReopened))
    ? "Resubmit for review"
    : "Submit for review";
}

function setFormEnabled(enabled) {
  scenarioSel.disabled = !enabled;
  oversightSel.disabled = !enabled;
  for (const f of RESPONSE_FIELDS) {
    const el = $(f);
    if (el) el.disabled = !enabled;
  }
}

// ---- Autosave (debounced ~800ms) -------------------------------------------
// Every input change schedules a save. We collect the whole responses map plus the
// scenario/track and write them, keeping status as-is ('draft' or 'reopened').
function scheduleSave() {
  if (applyingRemote) return;            // remote snapshot, not a user edit
  if (!currentDoc) return;
  const status = currentDoc.status;
  if (status !== "draft" && status !== "reopened") return; // not editable

  saveState.textContent = "Saving…";
  clearWorkError();
  if (saveTimer) clearTimeout(saveTimer);
  saveTimer = setTimeout(saveNow, 800);
}

async function saveNow() {
  if (!groupId || !currentDoc) return;
  const status = currentDoc.status;
  if (status !== "draft" && status !== "reopened") return;

  const scenario = scenarioSel.value;
  const responses = {
    problem: $("problem").value,
    artefact: $("artefact").value,
    caughtErrors: $("caughtErrors").value,
    map: $("map").value,
    oversight: oversightSel.value,
    oversightWhy: $("oversightWhy").value,
    insight: $("insight").value,
    fieldUse: $("fieldUse").value,
  };

  try {
    // Owner-update rule: an owner may keep the doc 'draft' or 'reopened' while
    // editing, and never touches name/nameLower/joinCode/ownerUids. We PRESERVE
    // 'reopened' so the facilitator dashboard keeps showing a reopened submission as
    // 'reopened' until the group resubmits.
    await updateDoc(doc(db, "groups", groupId), {
      scenario,
      track: trackForScenario(scenario),
      responses,
      status: status === "reopened" ? "reopened" : "draft",
      updatedAt: serverTimestamp(),
    });
    saveState.textContent = "All changes saved.";
  } catch (err) {
    saveState.textContent = "";
    showWorkError("Could not save. " + friendlyError(err));
  }
}

// Wire autosave to all editable fields.
[scenarioSel, oversightSel].forEach((el) => el.addEventListener("change", scheduleSave));
RESPONSE_FIELDS.forEach((f) => {
  const el = $(f);
  if (el) el.addEventListener("input", scheduleSave);
});

// Reveal the own-problem red lines the moment that path is chosen (the render path also
// covers the value arriving from a snapshot).
scenarioSel.addEventListener("change", () => {
  ownProblemNotice.hidden = !(scenarioSel.value === "Own problem" && !scenarioSel.disabled);
});

// ---- Submit for review -----------------------------------------------------
submitBtn.addEventListener("click", async () => {
  if (!groupId || !currentDoc) return;
  clearWorkError();

  // Flush any pending autosave first so the submitted snapshot is complete.
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; }

  const scenario = scenarioSel.value;
  if (!scenario) {
    showWorkError("Please choose a scenario before submitting.");
    return;
  }

  const responses = {
    problem: $("problem").value,
    artefact: $("artefact").value,
    caughtErrors: $("caughtErrors").value,
    map: $("map").value,
    oversight: oversightSel.value,
    oversightWhy: $("oversightWhy").value,
    insight: $("insight").value,
    fieldUse: $("fieldUse").value,
  };

  submitBtn.disabled = true;
  submitBtn.textContent = "Submitting…";
  try {
    // Owner-update rule: moving status draft/reopened → 'submitted' is allowed; we
    // also persist the latest content in the same write. name/joinCode/ownerUids
    // untouched.
    await updateDoc(doc(db, "groups", groupId), {
      scenario,
      track: trackForScenario(scenario),
      responses,
      status: "submitted",
      updatedAt: serverTimestamp(),
    });
    saveState.textContent = "Submitted.";
    // The snapshot listener will lock the form via renderGroup().
  } catch (err) {
    showWorkError("Could not submit. " + friendlyError(err));
    submitBtn.disabled = false;
    submitBtn.textContent = "Submit for review";
  }
});

// ---- Copy join code --------------------------------------------------------
copyCode.addEventListener("click", async () => {
  const code = joinCodeDisplay.textContent.trim();
  try {
    await navigator.clipboard.writeText(code);
    copyCode.textContent = "Copied!";
    setTimeout(() => (copyCode.textContent = "Copy code"), 1500);
  } catch {
    // Clipboard may be unavailable; the code is visible regardless.
    copyCode.textContent = "Copy code";
  }
});

// ---- tiny HTML escaper for the facilitator note ----------------------------
function escapeHtml(s) {
  return String(s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// ---- Session persistence (P2) ----------------------------------------------
// Just enough to resume the same group after a reload/disconnect. No personal data: a
// client-generated groupId, the join code and the display name.
const STORE_KEY = "groupwork.session";
function readStoredSession() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY) || "null"); }
  catch { return null; }
}
function saveStoredSession(s) {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch { /* storage unavailable */ }
}
function clearStoredSession() {
  try { localStorage.removeItem(STORE_KEY); } catch { /* ignore */ }
}

// Flush a pending autosave when the tab is hidden or closed, so the last keystrokes are
// not lost (the persistent cache queues the write locally even if the page goes away).
function flushPendingSave() {
  if (saveTimer) { clearTimeout(saveTimer); saveTimer = null; saveNow(); }
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "hidden") flushPendingSave();
});
window.addEventListener("beforeunload", flushPendingSave);

// ---- Session countdown chip (P3) -------------------------------------------
// Reads the facilitator's config/clock (any signed-in user may). Shows a CALM corner
// countdown ONLY while running and not yet expired — so a timer that is off, never
// started, or finished simply shows nothing: the safe, low-anxiety default. Advisory
// only — it never locks the form.
let clockUnsub = null;
let clockInterval = null;
let lastAnnouncedMin = -1;
function watchClock() {
  if (clockUnsub) return;
  clockUnsub = onSnapshot(
    doc(db, "config", "clock"),
    (snap) => renderClock(snap.exists() ? snap.data() : null),
    () => { /* a signed-in user can always read config/clock; ignore transient errors */ }
  );
}
function renderClock(d) {
  if (clockInterval) { clearInterval(clockInterval); clockInterval = null; }
  const endMs = d && d.running && d.endsAt && typeof d.endsAt.toMillis === "function"
    ? d.endsAt.toMillis() : 0;
  if (!endMs) { timerChip.hidden = true; timerAnnounce.textContent = ""; lastAnnouncedMin = -1; return; }
  lastAnnouncedMin = -1;
  const tick = () => {
    const remaining = endMs - Date.now();
    if (remaining <= 0) {
      timerChip.hidden = false;
      timerChip.classList.remove("ending");
      timerChip.textContent = "Time's up";
      timerAnnounce.textContent = "Time is up — start wrapping up.";
      if (clockInterval) { clearInterval(clockInterval); clockInterval = null; }
      return;
    }
    timerChip.hidden = false;
    const totalSec = Math.floor(remaining / 1000);
    const mm = Math.floor(totalSec / 60);
    const ss = totalSec % 60;
    timerChip.textContent = mm + ":" + String(ss).padStart(2, "0") + " left";
    // A single calm amber in the final minute — no red, no flashing, no sound.
    timerChip.classList.toggle("ending", remaining <= 60000);
    // Announce coarsely for screen readers (the visible chip is aria-hidden): each minute
    // in the last five, and every five minutes above. The guard avoids per-second chatter.
    const minsLeft = Math.ceil(totalSec / 60);
    if (minsLeft !== lastAnnouncedMin) {
      lastAnnouncedMin = minsLeft;
      if (minsLeft <= 5 || minsLeft % 5 === 0) {
        timerAnnounce.textContent = minsLeft === 1 ? "About one minute left." : "About " + minsLeft + " minutes left.";
      }
    }
  };
  tick();
  clockInterval = setInterval(tick, 1000);
}
