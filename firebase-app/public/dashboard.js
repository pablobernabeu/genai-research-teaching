// dashboard.js — the PUBLIC dashboard.
//
// NO sign-in. We subscribe to a query of groups WHERE status == 'approved'. That is
// the only read the public is allowed: the READ rule's final clause permits reading
// a group when resource.data.status == 'approved'. Querying with that exact filter
// keeps every document we touch within the rule, so the listener is accepted while
// an unauthenticated user can never see drafts or submissions.

import {
  collection, query, where, onSnapshot,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
// The /auto build auto-registers controllers/elements/scales and default-exports the
// Chart class. The bare chart.js/+esm entry default-exports a namespace object (not a
// constructor), so `new Chart(...)` throws "Chart is not a constructor".
import Chart from "https://cdn.jsdelivr.net/npm/chart.js@4/auto/+esm";

import { db, SCENARIOS } from "./common.js";

const $ = (id) => document.getElementById(id);
const statusEl = $("status");
const statsSection = $("statsSection");
const totalApproved = $("totalApproved");
const cardsEl = $("cards");

let scenarioChart = null;
let oversightChart = null;

const TEAL = "#0f6e6e";
const TEAL_LIGHT = "#5fa8a8";

// Response fields shown on each public card (the key ones).
const CARD_FIELDS = [
  ["problem", "The problem"],
  ["artefact", "The artefact"],
  ["caughtErrors", "Errors caught"],
  ["map", "Automation–steering map"],
  ["oversightWhy", "Why this oversight model"],
  ["fieldUse", "Field reflection"],
];

// IMPORTANT: query approved-only. We deliberately never read the whole collection
// (that would be denied without facilitator auth, and would defeat the privacy model).
const approvedQuery = query(collection(db, "groups"), where("status", "==", "approved"));

onSnapshot(
  approvedQuery,
  (snap) => {
    const groups = [];
    snap.forEach((d) => groups.push({ id: d.id, ...d.data() }));
    render(groups);
  },
  (err) => {
    statusEl.className = "notice error";
    statusEl.textContent = "Could not load the dashboard. Please refresh in a moment.";
    console.error(err);
  }
);

function render(groups) {
  if (groups.length === 0) {
    statusEl.hidden = false;
    statusEl.className = "notice info";
    statusEl.textContent = "No approved submissions yet — check back soon.";
    statsSection.hidden = true;
    cardsEl.replaceChildren();
    return;
  }
  statusEl.hidden = true;
  statsSection.hidden = false;

  totalApproved.textContent = String(groups.length);
  renderScenarioChart(groups);
  renderOversightChart(groups);
  renderCards(groups);
}

// Bar chart: count per scenario (covers tracks A–D + Own problem).
function renderScenarioChart(groups) {
  const labels = SCENARIOS.map((s) => s.label);
  const counts = SCENARIOS.map(
    (s) => groups.filter((g) => g.scenario === s.scenario).length
  );

  const data = {
    labels,
    datasets: [{ label: "Approved groups", data: counts, backgroundColor: TEAL }],
  };
  const options = {
    responsive: true,
    plugins: { legend: { display: false } },
    scales: { y: { beginAtZero: true, ticks: { precision: 0 } } },
  };

  if (scenarioChart) {
    scenarioChart.data = data;
    scenarioChart.update();
  } else {
    scenarioChart = new Chart($("scenarioChart"), { type: "bar", data, options });
  }
}

// Pie chart: interwoven vs staged (ignore blanks).
function renderOversightChart(groups) {
  const interwoven = groups.filter((g) => g.responses && g.responses.oversight === "interwoven").length;
  const staged = groups.filter((g) => g.responses && g.responses.oversight === "staged").length;

  const data = {
    labels: ["Interwoven", "Staged"],
    datasets: [{ data: [interwoven, staged], backgroundColor: [TEAL, TEAL_LIGHT] }],
  };
  const options = { responsive: true, plugins: { legend: { position: "bottom" } } };

  if (oversightChart) {
    oversightChart.data = data;
    oversightChart.update();
  } else {
    oversightChart = new Chart($("oversightChart"), { type: "pie", data, options });
  }
}

function renderCards(groups) {
  // Newest approvals first (best-effort; updatedAt may be a server timestamp).
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

  // Lead with the key insight, if present.
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
    if (!val) continue; // only show fields that have content on the public page
    const dt = document.createElement("dt");
    dt.textContent = label;
    const dd = document.createElement("dd");
    dd.textContent = val;
    dl.append(dt, dd);
  }
  // Oversight model as a small tag.
  if (r.oversight) {
    const dt = document.createElement("dt");
    dt.textContent = "Oversight model";
    const dd = document.createElement("dd");
    dd.textContent = r.oversight;
    dl.append(dt, dd);
  }
  el.appendChild(dl);

  return el;
}
