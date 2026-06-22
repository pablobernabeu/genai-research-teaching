// Render Markdown documents to clean, paginated PDFs — for sharing materials as
// attachments (e.g. an organiser preview). Pipeline: Markdown -> HTML (markdown-it)
// -> PDF (headless Edge/Chrome "print to PDF"). No LaTeX or pandoc needed.
//
//   node scripts/md2pdf.mjs project_tracks.md evaluation_rubric_template.md
//
// Outputs to dist/ with hyphenated names (project-tracks.pdf, …). Needs a Chromium
// browser; set CHROME_PATH if Edge/Chrome is not at a standard location.

import { readFileSync, writeFileSync, mkdirSync, existsSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { basename, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import MarkdownIt from 'markdown-it';

const md = new MarkdownIt({ html: true, linkify: true, typographer: true });

const CSS = `
@page { size: A4; margin: 18mm 16mm; }
body { font: 11pt/1.5 "Segoe UI", Arial, system-ui, sans-serif; color: #1c2024; }
h1, h2, h3 { color: #0f6e6e; line-height: 1.2; break-after: avoid; }
h1 { font-size: 20pt; border-bottom: 2px solid #d6dbe0; padding-bottom: .2em; }
h2 { font-size: 14pt; margin-top: 1.3em; border-bottom: 1px solid #e6eaee; padding-bottom: .12em; }
h3 { font-size: 12pt; color: #1c2024; }
a { color: #0f6e6e; text-decoration: none; }
strong { color: #0f6e6e; }
em { color: #5b6470; }
code { background: #eef2f2; border-radius: 3px; padding: .05em .3em; font-size: .9em; }
pre { background: #f6f8f8; border: 1px solid #e6eaee; border-radius: 6px; padding: .7em .9em; font-size: 9pt; break-inside: avoid; white-space: pre-wrap; }
pre code { background: none; padding: 0; }
table { border-collapse: collapse; width: 100%; font-size: 9.5pt; margin: .6em 0; break-inside: avoid; }
th, td { border: 1px solid #d6dbe0; padding: .3em .5em; text-align: left; vertical-align: top; }
th { background: #eef3f3; }
blockquote { border-left: 3px solid #0f6e6e; margin: .8em 0; padding: .2em .9em; color: #5b6470; break-inside: avoid; }
hr { border: none; border-top: 1px solid #d6dbe0; margin: 1.2em 0; }
ul, ol { padding-left: 1.3em; }
li { margin: .15em 0; }
.page-break { break-before: page; }
`;

// A denser variant for single-sheet handouts (the one-pagers): smaller type, tighter
// margins and spacing, so a content-rich sheet fits on one printed side.
const COMPACT_CSS = `
@page { size: A4; margin: 9mm 11mm; }
body { font: 9.2pt/1.26 "Segoe UI", Arial, system-ui, sans-serif; color: #1c2024; }
h1, h2, h3 { color: #0f6e6e; line-height: 1.12; break-after: avoid; }
h1 { font-size: 15pt; border-bottom: 2px solid #d6dbe0; padding-bottom: .1em; margin: 0 0 .25em; }
h2 { font-size: 11pt; margin: .6em 0 .12em; border-bottom: 1px solid #e6eaee; padding-bottom: .07em; }
h3 { font-size: 9.6pt; color: #1c2024; margin: .25em 0 .08em; }
p { margin: .22em 0; }
a { color: #0f6e6e; text-decoration: none; }
strong { color: #0f6e6e; }
em { color: #5b6470; }
code { background: #eef2f2; border-radius: 3px; padding: .03em .25em; font-size: .9em; }
ul, ol { padding-left: 1.1em; margin: .2em 0; }
li { margin: .03em 0; }
hr { border: none; border-top: 1px solid #d6dbe0; margin: .45em 0; }
`;

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

// Leading flags: "--out <dir>" sets the output directory (default: dist);
// "--bundle <name>" concatenates all inputs into a single PDF, one section per file
// with a page break between (default: one PDF per file).
let args = process.argv.slice(2);
let outDir = 'dist';
let bundle = null;
let compact = false;
while (args[0] && args[0].startsWith('--')) {
  if (args[0] === '--out') { outDir = args[1]; args = args.slice(2); }
  else if (args[0] === '--bundle') { bundle = args[1]; args = args.slice(2); }
  else if (args[0] === '--compact') { compact = true; args = args.slice(1); }
  else break;
}
const activeCss = compact ? COMPACT_CSS : CSS;
const files = args;
if (!files.length) {
  console.error('usage: node scripts/md2pdf.mjs [--out <dir>] [--bundle <name>] <file.md> [<file.md> ...]');
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
  execFileSync(browser, [
    '--headless=new', '--disable-gpu', '--no-pdf-header-footer',
    `--print-to-pdf=${out}`, pathToFileURL(tmp).href,
  ], { stdio: 'ignore' });
  rmSync(tmp);
  console.log('  =>', out);
}

if (bundle) {
  const body = files.map(f => md.render(readFileSync(f, 'utf8')))
    .join('\n\n<div class="page-break"></div>\n\n');
  renderToPdf(body, bundle);
} else {
  for (const f of files) renderToPdf(md.render(readFileSync(f, 'utf8')), basename(f, '.md'));
}
