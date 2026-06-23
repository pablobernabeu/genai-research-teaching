# Convenience targets for Unix users. They mirror the npm scripts in package.json,
# which are the primary, cross-platform interface. On Windows, use `npm run ...`.
#
#   make            build HTML and PDF into dist/
#   make html       HTML only
#   make pdf        PDF only (needs a Chromium/Edge browser)
#   make pptx       PowerPoint
#   make pack       organiser preview pack: slides + group pack + facilitator pack (npm run build:preview)
#   make handouts   print-ready handout PDFs into dist/handouts/ (core set + the two one-pagers)
#   make grouppack       one combined per-table group pack PDF
#   make facilitatorpack one combined facilitator pack PDF
#   make publish    refresh the committed ready-to-print PDFs in handouts/ (npm run build:publish)
#   make watch      live-reloading preview
#   make clean      remove dist/
#   make install    install marp-cli locally

MARP   := npx marp --config-file ./marp.config.mjs
SLIDES := ./slides.md
OUT    := ./dist

.PHONY: all html pdf pptx docs pack handouts handoutscore onepagers grouppack facilitatorpack publish watch preview clean install

all: html pdf

install:
	npm install

html:
	$(MARP) $(SLIDES) -o $(OUT)/slides.html

pdf:
	$(MARP) $(SLIDES) -o $(OUT)/slides.pdf

pptx:
	$(MARP) $(SLIDES) -o $(OUT)/slides.pptx

docs:
	node scripts/md2pdf.mjs project_tracks.md evaluation_rubric_template.md

pack: pdf grouppack facilitatorpack

handouts: handoutscore onepagers

handoutscore:
	node scripts/md2pdf.mjs --out dist/handouts docs/role_cards.md docs/data_decision_aid.md docs/starter_prompts.md docs/worked_examples.md evaluation_rubric_template.md docs/cue_cards.md docs/museum_of_caught_errors.md docs/morning_checklist.md docs/facilitator_run_sheet.md project_tracks.md

onepagers:
	node scripts/md2pdf.mjs --compact --fontpt 10.2 --out dist/handouts docs/group_one_pager.md
	node scripts/md2pdf.mjs --compact --out dist/handouts docs/facilitator_day_of_reset.md

grouppack:
	node scripts/md2pdf.mjs --out dist/handouts --bundle group-pack docs/group_pack_cover.md docs/role_cards.md docs/data_decision_aid.md evaluation_rubric_template.md docs/worked_examples.md docs/starter_prompts.md

facilitatorpack:
	node scripts/md2pdf.mjs --out dist/handouts --bundle facilitator-pack docs/cue_cards.md docs/facilitator_run_sheet.md docs/morning_checklist.md

# Refresh the five committed, ready-to-print PDFs under handouts/ (mirrors build:publish).
publish:
	node -e "require('fs').mkdirSync('handouts',{recursive:true})"
	$(MARP) $(SLIDES) -o ./handouts/slides.pdf
	node scripts/md2pdf.mjs --compact --fontpt 10.2 --out handouts docs/group_one_pager.md
	node scripts/md2pdf.mjs --compact --out handouts docs/facilitator_day_of_reset.md
	node scripts/md2pdf.mjs --out handouts --bundle group-pack docs/group_pack_cover.md docs/role_cards.md docs/data_decision_aid.md evaluation_rubric_template.md docs/worked_examples.md docs/starter_prompts.md
	node scripts/md2pdf.mjs --out handouts --bundle facilitator-pack docs/cue_cards.md docs/facilitator_run_sheet.md docs/morning_checklist.md

watch:
	$(MARP) -w -s .

preview:
	$(MARP) -p $(SLIDES)

clean:
	node -e "require('fs').rmSync('dist',{recursive:true,force:true})"
