import { existsSync, readdirSync, readFileSync } from "node:fs";
import path from "node:path";
import { PDFDocument } from "pdf-lib";

const handoutsDir = path.resolve("handouts");
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
  throw new Error("handouts/ does not exist. Run npm run build:publish first.");
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

console.log(`Handout check passed: ${expected.length} PDFs are present and readable.`);