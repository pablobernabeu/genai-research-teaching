#!/usr/bin/env node
// archive-pr.mjs — open a pull request adding the approved, CONSENTED Part 2 submissions
// to the public archive (submissions/).
//
// Why a local script and not a dashboard button: opening a PR needs write access to the
// repo, and a static web app has nowhere safe to hold a write-token. This runs on your
// machine with your own `gh` auth, so no credential ever lives in the app. It reads the
// LIVE Firestore — approved group docs are world-readable by the security rules, so no
// sign-in is needed for the read — and includes ONLY groups that ticked "share publicly".
//
// Usage (from your clone of the workshop repo, on a clean default branch):
//   GENAI_RT_PROJECT=<projectId> GENAI_RT_API_KEY=<webApiKey> node scripts/archive-pr.mjs
//   (or `npm run archive:pr`). Add --dry-run to write the file but skip git/PR.
//
// The project id and web API key are NOT secrets (they ship in the web app). Find them in
// firebase-app/public/firebase-config.js or the Firebase console. If that file already
// holds real values (e.g. in the private working repo), they are used as a fallback and
// you can omit the env vars.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";

const DRY = process.argv.includes("--dry-run");
const fail = (msg) => { console.error(msg); process.exitCode = 1; };

function configFromFile() {
  const path = "firebase-app/public/firebase-config.js";
  if (!existsSync(path)) return {};
  const s = readFileSync(path, "utf8");
  return {
    pid: (s.match(/projectId:\s*"([^"]+)"/) || [])[1],
    key: (s.match(/apiKey:\s*"([^"]+)"/) || [])[1],
  };
}

function decode(v) {
  if (v == null) return null;
  if ("stringValue" in v) return v.stringValue;
  if ("booleanValue" in v) return v.booleanValue;
  if ("integerValue" in v) return Number(v.integerValue);
  if ("doubleValue" in v) return v.doubleValue;
  if ("timestampValue" in v) return v.timestampValue;
  if ("nullValue" in v) return null;
  if ("mapValue" in v) return decodeFields(v.mapValue.fields || {});
  if ("arrayValue" in v) return (v.arrayValue.values || []).map(decode);
  return null;
}
function decodeFields(fields) {
  const o = {};
  for (const k in fields) o[k] = decode(fields[k]);
  return o;
}

async function main() {
  // --- config (non-secret) -------------------------------------------------
  const f = configFromFile();
  const real = (v) => v && !v.startsWith("YOUR_");
  const projectId = process.env.GENAI_RT_PROJECT || (real(f.pid) ? f.pid : null);
  const apiKey = process.env.GENAI_RT_API_KEY || (real(f.key) ? f.key : null);
  if (!projectId || !apiKey) {
    return fail(
      "Missing config. Set GENAI_RT_PROJECT and GENAI_RT_API_KEY (the Firebase project id and\n" +
      "web API key — not secrets; see firebase-app/public/firebase-config.js or the console)."
    );
  }

  // --- Firestore REST: query approved groups (public read), keep consented --
  const url = `https://firestore.googleapis.com/v1/projects/${projectId}/databases/(default)/documents:runQuery?key=${apiKey}`;
  const query = {
    structuredQuery: {
      from: [{ collectionId: "groups" }],
      where: { fieldFilter: { field: { fieldPath: "status" }, op: "EQUAL", value: { stringValue: "approved" } } },
    },
  };
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(query),
  });
  if (!res.ok) return fail(`Firestore query failed: ${res.status} ${await res.text()}`);
  const rows = await res.json();

  const groups = rows
    .filter((r) => r.document)
    .map((r) => decodeFields(r.document.fields || {}))
    .filter((g) => g.shareConsent === true);

  if (groups.length === 0) return fail("No approved, consented submissions found — nothing to archive.");

  // --- build the Markdown (same compact shape as the dashboard export) ------
  const date = new Date().toISOString().slice(0, 10);
  const val = (s) => (s && String(s).trim()) || "—";
  let md = `# Approved submissions — ${date}\n\n${groups.length} approved, consented group${groups.length === 1 ? "" : "s"}.\n`;
  groups.forEach((g, i) => {
    const r = g.responses || {};
    md += `\n---\n\n### ${i + 1}. ${g.name || "(unnamed)"}${g.track ? " · Track " + g.track : ""}\n\n`;
    md += `*Scenario: ${val(g.scenario)}*\n\n`;
    md += `**The problem.** ${val(r.problem)}\n\n`;
    md += `**The artefact.** ${val(r.artefact)}\n\n`;
    md += `**Errors caught.** ${val(r.caughtErrors)}\n\n`;
    md += `**Automation–steering map.** ${val(r.map)}\n\n`;
    md += `**Oversight model.** ${val(r.oversight)}${r.oversightWhy && String(r.oversightWhy).trim() ? " — " + r.oversightWhy.trim() : ""}\n\n`;
    md += `**Key insight.** ${val(r.insight)}\n\n`;
    md += `**Field reflection.** ${val(r.fieldUse)}\n`;
  });

  mkdirSync("submissions", { recursive: true });
  const file = `submissions/${date}_genai-rt-submissions.md`;
  writeFileSync(file, md);
  console.log(`Wrote ${file} (${groups.length} consented submission${groups.length === 1 ? "" : "s"}).`);

  if (DRY) {
    console.log("--dry-run: skipping git branch / commit / PR.");
    return;
  }

  // --- open a PR via the GitHub CLI (your own auth; no token in the app) ----
  const branch = `archive/${date}`;
  const sh = (cmd) => execSync(cmd, { stdio: "inherit" });
  try {
    sh(`git checkout -b ${branch}`);
    sh(`git add ${file}`);
    sh(`git commit -m "Archive workshop submissions — ${date}"`);
    sh(`git push -u origin ${branch}`);
    sh(`gh pr create --title "Archive workshop submissions — ${date}" --body "Approved, consented Part 2 submissions (${groups.length}). Generated by scripts/archive-pr.mjs; review before merging."`);
    console.log("PR opened. Review it before merging.");
  } catch (e) {
    console.error("git/gh step failed:", e.message);
    console.error(`The file ${file} is written — you can commit and open the PR manually.`);
    process.exitCode = 1;
  }
}

main();
