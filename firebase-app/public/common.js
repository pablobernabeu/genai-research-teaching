// common.js — shared Firebase setup and small helpers.
//
// Security note: this file (and everything in /public) is untrusted client code.
// All real guarantees live in firestore.rules. The helpers here are conveniences
// for the UI only; they never enforce anything by themselves.

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
  initializeFirestore, getFirestore,
  persistentLocalCache, persistentMultipleTabManager,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { firebaseConfig } from "./firebase-config.js";

const app = initializeApp(firebaseConfig);

// Firestore with an ON-DISK (IndexedDB) cache, so a Wi-Fi blip or an accidental reload
// does not lose work: edits queue locally and sync on reconnect, and reads serve from the
// cache while offline. This is what makes the "saved locally" message in friendlyError()
// true. Falls back to the default in-memory cache if persistence cannot start (e.g.
// private browsing). persistentMultipleTabManager lets several tabs share one cache.
let _db;
try {
  _db = initializeFirestore(app, {
    localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
  });
} catch (_) {
  _db = getFirestore(app);
}

// Shared singletons used by every page.
export const db = _db;
export const auth = getAuth(app);

// normaliseName — the canonical key for a group name. Must match exactly how the
// rules treat the uniqueness index: groupNames/{nameLower} where nameLower is the
// trimmed, lower-cased name. Keeping this in one place avoids the two pages drifting.
export function normaliseName(s) {
  return String(s || "").trim().toLowerCase();
}

// generateJoinCode — a 6-character code from an unambiguous alphabet. We drop the
// characters that are easy to misread aloud or by hand (0/O, 1/I/L) so a group can
// reliably read the code to a second device. The rules require a string of length
// >= 4; six gives plenty of room while staying easy to type.
const JOIN_CODE_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function generateJoinCode() {
  let code = "";
  for (let i = 0; i < 6; i++) {
    const idx = Math.floor(Math.random() * JOIN_CODE_ALPHABET.length);
    code += JOIN_CODE_ALPHABET[idx];
  }
  return code;
}

// The five scenarios offered, exactly as named in the README. The first four carry
// a track letter (A–D); "Own problem" carries no track. Shared so the group picker
// and the dashboards label things consistently.
export const SCENARIOS = [
  { label: "A — Methodological Blind-Spot Detector", scenario: "A — Methodological Blind-Spot Detector", track: "A" },
  { label: "B — Executive-Function Layer", scenario: "B — Executive-Function Layer", track: "B" },
  { label: "C — Rapid Prototyping", scenario: "C — Rapid Prototyping", track: "C" },
  { label: "D — Public Engagement", scenario: "D — Public Engagement", track: "D" },
  { label: "Own problem", scenario: "Own problem", track: "" },
];

// The three quick survey scales (each 1–5). Shared so the group form, the dashboard
// axes and any summaries label them identically. `scale[i]` is the label for value i+1.
export const SURVEY = {
  fieldBalance: {
    label: "Field's use here",
    question: "Compared with good practice, is your field currently using GenAI for this task…",
    scale: ["Far too little", "A little too little", "About right", "A little too much", "Far too much"],
  },
  trust: {
    label: "Trust before checking",
    question: "Before you checked it, how far did you trust the AI's output?",
    scale: ["Not at all", "Slightly", "Moderately", "Largely", "Completely"],
  },
  steering: {
    label: "Human steering needed",
    question: "How much human steering did the task need?",
    scale: ["Minimal", "A little", "A fair amount", "A lot", "Constant"],
  },
};
export const SURVEY_KEYS = Object.keys(SURVEY);

// SHA-256 → lower-case hex, via the browser's Web Crypto (available on HTTPS, which the
// deployed app always is). Used only for the dashboard gate; nothing security-critical
// depends on it — the rules remain the trust boundary.
export async function sha256Hex(text) {
  const data = new TextEncoder().encode(String(text));
  const buf = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(buf)).map((b) => b.toString(16).padStart(2, "0")).join("");
}

// The dashboard gate stores only a HASH of the passcode (in config/dashboard), never the
// passcode itself; the dashboard re-computes this from what a viewer types and compares.
// It reuses the one session passcode the facilitator already reads out for groups to
// start, so a viewer needs nothing extra.
export async function dashboardHash(passcode) {
  return sha256Hex(String(passcode));
}

// A friendly message for the most common Firestore failures. We avoid leaking raw
// error text to participants; the security-relevant denials get a plain explanation.
export function friendlyError(err) {
  const code = err && err.code ? err.code : "";
  if (code === "permission-denied") {
    return "That action was not permitted. (The server rejected it — this is by design.)";
  }
  if (code === "unavailable" || code === "failed-precondition") {
    return "You appear to be offline. Your work is saved locally and will sync when you reconnect.";
  }
  if (code === "not-found") {
    return "We could not find that record.";
  }
  return "Something went wrong. Please try again.";
}
