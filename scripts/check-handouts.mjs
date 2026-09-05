// Fail if any committed handout is older than a source it is built from. The print PDFs
// have twice gone to the point of being handed to a printer while a document revision
// behind, and nothing in the repository noticed.
//
//   node scripts/check-handouts.mjs
//
// It compares modification times, not content, so it cannot prove a PDF is current after
// a checkout that rewrites timestamps. Run `npm run build:publish` if in doubt: this
// catches the case that actually happens, which is editing Markdown and forgetting.

import { statSync, existsSync } from 'node:fs';

const SOURCES = {
  'slides.pdf': ['slides.md', 'themes/workshop.css', 'marp.config.mjs'],
  'group-one-pager.pdf': ['docs/group_one_pager.md'],
  'facilitator-day-of-reset.pdf': ['docs/facilitator_day_of_reset.md'],
  'lightning-round-tally.pdf': ['docs/lightning_round_tally.md'],
  'group-pack.pdf': ['docs/group_pack_cover.md', 'docs/role_cards.md', 'docs/data_decision_aid.md',
                     'evaluation_rubric_template.md', 'docs/worked_examples.md', 'docs/starter_prompts.md'],
  'facilitator-pack.pdf': ['docs/cue_cards.md', 'docs/facilitator_run_sheet.md', 'docs/morning_checklist.md'],
  'seed-signs.pdf': ['project_tracks.md'],
  'table-numbers.pdf': [],
};
// The bundle is assembled from all of the above, plus its own script.
SOURCES['print-bundle.pdf'] = [...new Set(Object.values(SOURCES).flat())];

const stale = [];
for (const [pdf, sources] of Object.entries(SOURCES)) {
  const out = `handouts/${pdf}`;
  if (!existsSync(out)) { stale.push(`${out} is missing`); continue; }
  const built = statSync(out).mtimeMs;
  for (const src of [...sources, 'scripts/md2pdf.mjs', 'scripts/printbundle.mjs', 'scripts/roomsigns.mjs']) {
    if (existsSync(src) && statSync(src).mtimeMs > built) stale.push(`${out} is older than ${src}`);
  }
}

if (stale.length) {
  console.error('Committed handouts are behind their sources:');
  for (const line of [...new Set(stale)]) console.error('  ' + line);
  console.error('\nRun `npm run build:publish` before sending anything to a printer.');
  process.exit(1);
}
console.log('Every committed handout is at least as new as its sources.');
