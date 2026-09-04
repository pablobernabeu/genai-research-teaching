// Render the room signs the morning checklist calls for: one large sign per seed
// idea, for people to gather at when groups form at the end of Part 1, and one large
// numeral per table, which each group writes down so it can find its table again
// after lunch.
//
//   node scripts/roomsigns.mjs                 # both, to dist/handouts
//   node scripts/roomsigns.mjs --out handouts  # to the committed handouts folder
//   node scripts/roomsigns.mjs --tables 12     # more tables (default 10)
//
// The seeds are read from project_tracks.md, so the signs cannot drift from the
// briefs. Needs a Chromium browser, as the other PDF steps do; set CHROME_PATH and
// CHROME_FLAGS the same way.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';

let args = process.argv.slice(2);
let outDir = 'dist/handouts';
let tables = 10;
while (args[0] && args[0].startsWith('--')) {
  if (args[0] === '--out') { outDir = args[1]; args = args.slice(2); }
  else if (args[0] === '--tables') { tables = parseInt(args[1], 10); args = args.slice(2); }
  else break;
}

function findBrowser() {
  const candidates = [
    process.env.CHROME_PATH,
    'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
    'C:/Program Files/Google/Chrome/Application/chrome.exe',
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser',
  ].filter(Boolean);
  for (const p of candidates) if (existsSync(p)) return p;
  throw new Error('No Edge/Chrome found — set CHROME_PATH to a Chromium browser.');
}

// The seeds live in the "Quick group seeds" section of project_tracks.md, as bullet
// lines of "text (LETTER)" separated by a middle dot. Reading them here keeps the
// signs, the briefs and the deck in step.
function readSeeds() {
  const src = readFileSync('project_tracks.md', 'utf8');
  const section = src.split(/^## Quick group seeds.*$/m)[1];
  if (!section) throw new Error('No "Quick group seeds" section in project_tracks.md.');
  const body = section.split(/^## /m)[0];
  const seeds = [];
  for (const line of body.split('\n')) {
    if (!line.startsWith('- ')) continue;
    for (const part of line.slice(2).split('·')) {
      const m = part.trim().match(/^(.*?)\s*\(([A-D])\)$/);
      if (m) seeds.push({ text: m[1].trim(), track: m[2] });
    }
  }
  if (!seeds.length) throw new Error('No seeds parsed from project_tracks.md.');
  return seeds;
}

const CSS = `
@page { size: A4 landscape; margin: 0; }
body { margin: 0; font-family: "Segoe UI", Arial, system-ui, sans-serif; color: #1c2024; }
.sign { width: 297mm; height: 210mm; box-sizing: border-box; padding: 18mm 20mm;
        display: flex; flex-direction: column; justify-content: center; align-items: center;
        text-align: center; break-after: page; }
.sign:last-child { break-after: auto; }
.track { font-size: 150pt; font-weight: 700; color: #000; line-height: 1; }
.track-label { font-size: 16pt; letter-spacing: .18em; text-transform: uppercase; color: #5b6470; margin-bottom: 6mm; }
.seed { font-size: 46pt; font-weight: 600; line-height: 1.15; margin-top: 8mm; max-width: 250mm; }
.num { font-size: 400pt; font-weight: 700; color: #000; line-height: .9; }
.num-label { font-size: 20pt; letter-spacing: .18em; text-transform: uppercase; color: #5b6470; }
`;

const browser = findBrowser();
mkdirSync(outDir, { recursive: true });

function render(bodyHtml, name) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title>${name}</title><style>${CSS}</style></head><body>${bodyHtml}</body></html>`;
  const tmp = resolve(outDir, `${name}.tmp.html`);
  const out = resolve(outDir, `${name}.pdf`);
  writeFileSync(tmp, html);
  const extraFlags = (process.env.CHROME_FLAGS || '').split(/\s+/).filter(Boolean);
  try {
    execFileSync(browser, [
      '--headless=new', '--disable-gpu', '--no-pdf-header-footer', ...extraFlags,
      `--print-to-pdf=${out}`, pathToFileURL(tmp).href,
    ], { stdio: ['ignore', 'ignore', 'pipe'] });
  } catch (err) {
    const stderr = err.stderr ? String(err.stderr).trim().split('\n').slice(-5).join('\n') : '';
    throw new Error(`Chrome failed to print ${name}.` + (stderr ? `\n${stderr}` : ''));
  } finally {
    rmSync(tmp, { force: true });
  }
  console.log('  =>', out);
}

const esc = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

const seeds = readSeeds();
render(
  seeds.map((s) =>
    `<section class="sign"><div class="track-label">Track</div>` +
    `<div class="track">${s.track}</div>` +
    `<div class="seed">${esc(s.text)}</div></section>`
  ).join(''),
  'seed-signs'
);

render(
  Array.from({ length: tables }, (_, i) =>
    `<section class="sign"><div class="num">${i + 1}</div>` +
    `<div class="num-label">Table</div></section>`
  ).join(''),
  'table-numbers'
);

console.log(`${seeds.length} seed signs, ${tables} table numbers.`);
