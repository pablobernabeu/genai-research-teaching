import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";

// Verify the committed print set: the eight top-level PDFs and the three reprint jobs.
// The job filenames carry the table count, so they are matched by the same pattern the
// producer uses (scripts/reprint-jobs.mjs) and not by fixed names.
const handoutsDir = path.resolve("handouts");
const reprintDir = path.join(handoutsDir, "reprint-jobs");
const reprintPattern = /^0[1-3]-(?:single|double)-sided-.*\.pdf$/i;
const expected = [
  "facilitator-day-of-reset.pdf",
  "facilitator-pack.pdf",
  "group-one-pager.pdf",
  "group-pack.pdf",
  "print-bundle.pdf",
  "seed-signs.pdf",
  "slides.pdf",
  "table-numbers.pdf",
];

if (!existsSync(handoutsDir)) {
  throw new Error(
    "handouts/ does not exist. It is the committed print record, so restore it with " +
    "git checkout -- handouts/ and do not rebuild it."
  );
}

const actual = readdirSync(handoutsDir).filter((file) => file.endsWith(".pdf")).sort();
const missing = expected.filter((file) => !actual.includes(file));
const unexpected = actual.filter((file) => !expected.includes(file));
if (missing.length || unexpected.length) {
  const details = [];
  if (missing.length) details.push("missing: " + missing.join(", "));
  if (unexpected.length) details.push("unexpected: " + unexpected.join(", "));
  throw new Error("Handout set does not match the expected files (" + details.join("; ") + ").");
}

for (const file of expected) {
  const pdf = await PDFDocument.load(readFileSync(path.join(handoutsDir, file)));
  const pages = pdf.getPageCount();
  if (pages < 1) throw new Error(file + " contains no pages.");
  console.log(`${file}: ${pages} page${pages === 1 ? "" : "s"}`);
}

if (!existsSync(reprintDir)) {
  throw new Error("handouts/reprint-jobs/ does not exist. Run npm run build:reprint to write the three jobs.");
}

const reprintJobs = readdirSync(reprintDir).filter((file) => reprintPattern.test(file)).sort();
if (reprintJobs.length !== 3) {
  throw new Error(
    `handouts/reprint-jobs/ holds ${reprintJobs.length} numbered job${reprintJobs.length === 1 ? "" : "s"}, ` +
    "and three are expected (facilitator update, group sheets, group reference packs)."
  );
}

for (const file of reprintJobs) {
  const pdf = await PDFDocument.load(readFileSync(path.join(reprintDir, file)));
  const pages = pdf.getPageCount();
  if (pages < 1) throw new Error(file + " contains no pages.");
  console.log(`reprint-jobs/${file}: ${pages} page${pages === 1 ? "" : "s"}`);
}

console.log(
  `Handout check passed: ${expected.length} PDFs and ${reprintJobs.length} reprint jobs are present and readable.`
);