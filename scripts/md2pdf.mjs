// Render Markdown documents to clean, paginated PDFs, for sharing materials as
// attachments (e.g. an organiser preview). Pipeline: Markdown -> HTML (markdown-it)
// -> PDF (headless Edge/Chrome 'print to PDF'). No LaTeX or pandoc needed.
//
//   node scripts/md2pdf.mjs project_tracks.md evaluation_rubric_template.md
//
// Outputs to dist/ with hyphenated names (project-tracks.pdf, ...). Needs a Chromium
// browser, found and launched by scripts/chrome.mjs.

import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { basename, resolve } from 'node:path';
import MarkdownIt from 'markdown-it';
import { findBrowser, printToPdf } from './chrome.mjs';
import { num } from './args.mjs';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

// markdown-it leaves the task-list syntax of "- [ ] ..." as the literal characters
// "[ ]", which reads poorly on a checklist someone actually ticks with a pen. Turn it
// into a class the stylesheets draw as an empty box.
const render = (src) => md.render(src).replace(/<li>\s*\[[ xX]\]\s*/g, '<li class="tick">');

const CSS = `
@page { size: A4; margin: 19mm 28mm 16mm; }
body { font: 12pt/1.6 "Segoe UI", Arial, system-ui, sans-serif; color: #16191c;
       hyphens: none; text-wrap: pretty; }
h1, h2, h3, h4 { color: #000; line-height: 1.22; break-after: avoid; break-inside: avoid; }
p, li, blockquote { orphans: 2; widows: 2; }
h1 { font-size: 21pt; border-bottom: 2px solid #b9c0c7; padding-bottom: .18em; margin: 0 0 .7em; }
h2 { font-size: 15pt; margin: 1.6em 0 .45em; border-bottom: 1px solid #d6dbe0; padding-bottom: .12em; }
h3 { font-size: 12.6pt; color: #16191c; margin: 1.1em 0 .3em; }
p { margin: .55em 0; }
a { color: #16191c; text-decoration: underline; }
strong { color: #000; }
em { color: #3a4046; }
code { background: #eceef0; border-radius: 3px; padding: .05em .3em; font-size: .9em; }
pre { background: #f2f3f4; border: 1px solid #c8ccd0; border-radius: 6px; padding: .7em .9em; font-size: 10pt; white-space: pre-wrap; }
pre code { background: none; padding: 0; }
table { border-collapse: collapse; width: 100%; font-size: 10.5pt; line-height: 1.42; margin: .8em 0; break-inside: avoid; }
th, td { border: 1px solid #c8ccd0; padding: .42em .55em; text-align: left; vertical-align: top; }
th { background: #e6e8ea; color: #000; }
table.rows td { height: 12mm; }
table.rows td.n { color: #5b6470; text-align: center; font-variant-numeric: tabular-nums; }
blockquote { border-left: 4px solid #16191c; background: #f2f3f4; margin: 1em 0;
             padding: .55em 1em; color: #23282d; break-inside: avoid; }
blockquote p { margin: .3em 0; }
hr { border: none; border-top: 1px solid #c8ccd0; margin: 1.6em 0; }
ul, ol { padding-left: 1.35em; margin: .55em 0; }
li { margin: .3em 0; }
li > ul, li > ol { margin: .25em 0; }
li.tick { list-style: none; position: relative; margin-left: -.35em; padding-left: 1.6em; }
li.tick::before { content: ""; position: absolute; left: 0; top: .3em; width: .8em; height: .8em; border: 1px solid #16191c; }
.page-break { break-before: page; }
`;

// A denser variant for the single-sheet handouts. It trades the booklet's generous
// setting for enough room to fit a content-rich sheet on one printed side, and it can
// set the text in columns (--columns), which is what keeps the line short enough to
// read quickly even at this size. The body point size is adjustable (--fontpt), and
// headings are em-relative, so they scale with it.
const compactCss = (pt = 9.2, columns = 1) => `
@page { size: A4; margin: 10mm 12mm; }
body { font: ${pt}pt/1.4 "Segoe UI", Arial, system-ui, sans-serif; color: #16191c;
       hyphens: none; text-wrap: pretty;${columns > 1 ? `
       column-count: ${columns}; column-gap: 8mm; column-rule: 1px solid #d6dbe0;` : ''} }
h1, h2, h3, h4 { color: #000; line-height: 1.15; break-after: avoid; break-inside: avoid; }
p, li { orphans: 2; widows: 2; }
h1 { font-size: 1.7em; border-bottom: 2px solid #b9c0c7; padding-bottom: .1em; margin: 0 0 .35em;${columns > 1 ? ' column-span: all;' : ''} }
h2 { font-size: 1.22em; margin: .85em 0 .2em; border-bottom: 1px solid #d6dbe0; padding-bottom: .08em; }
h3 { font-size: 1.05em; color: #16191c; margin: .4em 0 .1em; }
p { margin: .3em 0; }
a { color: #16191c; text-decoration: underline; }
strong { color: #000; }
em { color: #3a4046; }
code { background: #eceef0; border-radius: 3px; padding: .03em .25em; font-size: .9em; }
ul, ol { list-style: none; padding-left: 0; margin: .28em 0; }
li { position: relative; padding-left: 1.35em; margin: .22em 0; break-inside: avoid; }
ul > li::before { content: "\\2022"; position: absolute; left: 0.5em; color: #3a4046; }
ol { counter-reset: li-counter; }
ol > li { counter-increment: li-counter; }
ol > li::before { content: counter(li-counter) "."; position: absolute; left: 0.2em; color: #3a4046; font-variant-numeric: tabular-nums; }
li.tick { padding-left: 1.5em; }
li.tick::before { content: ""; position: absolute; left: 0.1em; top: .3em; width: .82em; height: .82em; border: 1px solid #16191c; }
hr { border: none; border-top: 1px solid #c8ccd0; margin: .7em 0;${columns > 1 ? ' column-span: all;' : ''} }
table { border-collapse: collapse; width: 100%; font-size: .96em; margin: .5em 0; break-inside: avoid; }
th, td { border: 1px solid #c8ccd0; padding: .3em .45em; text-align: left; vertical-align: top; }
th { background: #e6e8ea; color: #000; }
table.rows td { height: 11mm; }
table.rows td.n { color: #5b6470; text-align: center; font-variant-numeric: tabular-nums; }
`;

// Leading flags. '--out <dir>' sets the output directory (default: dist).
// '--bundle <name>' concatenates all inputs into a single PDF, one section per file
// with a page break between (default: one PDF per file).
let args = process.argv.slice(2);
let outDir = 'dist';
let bundle = null;
let compact = false;
let compactPt = 9.2;
let columns = 1;
while (args[0] && args[0].startsWith('--')) {
  if (args[0] === '--out') { outDir = args[1]; args = args.slice(2); }
  else if (args[0] === '--bundle') { bundle = args[1]; args = args.slice(2); }
  else if (args[0] === '--compact') { compact = true; args = args.slice(1); }
  else if (args[0] === '--fontpt') { compactPt = num(args[1], '--fontpt'); args = args.slice(2); }
  else if (args[0] === '--columns') { columns = num(args[1], '--columns'); args = args.slice(2); }
  else break;
}
const activeCss = compact ? compactCss(compactPt, columns) : CSS;
const files = args;
if (!files.length) {
  console.error('usage: node scripts/md2pdf.mjs [options] <file.md> [<file.md> ...]');
  console.error('  --out <dir>      where the PDFs go (default: dist/)');
  console.error('  --bundle <name>  concatenate the inputs into one <name>.pdf');
  console.error('  --compact        the denser single-sheet layout, for the one-pagers');
  console.error('  --fontpt <pt>    base font size in points, with --compact');
  console.error('  --columns <n>    set the text in n columns, with --compact');
  process.exit(1);
}

mkdirSync(outDir, { recursive: true });
const browser = findBrowser();

function renderToPdf(bodyHtml, name) {
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">` +
    `<title>${name}</title><style>${activeCss}</style></head><body>${bodyHtml}</body></html>`;
  const tmp = resolve(outDir, `${name}.tmp.html`);
  const out = resolve(outDir, `${name.replace(/_/g, '-')}.pdf`);
  writeFileSync(tmp, html);
  try {
    printToPdf(browser, tmp, out, name);
  } finally {
    rmSync(tmp, { force: true });
  }
  console.log('  =>', out);
}

if (bundle) {
  const body = files.map(f => render(readFileSync(f, 'utf8')))
    .join('\n\n<div class="page-break"></div>\n\n');
  renderToPdf(body, bundle);
} else {
  for (const f of files) renderToPdf(render(readFileSync(f, 'utf8')), basename(f, '.md'));
}
