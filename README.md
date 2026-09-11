# Generative AI in research and teaching: a practical, critical workshop

A public, reproducible teaching kit for university researchers and educators. It
supports two 30-minute workshop sessions, split by lunch, on using generative AI
responsibly and effectively, including when to leave it alone.

The repository provides material a facilitator can run and an open archive of group
work collected on the day under [`submissions/`](submissions/). Participants can also
read their own cohort's approved work on the app's passcode-gated session dashboard.

> The stance is critical, evidence-oriented and balanced. The aim is discernment, not
> enthusiasm. One idea runs through everything here: the friction a researcher feels
> when a tool resists their intent is a useful epistemic signal.

---

## Workshop overview

A featured workshop in two parts, split by a networking lunch, for 40 to 50 people
(lecturers, senior lecturers and heads of research centres), using free-tier tools only
and with nothing to install. There are 60 minutes of contact time:

| Part | Time | Focus |
|---|---|---|
| Part 1 · Conceptualising the use of AI in research | 12:00–12:30 | the lens: stance, friction, the tool spectrum, data red lines, ethics, human in the loop |
| Networking lunch | 12:30–13:15 | a break |
| Part 2 · Practical AI for research and teaching | 13:15–13:45 | applied session in the workshop app: build, interrogate, share one insight |

In Part 2, groups of five choose one of four tracks and work on a problem from their
research or teaching, capturing it in the workshop app
([genai-rt.web.app](https://genai-rt.web.app)). The fifteen minutes ask for three
things: run the tool on the problem, catch it out where it was fluent and wrong, and
settle on one line for the room. That line is the most significant limitation the group
found, the checkpoint it would require before use or an observation about how its field
is over- or under-using AI for the task. A
five-dimension rubric sits in the pack for a group that wants to score itself
afterwards, and it is deliberately not part of the fifteen minutes.

The session helps participants place a task on the tool spectrum, hold the data red
lines, read the friction they meet and design oversight they would defend.

---

## Ready-to-print PDFs (no build needed)

Print-ready PDFs are committed under [`handouts/`](handouts/), so you can download and
print them without building anything:

- [`handouts/slides.pdf`](handouts/slides.pdf), the full deck.
- [`handouts/group-pack.pdf`](handouts/group-pack.pdf), the per-table pack (a ready example for each track, then the rubric and fallback note).
- [`handouts/facilitator-pack.pdf`](handouts/facilitator-pack.pdf), the combined facilitator booklet (cue cards, run sheet, morning checklist).
- [`handouts/group-one-pager.pdf`](handouts/group-one-pager.pdf), the group sheet, which holds the whole of Part 2 on one side.
- [`handouts/facilitator-day-of-reset.pdf`](handouts/facilitator-day-of-reset.pdf), the one-page app reset checklist.
- [`handouts/print-bundle.pdf`](handouts/print-bundle.pdf), the whole print job as a single file, for one pass at the printer.
- [`handouts/seed-signs.pdf`](handouts/seed-signs.pdf), the ten track seed signs.
- [`handouts/table-numbers.pdf`](handouts/table-numbers.pdf), the ten table numbers.

These eight files are the record of the paper printed for the session of 9 September
2026, and they may now lag behind the Markdown sources. Do not close that gap with
`npm run build:publish` or `make publish`. Both overwrite the record with whatever the
Markdown currently says, and `npm run check:handouts` would still pass afterwards,
because it checks only that the files are present and readable, never what they say.
Build into `dist/` instead, with `npm run build` for the deck and `npm run build:handouts`,
`npm run build:grouppack` and `npm run build:facilitatorpack` for the paper, and leave
`handouts/` alone until this cohort is archived. `git status` shows any accidental
regeneration, and `git checkout -- handouts/` restores it.

The deck is the exception. `handouts/slides.pdf` is the only one of the eight that the
physical print job never included, because `scripts/printbundle.mjs` assembles the cue
cards, the group pack, the group one-pager, the run sheet, the day-of reset, the seed
signs and the table numbers, and not the slides. So the deck can be brought back into
line with `slides.md` while a cohort is live, with `npm run publish:slides` or
`make publish-slides`. That writes `handouts/slides.pdf` and nothing else. Anyone who
printed the deck for themselves should note that their copy is then a version behind.

### Reprinting after an earlier bundle

If one copy of the earlier, longer print bundle has already been printed, run
`npm run build:reprint`. It writes three separate jobs to
[`handouts/reprint-jobs/`](handouts/reprint-jobs/), with the copy count and print side in
each filename. Keep the earlier cue cards, run sheet, morning checklist, reset sheet,
seed signs and table numbers. The one-page facilitator update tells you how to use them
with the revised 15-minute activity. `build:reprint` is the only producer of that
folder, so `build:publish` never refreshes it.

Those three jobs are part of the committed print record too. `build:reprint` deletes and
rewrites all three from the current Markdown, so do not re-run it before this cohort is
archived. To rebuild a copy for checking, write it elsewhere:
`node scripts/reprint-jobs.mjs --out dist/handouts/reprint-jobs --tables 10`. Note also
that the printed facilitator update sheet predates two day-of corrections, so read the
12:23 and 13:18 rows from
[`docs/reprint_with_existing_bundle.md`](docs/reprint_with_existing_bundle.md) rather
than from the paper.

---

## Repository map

```
.
├── README.md                       ← you are here
├── workshop_plan.md                ← facilitator guide: framing, objectives, timings, prompts, contingencies
├── slides.md                       ← Marp deck (Part 1 conceptual · lunch · Part 2 applied)
├── project_tracks.md               ← the four tracks, with tooling, tasks, artefacts and data notes
├── evaluation_rubric_template.md   ← the rubric and the fallback note, for afterwards and for a group that cannot use the app
│
├── firebase-app/                   ← the Part 2 workshop app: Firestore + Hosting, security rules, three pages
│   └── README.md                   ← app architecture, data model, security model and setup
├── handouts/                       ← the committed print record: eight ready-to-print PDFs (slides, the two packs, the two one-pagers, the room signs and the assembled bundle), plus reprint-jobs/
│
├── themes/
│   └── workshop.css                ← custom Marp theme (extends `gaia`; logo and the title-slide disclaimer footer)
├── assets/
│   └── logo.svg                    ← University of Oxford crest (source of the data URI embedded in the theme)
│
├── docs/                           ← the rest of the facilitator kit
│   ├── pre_workshop_email.md       ← briefing email to send in advance
│   ├── organiser_preview_email.md  ← covering note for sharing draft materials with the organisers
│   ├── preview_tracks_and_rubric.md ← one-page overview of the tracks and the rubric for organisers
│   ├── pre_workshop_poll.md        ← short warm-up poll, with no direct identifiers
│   ├── facilitator_run_sheet.md    ← minute-by-minute run sheet for the day
│   ├── morning_checklist.md        ← what to do before the room fills
│   ├── facilitator_day_of_reset.md ← one-page app reset checklist (passcode, timer, clean-up, export)
│   ├── group_one_pager.md          ← the group sheet: the whole of Part 2 on one side (two per table)
│   ├── cue_cards.md                ← print-ready facilitator cue cards
│   ├── icebreaker.md               ← a senior-appropriate opener
│   ├── worked_examples.md          ← a ready example for each track (the group reference pack)
│   ├── data_decision_aid.md        ← the fuller 'can I paste this?' reference behind the group sheet
│   ├── museum_of_caught_errors.md  ← the device for collecting caught errors
│   ├── reprint_with_existing_bundle.md ← the one-page facilitator update behind `npm run build:reprint`
│   ├── bibliography.md             ← the reading list the closing slide sends participants to
│   ├── post_workshop_followup.md   ← follow-up email and responsible-use commitment
│   └── group_pack_cover.md · role_cards.md · starter_prompts.md ← superseded material from the earlier, longer activity, not printed for 9 September 2026
│
├── submissions/                    ← the open archive of group notes
│   ├── README.md                   ← collection, export and naming convention
│   └── _TEMPLATE.md                ← shape of an archived note
│
├── .github/
│   ├── workflows/                  ← build-slides.yml (CI build) · deploy-pages.yml (publish a live preview)
│   └── ISSUE_TEMPLATE/             ← the pinned issue for HackMD fallback links
│
├── package.json · marp.config.mjs · Makefile · scripts/   ← build tooling (md2pdf.mjs, printbundle.mjs, roomsigns.mjs, reprint-jobs.mjs, check-handouts.mjs and archive-pr.mjs)
├── LICENSE · LICENSE-CODE          ← CC BY 4.0 (materials) · MIT (tooling and the app)
├── CONTRIBUTING.md · CODE_OF_CONDUCT.md
└── .gitignore · .gitattributes
```

A facilitator new to the kit should read `workshop_plan.md`, then `project_tracks.md`,
then `evaluation_rubric_template.md`, then `slides.md`, and finally the
[`docs/`](docs/) kit.

---

## Submissions flow (no Git on the day)

Participants never touch Git or GitHub. The flow is deliberately simple.

1. Each group captures its work in the workshop app
   ([genai-rt.web.app](https://genai-rt.web.app)), whose short form covers the
   essentials. No participant needs a GitHub account, and there is nothing to install.
   A group that cannot use the app writes the same headings from the
   [rubric template](evaluation_rubric_template.md) in HackMD or on paper and shares
   them with the facilitator.
2. The facilitator approves each group from the private dashboard. Approved work
   appears on the passcode-gated session dashboard for the room.
3. After the session, the facilitator exports the approved work of the groups that
   consented to sharing and commits it under [`submissions/`](submissions/), using the
   sortable naming convention `YYYY-MM-DD_groupNN_track-X_short-slug.md`.
4. Participants read their own cohort's approved work, consented or not, on the
   dashboard at
   [genai-rt.web.app/dashboard.html](https://genai-rt.web.app/dashboard.html), with the
   passcode they were given on the day. That board stays open only while its passcode
   stays set, so setting a new one for a later session closes it on the earlier cohort.

Full details, including the app, the export step and the fallback issue template, are
in [`submissions/README.md`](submissions/README.md) and
[`firebase-app/README.md`](firebase-app/README.md).

Questions and discussion go to the repository's Discussions tab, so that answers are
shared with everyone, and anything that should not be public goes to
[pablo.bernabeu@education.ox.ac.uk](mailto:pablo.bernabeu@education.ox.ac.uk). The
closing slide and the follow-up email point to both. In a
fork or an adapted copy, turn the feature on under *Settings → Features → Discussions*.

---

## Render the slides

The deck is [`slides.md`](slides.md), built with [Marp](https://marp.app/) and a
custom theme that extends the built-in `gaia` theme. No global install is needed,
because everything runs through `npx` via the npm scripts.

```bash
npm install            # installs marp-cli locally (see the note below)
npm run build          # → dist/slides.html and dist/slides.pdf
npm run build:html     # HTML only
npm run build:pdf      # PDF only (needs a Chromium or Edge browser present)
npm run build:pptx     # PowerPoint
npm run build:docs     # PDFs of project_tracks.md and the rubric → dist/
npm run build:preview  # organiser preview pack → slides + group pack + facilitator pack (needs a Chromium browser)
npm run build:handouts # print-ready handout PDFs → dist/handouts/ (data aid, examples, rubric, cue cards, and so on)
npm run build:signs    # the ten seed-idea signs and the ten table numbers → dist/handouts/
npm run build:bundle   # the whole print job as one PDF → dist/handouts/print-bundle.pdf (builds the PDFs it needs first)
npm run build:reprint  # only the replacement PDFs needed after an older print bundle → handouts/reprint-jobs/
npm run build:grouppack       # the per-table pack → dist/handouts/group-pack.pdf
npm run build:facilitatorpack # one combined facilitator booklet → dist/handouts/facilitator-pack.pdf
npm run publish:slides # refresh ONLY the committed deck → handouts/slides.pdf (safe while a cohort is live)
npm run build:publish  # refresh the committed ready-to-print PDFs in handouts/ (see 'Ready-to-print PDFs' above)
npm run check:handouts # verify the committed print set: eight PDFs and three reprint jobs
npm run watch          # live-reloading preview in the browser
npm run preview        # open the deck in the browser
npm run archive:pr     # open a PR with the approved, consented submissions (see submissions/README.md)
npm run clean          # remove dist/
```

`build:handouts` is a wrapper that runs `build:handouts:core` and then `build:onepagers`.

A `Makefile` mirrors these for Unix users: `make`, `make html`, `make pdf`,
`make pptx`, `make docs`, `make pack`, `make handouts`, `make reprint`, `make grouppack`,
`make facilitatorpack`, `make signs`, `make bundle`, `make publish-slides`,
`make publish`, `make watch`, `make preview`, `make clean` and `make install`. The npm
scripts remain the primary, cross-platform interface, and `archive:pr` and
`check:handouts` are theirs alone.

> When you install, note that marp-cli pulls in `speech-rule-engine` (via MathJax), whose npm
> registry metadata intermittently fails to parse on the default registry. If
> `npm install` errors with 'Bad control character in string literal in JSON',
> install once via a mirror (`npm install --registry=https://registry.npmmirror.com`)
> or retry later. CI installs with the same mirror as a fallback.

Every script that produces a PDF needs a Chromium or Edge browser on the machine:
`build:pdf`, `build:pptx`, `build:docs`, `build:preview`, `build:handouts`,
`build:grouppack`, `build:facilitatorpack`, `build:signs`, `build:bundle`,
`build:reprint` and `build:publish`. Only `build:html`, `watch`, `clean`,
`check:handouts` and `archive:pr` do not. They find the browser through `CHROME_PATH`
when it is not at a standard location. When the handout build runs as root in a
container, pass any extra launch flags through `CHROME_FLAGS` (for example
`--no-sandbox`).

The output in `dist/` is generated and git-ignored, so rebuild it at any time.

---

## Sharing a preview

To show the draft slides and core materials to organisers or colleagues before the
day, pick the option that fits how private the draft should stay.

- Email the PDFs (simplest, private, recommended for a draft). `npm run build:preview`
  produces a tidy attachment pack: the slides PDF (`dist/slides.pdf`) plus the combined
  group pack and facilitator pack (in `dist/handouts/`). For a one-page overview of the
  four tracks and the rubric, render
  [`docs/preview_tracks_and_rubric.md`](docs/preview_tracks_and_rubric.md) with
  `node scripts/md2pdf.mjs docs/preview_tracks_and_rubric.md` (needs a Chromium
  browser). The full working-document PDFs are available via `npm run build:docs`. A
  ready covering note is in
  [`docs/organiser_preview_email.md`](docs/organiser_preview_email.md).
- A private cloud folder (OneDrive or SharePoint), with no setup. Drop `dist/slides.pdf`
  and a copy of the materials in a folder and share a view-only link. This suits a
  controlled draft.
- GitHub Pages, a live, rendered link that is public. Push the repository to GitHub,
  then enable *Settings → Pages → Source: GitHub Actions*. The included
  [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes the rendered deck
  and a landing page at `https://<user>.github.io/<repo>/`. This makes the preview
  public, so use it only when a public draft is acceptable.

---

## Licence

- Workshop materials (all Markdown, the slides, the rubric and other prose): Creative
  Commons Attribution 4.0 International (CC BY 4.0), see [`LICENSE`](LICENSE). Reuse
  and adapt freely with attribution.
- Build tooling and the app (`package.json`, `marp.config.mjs`, `themes/workshop.css`,
  `Makefile`, `scripts/`, `firebase-app/` and the GitHub workflows): MIT, see
  [`LICENSE-CODE`](LICENSE-CODE).

When you adapt the materials, please keep the disclaimer intact and replace the
facilitator-specific details with your own.

---

## Disclaimer

These materials and the tools they reference are the facilitator's own choices, made
in a personal capacity. They do not represent the views or official position of the
University of Oxford, the facilitator's employer, or of the host, the University of
Westminster. The University of Oxford accepts no liability for the selection, use or
outcomes of any third-party tool. Participants remain solely responsible for compliance
with their own institutional policy, the UK GDPR and research ethics.

*This wording is a template and is not legal advice.*
