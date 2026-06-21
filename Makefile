# Convenience targets for Unix users. They mirror the npm scripts in package.json,
# which are the primary, cross-platform interface. On Windows, use `npm run ...`.
#
#   make            build HTML and PDF into dist/
#   make html       HTML only
#   make pdf        PDF only (needs a Chromium/Edge browser)
#   make pptx       PowerPoint
#   make pack       organiser preview pack (slides + group pack + facilitator pack)
#   make handouts   print-ready handout PDFs into dist/handouts/
#   make grouppack       one combined per-table group pack PDF
#   make facilitatorpack one combined facilitator pack PDF
#   make watch      live-reloading preview
#   make clean      remove dist/
#   make install    install marp-cli locally

MARP   := npx marp --config-file ./marp.config.mjs
SLIDES := ./slides.md
OUT    := ./dist

.PHONY: all html pdf pptx docs pack handouts grouppack facilitatorpack watch preview clean install

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

handouts:
	node scripts/md2pdf.mjs --out dist/handouts docs/role_cards.md docs/data_decision_aid.md docs/starter_prompts.md docs/worked_examples.md evaluation_rubric_template.md docs/cue_cards.md docs/museum_of_caught_errors.md docs/morning_checklist.md docs/facilitator_run_sheet.md project_tracks.md

grouppack:
	node scripts/md2pdf.mjs --out dist/handouts --bundle group-pack docs/group_pack_cover.md docs/role_cards.md docs/data_decision_aid.md evaluation_rubric_template.md docs/worked_examples.md docs/starter_prompts.md

facilitatorpack:
	node scripts/md2pdf.mjs --out dist/handouts --bundle facilitator-pack docs/cue_cards.md docs/facilitator_run_sheet.md docs/morning_checklist.md

watch:
	$(MARP) -w -s .

preview:
	$(MARP) -p $(SLIDES)

clean:
	node -e "require('fs').rmSync('dist',{recursive:true,force:true})"
