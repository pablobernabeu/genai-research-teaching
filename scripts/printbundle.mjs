// Assemble every printable item into one PDF for the print shop, arranged around the
// three jobs the facilitator actually does: cut the cards, collate the group bundles,
// and put up the room signs. Each section sits behind a slip stating its copy count,
// whether it prints single- or double-sided, and which way up the paper goes.
//
//   node scripts/printbundle.mjs                  # -> dist/handouts/print-bundle.pdf
//   node scripts/printbundle.mjs --out handouts   # -> the committed handouts folder
//   node scripts/printbundle.mjs --groups 8       # size the job for 8 tables (default 10)
//
// The cards are laid out two to a page in fixed half-page slots, so the cut line falls
// at the same height on every sheet and a whole stack can be cut in one pass. Pages
// carry a footer naming their section and their position in it, so a booklet that has
// lost a leaf is obvious while collating. Needs a Chromium browser, as the other PDF
// steps do.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { resolve, join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

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

function renderHtml(name, html) {
  const htmlPath = join(tmpDir, `${name}.html`);
  const pdfPath = join(tmpDir, `${name}.pdf`);
  writeFileSync(htmlPath, html);
  chromePrint(htmlPath, pdfPath);
  return pdfPath;
}

function renderDoc(name, mdFiles) {
  execFileSync(process.execPath, ['scripts/md2pdf.mjs', '--out', tmpDir, '--bundle', name, ...mdFiles],
    { stdio: ['ignore', 'ignore', 'pipe'] });
  return join(tmpDir, `${name}.pdf`);
}

// ---- cut sheets ----------------------------------------------------------------
// Cards are separated in the source by a scissors rule. The preamble before the first
// rule and the disclaimer after the last are page furniture, not cards, so the loose
// cutting copy drops both: every slot on these sheets is a card and nothing else.
function readCards(mdFile) {
  const src = readFileSync(mdFile, 'utf8');
  const chunks = src.split(/^### ✂.*$/m).slice(1).map((c) => c.trim()).filter(Boolean);
  return chunks.filter((c) => c.startsWith('##')).map((c) => md.render(c));
}

const CUT_CSS = `
@page { size: A4; margin: 0; }
body { margin: 0; font-family: "Segoe UI", Arial, system-ui, sans-serif; color: #1c2024; }
.sheet { width: 210mm; height: 297mm; box-sizing: border-box; break-after: page;
         display: flex; flex-direction: column; }
.sheet:last-child { break-after: auto; }
/* Two equal slots, so the cut always falls at exactly half the sheet. */
.slot { height: 148.5mm; box-sizing: border-box; padding: 11mm 14mm 7mm; overflow: hidden; position: relative; }
.slot.top { border-bottom: 1px dashed #9aa3ab; }
.scissors { position: absolute; left: 4mm; bottom: -3.1mm; font-size: 11pt; color: #9aa3ab; background: #fff; padding: 0 1mm; }
.slot h2 { font-size: 15pt; color: #000; margin: 0 0 2mm; line-height: 1.15; }
.slot h2 em { font-style: italic; color: #3a4046; font-weight: 600; }
.slot p { margin: .9mm 0; font-size: 10pt; line-height: 1.34; }
.slot ul { margin: 1.2mm 0; padding-left: 5mm; }
.slot li { font-size: 10pt; line-height: 1.34; margin: .7mm 0; }
.slot strong { color: #000; }
.slot blockquote { margin: 1.5mm 0; padding-left: 4mm; border-left: 2px solid #6b7278; color: #5b6470; font-size: 9.5pt; }
.tag { position: absolute; right: 14mm; bottom: 5mm; font-size: 7.5pt; color: #9aa3ab; letter-spacing: .04em; }
.empty { color: #c3c9cf; font-size: 9pt; text-align: center; padding-top: 60mm; }
`;

function renderCutSheets(name, mdFile, label) {
  const cards = readCards(mdFile);
  const sheets = [];
  for (let i = 0; i < cards.length; i += 2) {
    const top = cards[i];
    const bottom = cards[i + 1];
    sheets.push(
      `<section class="sheet">` +
      `<div class="slot top">${top}<span class="scissors">✂</span>` +
      `<span class="tag">${label} ${i + 1} of ${cards.length}</span></div>` +
      `<div class="slot">${bottom ?? '<p class="empty">This half is deliberately blank.</p>'}` +
      (bottom ? `<span class="tag">${label} ${i + 2} of ${cards.length}</span>` : '') +
      `</div></section>`
    );
  }
  const path = renderHtml(name,
    `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${name}</title>` +
    `<style>${CUT_CSS}</style></head><body>${sheets.join('')}</body></html>`);
  return { path, count: cards.length };
}

const roleCards = renderCutSheets('cut-role-cards', 'docs/role_cards.md', 'Role card');
const cueCards = renderCutSheets('cut-cue-cards', 'docs/cue_cards.md', 'Cue card');

// ---- sections, ordered by the job they belong to --------------------------------
const onePager = Math.max(2 * groups, 2);
const SECTIONS = [
  {
    part: 'Part 1 — cut these',
    title: 'Role cards, for cutting',
    path: roleCards.path,
    copies: `${groups} copies`,
    sides: 'SINGLE-SIDED', paper: 'A4 portrait', finish: 'Cut once across the middle of every sheet',
    note: `${roleCards.count} cards, two to a sheet. Every sheet cuts at the same height, so the whole stack can go through a guillotine in one pass. Cutting a double-sided sheet would destroy its reverse, which is why this section prints on one side only.`,
    footer: false,
  },
  {
    part: 'Part 1 — cut these',
    title: 'Facilitator cue cards, for cutting',
    path: cueCards.path,
    copies: '1 copy',
    sides: 'SINGLE-SIDED', paper: 'A4 portrait', finish: 'Cut once across the middle of every sheet, then keep in clock order',
    note: `${cueCards.count} cards, two to a sheet, running from 12:00 to 13:40. Each card is numbered in its corner, so the order survives the cutting.`,
    footer: false,
  },
  {
    part: 'Part 2 — collate into group bundles',
    title: 'Group pack booklet',
    path: 'handouts/group-pack.pdf',
    copies: `${groups} copies, plus one spare`,
    sides: 'Double-sided', paper: 'A4 portrait', finish: 'Stapled, top left',
    note: 'One booklet per table. The cover has fill-in fields, so every table needs its own. The footer numbers every page, so a booklet missing a leaf shows up while collating.',
    footer: 'Group pack',
  },
  {
    part: 'Part 2 — collate into group bundles',
    title: 'Group quick-start one-pager',
    path: 'handouts/group-one-pager.pdf',
    copies: `${onePager} copies`,
    sides: 'Single-sided', paper: 'A4 portrait', finish: 'Loose, two laid on each table',
    note: 'Two per table, on top of the booklet.',
    footer: 'Group one-pager',
  },
  {
    part: 'Part 3 — facilitator only',
    title: 'Run sheet and morning checklist',
    path: () => renderDoc('runsheet-and-checklist', ['docs/facilitator_run_sheet.md', 'docs/morning_checklist.md']),
    copies: '1 copy',
    sides: 'Double-sided', paper: 'A4 portrait', finish: 'Stapled',
    note: 'Kept with the cue cards.',
    footer: 'Run sheet',
  },
  {
    part: 'Part 3 — facilitator only',
    title: 'Day-of app reset',
    path: 'handouts/facilitator-day-of-reset.pdf',
    copies: '1 copy',
    sides: 'Single-sided', paper: 'A4 portrait', finish: 'Loose',
    note: 'The passcode, timer and export steps for the lunch break.',
    footer: 'App reset',
  },
  {
    part: 'Part 4 — put up around the room',
    title: 'Seed-idea signs',
    path: 'handouts/seed-signs.pdf',
    copies: '1 copy',
    sides: 'SINGLE-SIDED', paper: 'A4 LANDSCAPE', finish: 'Heaviest paper available',
    note: 'Posted around the room before 12:00, spread out so ten groups can gather without crowding. Do not let the printer rotate or shrink these to fit portrait.',
    footer: false,
  },
  {
    part: 'Part 4 — put up around the room',
    title: 'Table numbers',
    path: 'handouts/table-numbers.pdf',
    copies: '1 copy',
    sides: 'SINGLE-SIDED', paper: 'A4 LANDSCAPE', finish: 'Heaviest paper available',
    note: 'One on each table, readable across the room.',
    footer: false,
  },
];

const resolved = [];
for (const s of SECTIONS) {
  const path = typeof s.path === 'function' ? s.path() : s.path;
  const doc = await PDFDocument.load(readFileSync(path));
  resolved.push({ ...s, path, pages: doc.getPageCount() });
}

// ---- slips ----------------------------------------------------------------------
const SLIP_CSS = `
@page { size: A4; margin: 0; }
body { margin: 0; font-family: "Segoe UI", Arial, system-ui, sans-serif; color: #1c2024; }
.slip { width: 210mm; height: 297mm; box-sizing: border-box; padding: 30mm 26mm;
        display: flex; flex-direction: column; break-after: page; }
.slip:last-child { break-after: auto; }
.kicker { font-size: 11pt; letter-spacing: .2em; text-transform: uppercase; color: #5b6470; }
.part { font-size: 13pt; color: #000; font-weight: 600; margin-top: 1mm; }
h1 { font-size: 28pt; color: #000; margin: 3mm 0 7mm; line-height: 1.15; }
dl { display: grid; grid-template-columns: 40mm 1fr; gap: 2.6mm 6mm; font-size: 12.5pt; margin: 0 0 8mm; }
dt { color: #5b6470; }
dd { margin: 0; font-weight: 600; }
dd.shout { color: #fff; background: #000; padding: 0 2mm; display: inline-block; }
.note { font-size: 11.5pt; line-height: 1.5; border-left: 3px solid #6b7278; padding-left: 5mm; color: #33393f; }
h2 { font-size: 22pt; color: #000; margin: 0 0 5mm; }
table { border-collapse: collapse; width: 100%; font-size: 10.5pt; }
th, td { border-bottom: 1px solid #d6dbe0; padding: 2.2mm 2mm; text-align: left; vertical-align: top; }
th { color: #5b6470; font-weight: 600; border-bottom: 2px solid #d6dbe0; }
td.n { white-space: nowrap; }
td.shout { white-space: nowrap; font-weight: 700; }
td.shout span { color: #fff; background: #000; padding: 0 1.4mm; }
tr.part-row td { background: #ececec; color: #000; font-weight: 700; border-bottom: none; padding-top: 4mm; }
.warn { margin-top: 6mm; font-size: 11pt; line-height: 1.5; border-left: 3px solid #000; padding-left: 5mm; color: #33393f; }
`;
const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const isShout = (s) => s === s.toUpperCase();
const shout = (s) => (isShout(s) ? ' class="shout"' : '');
// A reversed-out chip survives a mono printer where a colour would not.
const cell = (s) => (isShout(s) ? `<td class="n shout"><span>${esc(s)}</span></td>` : `<td class="n">${esc(s)}</td>`);

let lastPart = null;
const rows = resolved.map((s) => {
  const head = s.part !== lastPart ? `<tr class="part-row"><td colspan="4">${esc(s.part)}</td></tr>` : '';
  lastPart = s.part;
  return head + `<tr><td>${esc(s.title)} <span style="color:#5b6470">(${s.pages} ${s.pages === 1 ? 'page' : 'pages'})</span></td>
    <td class="n">${esc(s.copies)}</td>${cell(s.sides)}${cell(s.paper)}</tr>`;
}).join('');

const contentsHtml = `<section class="slip">
  <div class="kicker">Print job</div>
  <h2 style="margin-top:4mm">Generative AI in research and teaching</h2>
  <h1 style="margin-top:-3mm">Workshop print bundle</h1>
  <table><thead><tr><th>Item</th><th>Copies</th><th>Sides</th><th>Paper</th></tr></thead><tbody>${rows}</tbody></table>
  <p class="warn">This cannot be run as one job with one setting. The copy counts differ
  per item, the two card sections must print single-sided because they are cut, and the
  room signs are landscape. Each section below opens with its own instruction slip; the
  slips are not part of the job and need not be printed.</p>
</section>`;

lastPart = null;
const slipsHtml = resolved.map((s, i) => {
  const partLine = s.part !== lastPart ? `<div class="part">${esc(s.part)}</div>` : '';
  lastPart = s.part;
  return `<section class="slip">
    <div class="kicker">Section ${i + 1} of ${resolved.length}</div>
    ${partLine}
    <h1>${esc(s.title)}</h1>
    <dl>
      <dt>Copies</dt><dd>${esc(s.copies)}</dd>
      <dt>Sides</dt><dd${shout(s.sides)}>${esc(s.sides)}</dd>
      <dt>Paper</dt><dd${shout(s.paper)}>${esc(s.paper)}</dd>
      <dt>Finishing</dt><dd>${esc(s.finish)}</dd>
      <dt>Length</dt><dd>${s.pages} ${s.pages === 1 ? 'page' : 'pages'}</dd>
    </dl>
    <p class="note">${esc(s.note)}</p>
  </section>`;
}).join('');

const slipsPdfPath = renderHtml('slips',
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>Print bundle slips</title>` +
  `<style>${SLIP_CSS}</style></head><body>${contentsHtml}${slipsHtml}</body></html>`);

// ---- assemble -------------------------------------------------------------------
const slips = await PDFDocument.load(readFileSync(slipsPdfPath));
const bundle = await PDFDocument.create();
bundle.setTitle('Workshop print bundle');
const font = await bundle.embedFont(StandardFonts.Helvetica);

const [contentsPage] = await bundle.copyPages(slips, [0]);
bundle.addPage(contentsPage);
for (let i = 0; i < resolved.length; i++) {
  const [slip] = await bundle.copyPages(slips, [i + 1]);
  bundle.addPage(slip);
  const src = await PDFDocument.load(readFileSync(resolved[i].path));
  const pages = await bundle.copyPages(src, src.getPageIndices());
  // A footer naming the section and the position within it, so a booklet that has lost
  // a leaf is obvious while collating. The card sheets are exempt: their footer would
  // be cut off with the lower card, and each card already carries its own number.
  pages.forEach((p, j) => {
    if (resolved[i].footer) {
      const { width } = p.getSize();
      const left = `${resolved[i].footer}`;
      const right = `${j + 1} of ${pages.length}`;
      p.drawText(left, { x: 42, y: 22, size: 7.5, font, color: rgb(0.6, 0.64, 0.68) });
      p.drawText(right, { x: width - 42 - font.widthOfTextAtSize(right, 7.5), y: 22, size: 7.5, font, color: rgb(0.6, 0.64, 0.68) });
    }
    bundle.addPage(p);
  });
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
