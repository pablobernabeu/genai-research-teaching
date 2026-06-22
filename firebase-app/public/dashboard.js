// dashboard.js — the PUBLIC, session-gated dashboard.
//
// Two layers guard this board, neither of which is the trust boundary (the rules are):
//   1. The read rule now requires request.auth != null even for approved docs, so we sign
//      in ANONYMOUSLY before reading. That keeps approved work off the open, indexable web.
//   2. A session gate: config/dashboard holds the session name and a SHA-256 hash binding
//      the name + passcode. We verify what a viewer types against the hash, client-side,
//      before revealing anything. It is a privacy gate, not a hard wall — approved data is
//      non-identifying by design.
//
// We only ever query groups WHERE status == 'approved': that exact filter keeps every
// document within the read rule, so the listener is accepted while drafts stay invisible.

import {
  collection, query, where, onSnapshot, doc,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { signInAnonymously, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
// The /auto build auto-registers controllers/elements/scales and default-exports the Chart
// class (the bare +esm entry exports a namespace, so `new Chart()` would throw).
import Chart from "https://cdn.jsdelivr.net/npm/chart.js@4/auto/+esm";

import { db, auth, SCENARIOS, SURVEY, dashboardHash, friendlyError } from "./common.js";

const $ = (id) => document.getElementById(id);
const statusEl = $("status");
const gateView = $("gateView");
const gateForm = $("gateForm");
const gateName = $("gateName");
const gatePass = $("gatePass");
const gateBtn = $("gateBtn");
const gateError = $("gateError");
const boardView = $("boardView");
const boardStatus = $("boardStatus");
const statsSection = $("statsSection");
const cardsEl = $("cards");

const TEAL = "#0f6e6e";
const TEAL_LIGHT = "#5fa8a8";
const AMBER = "#c47f17";
const AMBER_LIGHT = "#d9a23f";
const GREY = "#9bb3b3";

const GATE_KEY = "genai-rt.dashboard.unlock"; // sessionStorage: the unlocked passHash

let gateConfig = null;    // {sessionName, passHash} or null
let approvedUnsub = null;
const charts = {};

// Fields shown on each public card (the prose ones).
const CARD_FIELDS = [
  ["problem", "The problem"],
  ["artefact", "The artefact"],
  ["caughtErrors", "Errors caught"],
  ["map", "Automation–steering map"],
  ["oversightWhy", "Why this oversight model"],
  ["fieldUse", "Field reflection"],
];

// ---- Sign in, then watch the gate config -----------------------------------
(async function init() {
  // Wait for the first auth state, then ensure we have SOME identity (the approved read
  // and config/dashboard both require request.auth != null). Sign in anonymously only if
  // nobody is signed in, so opening the dashboard never clobbers a facilitator's session.
  await new Promise((resolve) => {
    const unsub = onAuthStateChanged(auth, (u) => { unsub(); resolve(u); });
  });
  if (!auth.currentUser) {
    try {
      await signInAnonymously(auth);
    } catch (err) {
      statusEl.className = "notice error";
      statusEl.textContent = "Could not connect. Please refresh in a moment. " + friendlyError(err);
      return;
    }
  }
  onSnapshot(
    doc(db, "config", "dashboard"),
    (snap) => { gateConfig = snap.exists() ? snap.data() : null; routeGate(); },
    (err) => {
      statusEl.className = "notice error";
      statusEl.textContent = "Could not load the dashboard. " + friendlyError(err);
    }
  );
})();

function isUnlocked() {
  return !!(gateConfig && gateConfig.passHash &&
    sessionStorage.getItem(GATE_KEY) === gateConfig.passHash);
}

function routeGate() {
  if (!gateConfig || !gateConfig.passHash) {
    statusEl.hidden = false;
    statusEl.className = "notice info";
    statusEl.textContent = "This session's dashboard is not open yet. The facilitator opens it from their dashboard.";
    gateView.hidden = true;
    boardView.hidden = true;
    stopBoard();
    return;
  }
  if (isUnlocked()) {
    showBoard();
  } else {
    statusEl.hidden = true;
    gateView.hidden = false;
    boardView.hidden = true;
    stopBoard();
    if (gateConfig.sessionName) gateName.placeholder = gateConfig.sessionName;
  }
}

gateForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  gateError.hidden = true;
  const name = gateName.value.trim();
  const pass = gatePass.value.trim();
  if (!name || !pass) { showGateError("Enter the session name and passcode."); return; }
  gateBtn.disabled = true;
  gateBtn.textContent = "Checking…";
  try {
    const h = await dashboardHash(name, pass);
    if (gateConfig && h === gateConfig.passHash) {
      sessionStorage.setItem(GATE_KEY, gateConfig.passHash);
      gatePass.value = "";
      showBoard();
    } else {
      showGateError("That session name or passcode was not recognised. Check them with your facilitator.");
    }
  } catch (err) {
    showGateError(friendlyError(err));
  } finally {
    gateBtn.disabled = false;
    gateBtn.textContent = "View dashboard";
  }
});

function showGateError(msg) { gateError.hidden = false; gateError.textContent = msg; }

// ---- Board -----------------------------------------------------------------
function showBoard() {
  statusEl.hidden = true;
  gateView.hidden = true;
  boardView.hidden = false;
  if (approvedUnsub) return;
  const approvedQuery = query(collection(db, "groups"), where("status", "==", "approved"));
  approvedUnsub = onSnapshot(
    approvedQuery,
    (snap) => {
      const groups = [];
      snap.forEach((d) => groups.push({ id: d.id, ...d.data() }));
      render(groups);
    },
    (err) => {
      boardStatus.hidden = false;
      boardStatus.className = "notice error";
      boardStatus.textContent = "Could not load submissions. Please refresh in a moment. " + friendlyError(err);
    }
  );
}

function stopBoard() {
  if (approvedUnsub) { approvedUnsub(); approvedUnsub = null; }
}

function render(groups) {
  if (groups.length === 0) {
    boardStatus.hidden = false;
    boardStatus.className = "notice info";
    boardStatus.textContent = "No approved submissions yet — check back soon.";
    statsSection.hidden = true;
    cardsEl.replaceChildren();
    return;
  }
  boardStatus.hidden = true;
  statsSection.hidden = false;
  renderStats(groups);
  renderFieldChart(groups);
  renderTrustSteerChart(groups);
  renderScenarioChart(groups);
  renderOversightChart(groups);
  renderCards(groups);
}

// ---- Chart helpers ---------------------------------------------------------
function upsert(id, type, data, options) {
  if (charts[id]) {
    charts[id].data = data;
    charts[id].update();
  } else {
    charts[id] = new Chart($(id), { type, data, options });
  }
}

function surveyVals(groups, key) {
  return groups.map((g) => g.survey && g.survey[key]).filter((v) => v >= 1 && v <= 5);
}
function mean(arr) { return arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null; }

function renderStats(groups) {
  $("totalApproved").textContent = String(groups.length);
  const trust = surveyVals(groups, "trust");
  const steer = surveyVals(groups, "steering");
  const field = surveyVals(groups, "fieldBalance");
  $("avgTrust").textContent = trust.length ? mean(trust).toFixed(1) : "–";
  $("avgSteering").textContent = steer.length ? mean(steer).toFixed(1) : "–";
  const aboutRight = field.filter((v) => v === 3).length;
  $("pctAboutRight").textContent = field.length ? Math.round((aboutRight / field.length) * 100) + "%" : "–";
}

// Diverging bar: under-use (teal) → about right (grey) → over-use (amber).
function renderFieldChart(groups) {
  const counts = [0, 0, 0, 0, 0];
  for (const g of groups) {
    const v = g.survey && g.survey.fieldBalance;
    if (v >= 1 && v <= 5) counts[v - 1]++;
  }
  upsert("fieldChart", "bar",
    {
      labels: SURVEY.fieldBalance.scale,
      datasets: [{ label: "Groups", data: counts, backgroundColor: [TEAL, TEAL_LIGHT, GREY, AMBER_LIGHT, AMBER] }],
    },
    {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
    });
}

// Scatter: human steering (x) against trust-before-checking (y). Identical answers are
// nudged apart slightly so overlapping groups stay visible.
function renderTrustSteerChart(groups) {
  const points = [];
  const seen = {};
  for (const g of groups) {
    const t = g.survey && g.survey.trust;
    const s = g.survey && g.survey.steering;
    if (t >= 1 && t <= 5 && s >= 1 && s <= 5) {
      const key = s + "," + t;
      const n = (seen[key] = (seen[key] || 0) + 1);
      const j = (n - 1) * 0.08;
      points.push({ x: s + j, y: t + j, name: g.name || "(unnamed)" });
    }
  }
  upsert("trustSteerChart", "scatter",
    { datasets: [{ label: "Groups", data: points, backgroundColor: TEAL, pointRadius: 6, pointHoverRadius: 8 }] },
    {
      responsive: true,
      plugins: {
        legend: { display: false },
        tooltip: { callbacks: { label: (ctx) => `${ctx.raw.name}: steering ${Math.round(ctx.raw.x)}, trust ${Math.round(ctx.raw.y)}` } },
      },
      scales: {
        x: { title: { display: true, text: "Human steering needed →" }, min: 0.5, max: 5.5, ticks: { stepSize: 1, precision: 0 } },
        y: { title: { display: true, text: "Trust before checking →" }, min: 0.5, max: 5.5, ticks: { stepSize: 1, precision: 0 } },
      },
    });
}

function renderScenarioChart(groups) {
  const labels = SCENARIOS.map((s) => s.label);
  const counts = SCENARIOS.map((s) => groups.filter((g) => g.scenario === s.scenario).length);
  upsert("scenarioChart", "bar",
    { labels, datasets: [{ label: "Approved groups", data: counts, backgroundColor: TEAL }] },
    {
      responsive: true,
      plugins: { legend: { display: false } },
      scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
    });
}

function renderOversightChart(groups) {
  const interwoven = groups.filter((g) => g.responses && g.responses.oversight === "interwoven").length;
  const staged = groups.filter((g) => g.responses && g.responses.oversight === "staged").length;
  upsert("oversightChart", "doughnut",
    { labels: ["Interwoven", "Staged"], datasets: [{ data: [interwoven, staged], backgroundColor: [TEAL, TEAL_LIGHT] }] },
    { responsive: true, plugins: { legend: { position: "bottom" } } });
}

// ---- Cards -----------------------------------------------------------------
function renderCards(groups) {
  const sorted = groups.slice().sort((a, b) => tsMillis(b.updatedAt) - tsMillis(a.updatedAt));
  cardsEl.replaceChildren();
  for (const g of sorted) cardsEl.appendChild(card(g));
}

function tsMillis(ts) {
  if (ts && typeof ts.toMillis === "function") return ts.toMillis();
  return 0;
}

function card(g) {
  const el = document.createElement("div");
  el.className = "card group-card";

  const meta = document.createElement("div");
  meta.className = "meta";
  const h3 = document.createElement("h3");
  h3.textContent = g.name || "(unnamed)";
  meta.appendChild(h3);
  if (g.scenario) {
    const sc = document.createElement("span");
    sc.className = "small muted";
    sc.textContent = g.scenario;
    meta.appendChild(sc);
  }
  el.appendChild(meta);

  const r = g.responses || {};

  if (r.insight && r.insight.trim()) {
    const insight = document.createElement("p");
    insight.innerHTML = "<strong>Key insight:</strong> ";
    insight.appendChild(document.createTextNode(r.insight.trim()));
    el.appendChild(insight);
  }

  const dl = document.createElement("dl");
  dl.className = "responses";
  for (const [key, label] of CARD_FIELDS) {
    const val = (r[key] || "").trim();
    if (!val) continue;
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = val;
    dl.append(dt, dd);
  }
  if (r.oversight) {
    const dt = document.createElement("dt");
    dt.textContent = "Oversight model";
    const dd = document.createElement("dd");
    dd.textContent = r.oversight;
    dl.append(dt, dd);
  }
  el.appendChild(dl);

  // Survey scales, if answered.
  const survey = g.survey || {};
  const parts = Object.keys(SURVEY)
    .filter((k) => survey[k] >= 1 && survey[k] <= 5)
    .map((k) => `${SURVEY[k].label}: ${SURVEY[k].scale[survey[k] - 1]}`);
  if (parts.length) {
    const s = document.createElement("p");
    s.className = "small muted";
    s.style.margin = "0.3rem 0 0";
    s.textContent = "Survey — " + parts.join(" · ");
    el.appendChild(s);
  }

  return el;
}
