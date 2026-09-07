// Produce only the material missing from a previously printed, older print bundle.
// The output filenames carry the print-room settings, so each PDF is a separate job.
//
//   node scripts/reprint-jobs.mjs
//   node scripts/reprint-jobs.mjs --out handouts/reprint-jobs --tables 10

import { copyFileSync, mkdirSync, readdirSync, rmSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { join, resolve } from 'node:path';

let args = process.argv.slice(2);
let outDir = 'handouts/reprint-jobs';
let tables = 10;

while (args[0] && args[0].startsWith('--')) {
  if (args[0] === '--out') {
    outDir = args[1];
    args = args.slice(2);
  } else if (args[0] === '--tables') {
    tables = Number.parseInt(args[1], 10);
    args = args.slice(2);
  } else {
    throw new Error(`Unknown option: ${args[0]}`);
  }
}

if (!Number.isInteger(tables) || tables < 1) {
  throw new Error('--tables must be a positive whole number.');
}

const resolvedOutDir = resolve(outDir);
const tmpDir = join(resolvedOutDir, '.reprint-tmp');
mkdirSync(tmpDir, { recursive: true });

for (const file of readdirSync(resolvedOutDir)) {
  if (/^0[1-3]-(?:single|double)-sided-.*\.pdf$/i.test(file)) {
    rmSync(join(resolvedOutDir, file), { force: true });
  }
}

function render(...renderArgs) {
  execFileSync(process.execPath, ['scripts/md2pdf.mjs', '--out', tmpDir, ...renderArgs], {
    stdio: 'inherit',
  });
}

try {
  render('--compact', '--fontpt', '10.2', 'docs/reprint_with_existing_bundle.md');
  render('--compact', '--fontpt', '10.2', 'docs/group_one_pager.md');
  render('--bundle', 'group-reference-pack', 'docs/worked_examples.md', 'evaluation_rubric_template.md');

  const jobs = [
    {
      source: 'reprint-with-existing-bundle.pdf',
      destination: '01-single-sided-1-copy-facilitator-update.pdf',
    },
    {
      source: 'group-one-pager.pdf',
      destination: `02-single-sided-${tables * 2}-copies-group-sheets.pdf`,
    },
    {
      source: 'group-reference-pack.pdf',
      destination: `03-double-sided-long-edge-collated-${tables}-copies-group-reference-packs.pdf`,
    },
  ];

  for (const job of jobs) {
    copyFileSync(join(tmpDir, job.source), join(resolvedOutDir, job.destination));
    console.log(`  => ${join(resolvedOutDir, job.destination)}`);
  }
} finally {
  rmSync(tmpDir, { recursive: true, force: true });
}