// facilitator.js — the FACILITATOR dashboard.
//
// Google sign-in only (NO anonymous). After sign-in we live-list ALL groups
// and offer the two controls the rules permit: Approve and Reopen-with-note.
//
// The rules let exactly one account (matched by email) read every group and move
// status. They forbid the facilitator from editing group content — so the only
// writes here touch { status, facilitatorNote, updatedAt }. If a non-facilitator
// signs in, the collection read is denied and the list simply stays empty.

import {
  collection, onSnapshot, doc, updateDoc, setDoc, serverTimestamp,
  runTransaction, Timestamp,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import {
  GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult,
  signOut, onAuthStateChanged,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import { db, auth, friendlyError, normaliseName, dashboardHash, SURVEY, SURVEY_KEYS } from "./common.js";

const $ = (id) => document.getElementById(id);
const signinView = $("signinView");
const signinError = $("signinError");
const signinBtn = $("signinBtn");
const dashView = $("dashView");
const dashStatus = $("dashStatus");
const countLine = $("countLine");
const groupList = $("groupList");
const signOutBtn = $("signOutBtn");
const sessionCodeForm = $("sessionCodeForm");
const sessionNameInput = $("sessionNameInput");
const sessionCodeInput = $("sessionCodeInput");
const setSessionCodeBtn = $("setSessionCodeBtn");
const currentSessionCode = $("currentSessionCode");
const sessionCodeStatus = $("sessionCodeStatus");
const timerMinutes = $("timerMinutes");
const startTimerBtn = $("startTimerBtn");
const resetTimerBtn = $("resetTimerBtn");
const timerStatus = $("timerStatus");
const timerError = $("timerError");
const exportBtn = $("exportBtn");
const exportStatus = $("exportStatus");

let unsubscribe = null;
let unsubscribeConfig = null; // config/app passcode listener
let unsubscribeDashCfg = null; // config/dashboard session-name listener
let unsubscribeClock = null;  // config/clock timer listener
let dashNamePrefilled = false; // only prefill the session-name input once
let timerStatusInterval = null;
let latestGroups = [];        // newest snapshot, for the Markdown export

// Human labels for the response fields, in display order.
const RESPONSE_LABELS = [
  ["problem", "The problem"],
  ["artefact", "The artefact"],
  ["caughtErrors", "Errors caught"],
  ["map", "Automation–steering map"],
  ["oversight", "Oversight model"],
  ["oversightWhy", "Why that model"],
  ["insight", "Key insight"],
  ["fieldUse", "Field reflection"],
];

// ---- Auth ------------------------------------------------------------------
onAuthStateChanged(auth, (user) => {
  // The facilitator signs in with Google, never anonymously. So an ANONYMOUS session
  // (which the group app leaves behind in the same browser) is definitely not the
  // facilitator — show the sign-in button rather than a dashboard whose reads are
  // denied. The rules — not this check — remain the real boundary; this is only UX.
  if (user && !user.isAnonymous) {
    // Signed in with a real account. The rules decide whether reads succeed; a
    // non-facilitator will simply get permission-denied on the collection listener.
    signinView.hidden = true;
    dashView.hidden = false;
    signOutBtn.hidden = false;
    startListening();
    startConfigListening();
    startDashConfigListening();
    startClockListening();
  } else {
    if (unsubscribe) { unsubscribe(); unsubscribe = null; }
    if (unsubscribeConfig) { unsubscribeConfig(); unsubscribeConfig = null; }
    if (unsubscribeDashCfg) { unsubscribeDashCfg(); unsubscribeDashCfg = null; }
    if (unsubscribeClock) { unsubscribeClock(); unsubscribeClock = null; }
    if (timerStatusInterval) { clearInterval(timerStatusInterval); timerStatusInterval = null; }
    signinView.hidden = false;
    dashView.hidden = true;
    signOutBtn.hidden = true;
  }
});

const googleProvider = new GoogleAuthProvider();

// If a previous attempt used the redirect fallback (popups blocked), surface any
// error here when the page reloads after the redirect.
getRedirectResult(auth).catch((err) => {
  signinError.hidden = false;
  signinError.textContent = "Could not sign in. " + friendlyError(err);
});

signinBtn.addEventListener("click", async () => {
  signinError.hidden = true;
  signinBtn.disabled = true;
  signinBtn.textContent = "Signing in…";
  try {
    // Sign in with the facilitator's Google account. The rules authorise by the
    // verified email claim, so only the account whose email matches facilitatorEmail()
    // can read groups or set the passcode; anyone else is denied and sees an empty list.
    await signInWithPopup(auth, googleProvider);
    // onAuthStateChanged takes over from here.
  } catch (err) {
    if (
      err.code === "auth/popup-blocked" ||
      err.code === "auth/operation-not-supported-in-environment" ||
      err.code === "auth/cancelled-popup-request"
    ) {
      // Popups unavailable — fall back to a full-page redirect. Any error surfaces via
      // getRedirectResult above when the page reloads.
      await signInWithRedirect(auth, googleProvider);
      return;
    }
    if (err.code !== "auth/popup-closed-by-user") {
      signinError.hidden = false;
      signinError.textContent = "Could not sign in. " + friendlyError(err);
    }
  } finally {
    signinBtn.disabled = false;
    signinBtn.textContent = "Sign in with Google";
  }
});

signOutBtn.addEventListener("click", async () => {
  await signOut(auth);
});

// ---- Live list of ALL groups ----------------------------------------------
function startListening() {
  if (unsubscribe) return;
  // READ rule: isFacilitator() permits reading every group. We listen to the whole
  // collection and sort client-side (no index needed).
  unsubscribe = onSnapshot(
    collection(db, "groups"),
    (snap) => {
      const groups = [];
      snap.forEach((d) => groups.push({ id: d.id, ...d.data() }));
      render(groups);
    },
    (err) => {
      dashStatus.hidden = false;
      dashStatus.className = "notice error";
      dashStatus.textContent =
        "Could not load groups. If you are not the facilitator account this is expected. " +
        friendlyError(err);
    }
  );
}

// ---- Session passcode (config/app) ----------------------------------------
// Only the facilitator account may read or write config (rules). We live-read the
// current passcode and let the facilitator set it; groups must type it to start.
function startConfigListening() {
  if (unsubscribeConfig) return;
  unsubscribeConfig = onSnapshot(
    doc(db, "config", "app"),
    (snap) => {
      const code = snap.exists() ? (snap.data().sessionCode || "") : "";
      currentSessionCode.textContent = code
        ? "Current passcode: " + code
        : "No passcode set yet — groups cannot start a group until you set one.";
    },
    (err) => {
      // A non-facilitator would be denied here; the rules, not this page, decide.
      currentSessionCode.textContent = "Could not read the current passcode. " + friendlyError(err);
    }
  );
}

// config/dashboard holds the session NAME (non-secret) + a passHash. Prefill the
// session-name input once from it, so re-setting the passcode keeps the same name.
function startDashConfigListening() {
  if (unsubscribeDashCfg) return;
  unsubscribeDashCfg = onSnapshot(
    doc(db, "config", "dashboard"),
    (snap) => {
      const name = snap.exists() ? (snap.data().sessionName || "") : "";
      if (name && !dashNamePrefilled && !sessionNameInput.value) {
        sessionNameInput.value = name;
        dashNamePrefilled = true;
      }
    },
    () => { /* facilitator-only context; ignore transient errors */ }
  );
}

sessionCodeForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  sessionCodeStatus.hidden = true;
  const name = sessionNameInput.value.trim();
  const value = sessionCodeInput.value.trim();
  setSessionCodeBtn.disabled = true;
  setSessionCodeBtn.textContent = "Saving…";
  try {
    // config/app holds the group-creation passcode (facilitator-only). merge so we set just
    // sessionCode and leave any other config untouched.
    await setDoc(doc(db, "config", "app"), { sessionCode: value }, { merge: true });
    // config/dashboard gates the public dashboard with the name + passcode, stored only as a
    // hash. Written ONLY when both are present; otherwise the dashboard stays locked.
    let dashMsg;
    if (name && value) {
      const passHash = await dashboardHash(name, value);
      await setDoc(doc(db, "config", "dashboard"), { sessionName: name, passHash });
      dashMsg = ' The public dashboard now opens with the name "' + name + '" and this passcode.';
    } else {
      dashMsg = " Add a session name as well to open the public dashboard.";
    }
    sessionCodeStatus.hidden = false;
    sessionCodeStatus.className = "notice ok";
    sessionCodeStatus.textContent = "Saved. Read the passcode (and session name) out to the room." + dashMsg;
  } catch (err) {
    sessionCodeStatus.hidden = false;
    sessionCodeStatus.className = "notice error";
    sessionCodeStatus.textContent = "Could not save. " + friendlyError(err);
  } finally {
    setSessionCodeBtn.disabled = false;
    setSessionCodeBtn.textContent = "Set name & passcode";
  }
});

// ---- Session timer (config/clock) -----------------------------------------
// Only the facilitator may write config/clock (rules); any signed-in device may read it,
// so groups show a calm corner countdown. We store an ABSOLUTE end instant (endsAt) as the
// single source of truth, so every device computes the same remaining time.
function startClockListening() {
  if (unsubscribeClock) return;
  unsubscribeClock = onSnapshot(
    doc(db, "config", "clock"),
    (snap) => renderTimerStatus(snap.exists() ? snap.data() : null),
    (err) => { timerStatus.textContent = "Could not read the timer. " + friendlyError(err); }
  );
}

function renderTimerStatus(d) {
  if (timerStatusInterval) { clearInterval(timerStatusInterval); timerStatusInterval = null; }
  const endMs = d && d.running && d.endsAt && d.endsAt.toMillis ? d.endsAt.toMillis() : 0;
  if (!endMs) {
    timerStatus.textContent = "Timer is off.";
    return;
  }
  const tick = () => {
    const remaining = endMs - Date.now();
    if (remaining <= 0) {
      timerStatus.textContent = "Time is up — group screens now show “start wrapping up”.";
      if (timerStatusInterval) { clearInterval(timerStatusInterval); timerStatusInterval = null; }
      return;
    }
    const mm = Math.floor(remaining / 60000);
    const ss = Math.floor((remaining % 60000) / 1000);
    timerStatus.textContent = `Running — ${mm}:${String(ss).padStart(2, "0")} left on every group's screen.`;
  };
  tick();
  timerStatusInterval = setInterval(tick, 1000);
}

startTimerBtn.addEventListener("click", async () => {
  timerError.hidden = true;
  const mins = Math.max(1, Math.min(120, parseInt(timerMinutes.value, 10) || 15));
  const durationSec = mins * 60;
  startTimerBtn.disabled = true;
  try {
    // Absolute end instant computed once on this device; groups read endsAt directly and
    // never do their own duration arithmetic, so all screens agree on the remaining time.
    await setDoc(doc(db, "config", "clock"), {
      running: true,
      durationSec,
      startedAt: serverTimestamp(),
      endsAt: Timestamp.fromMillis(Date.now() + durationSec * 1000),
    });
  } catch (err) {
    timerError.hidden = false;
    timerError.textContent = "Could not start the timer. " + friendlyError(err);
  } finally {
    startTimerBtn.disabled = false;
  }
});

resetTimerBtn.addEventListener("click", async () => {
  timerError.hidden = true;
  resetTimerBtn.disabled = true;
  try {
    // Stop for everyone instantly: running:false makes the chip vanish on every group's
    // snapshot. merge keeps durationSec so the field stays pre-filled for a restart.
    await setDoc(doc(db, "config", "clock"), { running: false }, { merge: true });
  } catch (err) {
    timerError.hidden = false;
    timerError.textContent = "Could not reset the timer. " + friendlyError(err);
  } finally {
    resetTimerBtn.disabled = false;
  }
});

// ---- Export approved submissions (Markdown) -------------------------------
// The app is the default record; this builds the archive the facilitator commits under
// submissions/. Approved only — the curated, world-readable work.
function buildSubmissionsMarkdown(groups) {
  // The public archive is approved AND the group consented to sharing.
  const shared = groups.filter((g) => g.status === "approved" && g.shareConsent);
  const date = new Date().toISOString().slice(0, 10);
  const val = (s) => (s && String(s).trim()) || "—";
  let md = `# Approved submissions — ${date}\n\n${shared.length} approved, consented group${shared.length === 1 ? "" : "s"}.\n`;
  shared.forEach((g, i) => {
    const r = g.responses || {};
    // Compact headings: group as h3, field labels as bold leads (not headings).
    md += `\n---\n\n### ${i + 1}. ${g.name || "(unnamed)"}${g.track ? " · Track " + g.track : ""}\n\n`;
    md += `*Scenario: ${val(g.scenario)}*\n\n`;
    md += `**The problem.** ${val(r.problem)}\n\n`;
    md += `**The artefact.** ${val(r.artefact)}\n\n`;
    md += `**Errors caught.** ${val(r.caughtErrors)}\n\n`;
    md += `**Automation–steering map.** ${val(r.map)}\n\n`;
    md += `**Oversight model.** ${val(r.oversight)}${r.oversightWhy && r.oversightWhy.trim() ? " — " + r.oversightWhy.trim() : ""}\n\n`;
    md += `**Key insight.** ${val(r.insight)}\n\n`;
    md += `**Field reflection.** ${val(r.fieldUse)}\n`;
  });
  return md;
}

exportBtn.addEventListener("click", () => {
  exportStatus.textContent = "";
  const sharedCount = latestGroups.filter((g) => g.status === "approved" && g.shareConsent).length;
  if (sharedCount === 0) {
    const approvedCount = latestGroups.filter((g) => g.status === "approved").length;
    exportStatus.textContent = approvedCount === 0
      ? "No approved submissions yet — approve some first."
      : "No approved group has consented to public sharing yet — only consented work is exported.";
    return;
  }
  const md = buildSubmissionsMarkdown(latestGroups);
  const date = new Date().toISOString().slice(0, 10);
  const blob = new Blob([md], { type: "text/markdown;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${date}_genai-rt-submissions.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  exportStatus.textContent =
    `Downloaded ${sharedCount} approved & consented submission${sharedCount === 1 ? "" : "s"} as Markdown. Commit it under submissions/.`;
});

// Sort: submitted first (they need attention), then by updatedAt descending.
function sortGroups(groups) {
  const rank = { submitted: 0, reopened: 1, draft: 2, approved: 3 };
  return groups.sort((a, b) => {
    const ra = rank[a.status] ?? 9;
    const rb = rank[b.status] ?? 9;
    if (ra !== rb) return ra - rb;
    return tsMillis(b.updatedAt) - tsMillis(a.updatedAt);
  });
}

function tsMillis(ts) {
  if (ts && typeof ts.toMillis === "function") return ts.toMillis();
  return 0;
}

function render(groups) {
  latestGroups = groups;
  dashStatus.hidden = true;
  const sorted = sortGroups(groups);

  const submitted = sorted.filter((g) => g.status === "submitted").length;
  countLine.textContent =
    `${sorted.length} group${sorted.length === 1 ? "" : "s"} · ${submitted} awaiting review.`;

  groupList.replaceChildren();
  if (sorted.length === 0) {
    const p = document.createElement("p");
    p.className = "muted";
    p.textContent = "No groups yet.";
    groupList.appendChild(p);
    return;
  }
  for (const g of sorted) groupList.appendChild(card(g));
}

function card(g) {
  const el = document.createElement("div");
  el.className = "card group-card";

  // Header: name + status badge + scenario.
  const meta = document.createElement("div");
  meta.className = "meta";
  const h3 = document.createElement("h3");
  h3.textContent = g.name || "(unnamed)";
  const badge = document.createElement("span");
  badge.className = "badge " + (g.status || "draft");
  badge.textContent = g.status || "draft";
  meta.append(h3, badge);
  if (g.scenario) {
    const sc = document.createElement("span");
    sc.className = "small muted";
    sc.textContent = g.scenario;
    meta.appendChild(sc);
  }
  el.appendChild(meta);

  // Sharing consent — only consented work goes to the public archive / PR.
  const consent = document.createElement("p");
  consent.className = "small";
  consent.style.margin = "0 0 0.3rem";
  consent.innerHTML = g.shareConsent
    ? '<strong style="color:var(--green)">✓ Consented to public sharing</strong>'
    : '<span class="muted">Not consented to public sharing</span>';
  el.appendChild(consent);

  // Responses.
  const dl = document.createElement("dl");
  dl.className = "responses";
  const r = g.responses || {};
  for (const [key, label] of RESPONSE_LABELS) {
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    const val = (r[key] || "").trim();
    if (val) {
      dd.textContent = val;
    } else {
      dd.textContent = "—";
      dd.className = "empty";
    }
    dl.append(dt, dd);
  }
  el.appendChild(dl);

  // Survey scales, if the group answered any of them.
  const survey = g.survey || {};
  const parts = SURVEY_KEYS
    .filter((k) => survey[k] >= 1 && survey[k] <= 5)
    .map((k) => `${SURVEY[k].label}: ${SURVEY[k].scale[survey[k] - 1]}`);
  if (parts.length) {
    const s = document.createElement("p");
    s.className = "small muted";
    s.style.margin = "0.2rem 0 0";
    s.textContent = "Survey — " + parts.join(" · ");
    el.appendChild(s);
  }

  // Existing facilitator note, if any.
  if (g.facilitatorNote && g.facilitatorNote.trim()) {
    const note = document.createElement("p");
    note.className = "small muted";
    note.textContent = "Your last note: " + g.facilitatorNote;
    el.appendChild(note);
  }

  // Controls.
  const row = document.createElement("div");
  row.className = "btn-row";
  const approveBtn = document.createElement("button");
  approveBtn.textContent = "Approve";
  approveBtn.addEventListener("click", () => approve(g.id, approveBtn));
  const reopenBtn = document.createElement("button");
  reopenBtn.className = "secondary";
  reopenBtn.textContent = "Reopen…";
  reopenBtn.addEventListener("click", () => reopen(g.id, reopenBtn));
  const renameBtn = document.createElement("button");
  renameBtn.className = "ghost";
  renameBtn.textContent = "Rename…";
  renameBtn.addEventListener("click", () => rename(g.id, g.name, renameBtn));
  row.append(approveBtn, reopenBtn, renameBtn);
  el.appendChild(row);

  const errBox = document.createElement("div");
  errBox.className = "notice error";
  errBox.hidden = true;
  errBox.dataset.role = "err";
  el.appendChild(errBox);

  return el;
}

function showCardError(btn, msg) {
  const cardEl = btn.closest(".group-card");
  const box = cardEl.querySelector('[data-role="err"]');
  box.hidden = false;
  box.textContent = msg;
}

// APPROVE — facilitator-update rule: when status becomes 'approved' the rule REQUIRES
// joinCode and sessionCode to be blanked, so the now-publicly-readable document carries
// no secrets. Blanking BOTH is mandatory — omit either and the approve is denied.
async function approve(id, btn) {
  btn.disabled = true;
  try {
    await updateDoc(doc(db, "groups", id), {
      status: "approved",
      joinCode: "",
      sessionCode: "",
      updatedAt: serverTimestamp(),
    });
    // Snapshot listener re-renders automatically.
  } catch (err) {
    showCardError(btn, "Could not approve. " + friendlyError(err));
    btn.disabled = false;
  }
}

// REOPEN — prompt for a note, then move status → 'reopened' and set facilitatorNote.
// Matches the facilitator-update rule (only status + facilitatorNote + updatedAt).
async function reopen(id, btn) {
  const note = window.prompt(
    "Add a short note for the group (what to fix before resubmitting):",
    ""
  );
  if (note === null) return; // cancelled
  btn.disabled = true;
  try {
    await updateDoc(doc(db, "groups", id), {
      status: "reopened",
      facilitatorNote: note,
      updatedAt: serverTimestamp(),
    });
  } catch (err) {
    showCardError(btn, "Could not reopen. " + friendlyError(err));
    btn.disabled = false;
  }
}

// RENAME — fix an inappropriate or personal group name without destroying the group's
// work. A transaction swaps the name-uniqueness index (frees the old name, claims the
// new one) and updates the group's name + nameLower together, so the two never drift.
// Matches the facilitator-rename rule plus groupNames create (new name) and the
// facilitator-only groupNames delete (old name).
async function rename(id, currentName, btn) {
  const raw = window.prompt(
    "New group name (keep it short and non-identifying):",
    currentName || ""
  );
  if (raw === null) return; // cancelled
  const newName = raw.trim();
  const newLower = normaliseName(raw);
  if (!newLower) {
    showCardError(btn, "Please enter a name.");
    return;
  }
  btn.disabled = true;
  try {
    await runTransaction(db, async (tx) => {
      const groupRef = doc(db, "groups", id);
      const gSnap = await tx.get(groupRef);
      if (!gSnap.exists()) {
        const gone = new Error("group-gone");
        gone.userMessage = "That group no longer exists.";
        throw gone;
      }
      const oldLower = gSnap.data().nameLower;
      if (newLower === oldLower) {
        // Same identity — only the display spelling changed. Leave the index untouched.
        tx.update(groupRef, { name: newName, updatedAt: serverTimestamp() });
        return;
      }
      // Claim the new name (fails if another group holds it), free the old one, and
      // point the group at the new name — all atomically.
      const newNameRef = doc(db, "groupNames", newLower);
      const taken = await tx.get(newNameRef);
      if (taken.exists()) {
        const dup = new Error("name-taken");
        dup.userMessage = "That name is already taken — choose another.";
        throw dup;
      }
      tx.set(newNameRef, { groupId: id });
      tx.delete(doc(db, "groupNames", oldLower));
      tx.update(groupRef, { name: newName, nameLower: newLower, updatedAt: serverTimestamp() });
    });
    // The snapshot listener re-renders the card with the new name.
  } catch (err) {
    showCardError(btn, err.userMessage || ("Could not rename. " + friendlyError(err)));
    btn.disabled = false;
  }
}
