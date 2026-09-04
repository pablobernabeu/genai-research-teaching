// Assemble every printable item into one PDF for the print shop, each section behind
// a slip that states how many copies it needs, whether it prints single- or
// double-sided, and which way up the paper goes.
//
//   node scripts/printbundle.mjs                  # -> dist/handouts/print-bundle.pdf
//   node scripts/printbundle.mjs --out handouts   # -> the committed handouts folder
//   node scripts/printbundle.mjs --groups 8       # size the job for 8 tables (default 10)
//
// The job cannot be one uniform print run: the copy counts differ per item, and the
// sheets that get cut into cards have to be single-sided or cutting destroys their
// reverse. Hence the slips. Needs a Chromium browser, as the other PDF steps do.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PDFDocument } from 'pdf-lib';

let args = process.argv.slice(2);
let outDir = 'dist/handouts';
let groups = 10;
while (args[0] && args[0].startsWith('--')) {
  if (args[0] === '--out') { outDir = args[1]; args = args.slice(2); }
  else if (args[0] === '--groups') { groups = parseInt(args[1], 10); args = args.slice(2); }
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
const browser = findBrowser();
const extraFlags = (process.env.CHROME_FLAGS || '').split(/\s+/).filter(Boolean);
const tmpDir = resolve(outDir, '.bundle-tmp');
mkdirSync(tmpDir, { recursive: true });

function chromePrint(htmlPath, pdfPath) {
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer', ...extraFlags,
    `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href,
  ], { stdio: ['ignore', 'ignore', 'pipe'] });
}

// The sheets that get cut are rendered from their own sources rather than sliced out
// of a combined pack by page number, so the bundle cannot drift if a pack repaginates.
function renderDoc(name, mdFiles, compactPt) {
  const flags = ['--out', tmpDir, '--bundle', name];
  if (compactPt) flags.splice(2, 0, '--compact', '--fontpt', String(compactPt));
  execFileSync(process.execPath, ['scripts/md2pdf.mjs', ...flags, ...mdFiles], { stdio: ['ignore', 'ignore', 'pipe'] });
  return join(tmpDir, `${name}.pdf`);
}

const onePager = Math.max(2 * groups, 2);
const SECTIONS = [
  {
    title: 'Group pack booklet',
    file: () => 'handouts/group-pack.pdf',
    copies: `${groups} copies, plus one spare`,
    sides: 'Double-sided', paper: 'A4 portrait', finish: 'Stapled, top left',
    note: 'One booklet per table. The cover has fill-in fields, so every table needs its own.',
  },
  {
    title: 'Role cards, loose, for cutting',
    file: () => renderDoc('role-cards-loose', ['docs/role_cards.md']),
    copies: `${groups} copies`,
    sides: 'SINGLE-SIDED', paper: 'A4 portrait', finish: 'Loose, not stapled',
    note: 'These repeat the role cards from the booklet on purpose. The bound copy stays whole for reference, and this loose copy is cut along the scissor rules into five cards. A double-sided sheet cannot be cut without destroying its reverse.',
  },
  {
    title: 'Group quick-start one-pager',
    file: () => 'handouts/group-one-pager.pdf',
    copies: `${onePager} copies`,
    sides: 'Single-sided', paper: 'A4 portrait', finish: 'Loose',
    note: 'Two per table.',
  },
  {
    title: 'Facilitator cue cards, for cutting',
    file: () => renderDoc('cue-cards-loose', ['docs/cue_cards.md']),
    copies: '1 copy',
    sides: 'SINGLE-SIDED', paper: 'A4 portrait', finish: 'Loose, then cut and kept in running order',
    note: 'Cut along the scissor rules. The cards run in clock order from 12:00 to 13:40.',
  },
  {
    title: 'Run sheet and morning checklist',
    file: () => renderDoc('runsheet-and-checklist', ['docs/facilitator_run_sheet.md', 'docs/morning_checklist.md']),
    copies: '1 copy',
    sides: 'Double-sided', paper: 'A4 portrait', finish: 'Stapled',
    note: 'For the facilitator only.',
  },
  {
    title: 'Day-of app reset',
    file: () => 'handouts/facilitator-day-of-reset.pdf',
    copies: '1 copy',
    sides: 'Single-sided', paper: 'A4 portrait', finish: 'Loose, kept with the cue cards',
    note: 'The passcode, timer and export steps for the lunch break.',
  },
  {
    title: 'Seed-idea signs',
    file: () => 'handouts/seed-signs.pdf',
    copies: '1 copy',
    sides: 'SINGLE-SIDED', paper: 'A4 LANDSCAPE', finish: 'Heaviest paper available',
    note: 'Posted around the room before 12:00, one per seat of the room. Do not let the printer rotate or shrink these to fit portrait.',
  },
  {
    title: 'Table numbers',
    file: () => 'handouts/table-numbers.pdf',
    copies: '1 copy',
    sides: 'SINGLE-SIDED', paper: 'A4 LANDSCAPE', finish: 'Heaviest paper available',
    note: 'One on each table, readable across the room.',
  },
];

const CSS = `
@page { size: A4; margin: 0; }
body { margin: 0; font-family: "Segoe UI", Arial, system-ui, sans-serif; color: #1c2024; }
.slip { width: 210mm; height: 297mm; box-sizing: border-box; padding: 32mm 26mm;
        display: flex; flex-direction: column; break-after: page; }
.slip:last-child { break-after: auto; }
.kicker { font-size: 11pt; letter-spacing: .2em; text-transform: uppercase; color: #5b6470; }
h1 { font-size: 30pt; color: #0f6e6e; margin: 3mm 0 8mm; line-height: 1.15; }
dl { display: grid; grid-template-columns: 42mm 1fr; gap: 3mm 6mm; font-size: 13pt; margin: 0 0 9mm; }
dt { color: #5b6470; }
dd { margin: 0; font-weight: 600; }
dd.shout { color: #b3261e; }
.note { font-size: 12pt; line-height: 1.5; border-left: 3px solid #0f6e6e; padding-left: 5mm; color: #33393f; }
.contents h1 { font-size: 26pt; }
table { border-collapse: collapse; width: 100%; font-size: 11pt; margin-top: 4mm; }
th, td { border-bottom: 1px solid #d6dbe0; padding: 2.4mm 2mm; text-align: left; vertical-align: top; }
th { color: #5b6470; font-weight: 600; border-bottom: 2px solid #d6dbe0; }
td.n { white-space: nowrap; }
.total { margin-top: 7mm; font-size: 12pt; color: #33393f; }
.warn { margin-top: 6mm; font-size: 11.5pt; line-height: 1.5; border-left: 3px solid #b3261e; padding-left: 5mm; color: #33393f; }
`;

const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const shout = (s) => (s === s.toUpperCase() ? ' class="shout"' : '');

// Resolve the section PDFs first, so the contents page can state real sheet counts.
const resolved = [];
for (const s of SECTIONS) {
  const path = s.file();
  const doc = await PDFDocument.load(readFileSync(path));
  resolved.push({ ...s, path, pages: doc.getPageCount() });
}

const contentsHtml = `<section class="slip contents">
  <div class="kicker">Print job</div>
  <h1>Generative AI in research and teaching<br/>Workshop print bundle</h1>
  <table><thead><tr><th>Item</th><th>Copies</th><th>Sides</th><th>Paper</th></tr></thead><tbody>
  ${resolved.map((s) => `<tr><td>${esc(s.title)} <span style="color:#5b6470">(${s.pages} ${s.pages === 1 ? 'page' : 'pages'})</span></td>
     <td class="n">${esc(s.copies)}</td><td class="n"${shout(s.sides)}>${esc(s.sides)}</td><td class="n"${shout(s.paper)}>${esc(s.paper)}</td></tr>`).join('')}
  </tbody></table>
  <p class="total">Each section below opens with its own instruction slip. The slips are
  not part of the job and need not be printed.</p>
  <p class="warn">This cannot be run as one job with one setting. The copy counts differ
  per item, two sections must print single-sided because they are cut into cards, and two
  are landscape.</p>
</section>`;

const slipsHtml = resolved.map((s, i) => `<section class="slip">
  <div class="kicker">Section ${i + 1} of ${resolved.length}</div>
  <h1>${esc(s.title)}</h1>
  <dl>
    <dt>Copies</dt><dd>${esc(s.copies)}</dd>
    <dt>Sides</dt><dd${shout(s.sides)}>${esc(s.sides)}</dd>
    <dt>Paper</dt><dd${shout(s.paper)}>${esc(s.paper)}</dd>
    <dt>Finishing</dt><dd>${esc(s.finish)}</dd>
    <dt>Length</dt><dd>${s.pages} ${s.pages === 1 ? 'page' : 'pages'}</dd>
  </dl>
  <p class="note">${esc(s.note)}</p>
</section>`).join('');

const slipsHtmlPath = join(tmpDir, 'slips.html');
const slipsPdfPath = join(tmpDir, 'slips.pdf');
writeFileSync(slipsHtmlPath, `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
  `<title>Print bundle slips</title><style>${CSS}</style></head><body>${contentsHtml}${slipsHtml}</body></html>`);
chromePrint(slipsHtmlPath, slipsPdfPath);

const slips = await PDFDocument.load(readFileSync(slipsPdfPath));
const bundle = await PDFDocument.create();
bundle.setTitle('Workshop print bundle');

// Page 0 of the slips document is the contents page; slip i+1 introduces section i.
const [contentsPage] = await bundle.copyPages(slips, [0]);
bundle.addPage(contentsPage);
for (let i = 0; i < resolved.length; i++) {
  const [slip] = await bundle.copyPages(slips, [i + 1]);
  bundle.addPage(slip);
  const src = await PDFDocument.load(readFileSync(resolved[i].path));
  const pages = await bundle.copyPages(src, src.getPageIndices());
  for (const p of pages) bundle.addPage(p);
}

mkdirSync(outDir, { recursive: true });
const out = resolve(outDir, 'print-bundle.pdf');
writeFileSync(out, await bundle.save());
rmSync(tmpDir, { recursive: true, force: true });

const sheets = resolved.reduce((n, s) => {
  const copies = parseInt(String(s.copies).match(/\d+/)?.[0] ?? '1', 10);
  const perCopy = s.sides.toLowerCase().startsWith('double') ? Math.ceil(s.pages / 2) : s.pages;
  return n + copies * perCopy;
}, 0);
console.log('  =>', out);
console.log(`${bundle.getPageCount()} pages in the bundle; the job itself is about ${sheets} sheets.`);
