# Generative AI in research and teaching — a practical, critical workshop

A complete, public, reproducible teaching kit for a **two-part featured workshop**
(30 + 30 minutes, split by lunch) that helps university researchers and educators
use generative AI **responsibly and effectively** — and, just as importantly,
decide **when not to**.

The repository is two things at once:

- a **teaching kit** a facilitator can pick up and run, and
- an **open archive** of participants' group work, collected on the day and
  committed afterwards under [`submissions/`](submissions/).

> **Stance.** Critical, evidence-oriented and balanced. The aim is *discernment,
> not enthusiasm*. A thread runs through everything here: **the friction a
> researcher feels when a tool resists their intent is a useful epistemic signal,
> not a nuisance.**

---

## The workshop at a glance

A **featured workshop in two parts**, split by a networking lunch — 40–50 people
(lecturers, senior lecturers and heads of research centres), free-tier tools only,
nothing to install. Sixty minutes of contact time:

| Part | Time | Focus |
|---|---|---|
| **Part 1 · Conceptualising the use of AI in research** | 12:00–12:30 | the lens: stance, friction, the tool spectrum, data red lines, ethics, human-in-the-loop |
| *Networking lunch* | *12:30–13:15* | *a break* |
| **Part 2 · Practical AI for research & teaching** | 13:15–13:45 | applied session in the groupwork app: build, interrogate, share one insight |

In Part 2, **groups of five** choose one of **four tracks** and work a **real problem** from
their research or teaching, capturing it in the **groupwork app** ([genai-rt.web.app](https://genai-rt.web.app)).
Each group assesses its work against a **five-dimension rubric** and a **museum of caught
errors**, then gives a **45-second** spoken insight: the most significant limitation it found,
or the most important human-in-the-loop safeguard it built in.

**Five aims:** enjoy the session · reflect critically · learn · collaborate ·
create.

---

## Repository map

```
.
├── README.md                       ← you are here
├── workshop_plan.md                ← facilitator guide: framing, objectives, timings, prompts, contingencies
├── slides.md                       ← Marp deck (Part 1 conceptual · lunch · Part 2 applied)
├── project_tracks.md               ← the four tracks, with tooling, tasks, artefacts and data notes
├── evaluation_rubric_template.md   ← the copy-paste rubric template groups fill in the app (HackMD on the fallback)
│
├── firebase-app/                   ← the Part 2 groupwork app (default capture surface): Firestore + Hosting, security rules, three pages
│   └── README.md                   ← app architecture, data model, security model and setup
├── handouts/                       ← ready-to-print PDFs (slides, the two packs, the two one-pagers); refresh with `npm run build:publish`
│
├── themes/
│   └── workshop.css                ← custom Marp theme (extends `gaia`; logo + disclaimer footer)
├── assets/
│   └── logo.svg                    ← placeholder logo (swap for your own)
│
├── docs/                           ← the rest of the facilitator kit
│   ├── pre_workshop_email.md       ← briefing email to send in advance
│   ├── organiser_preview_email.md  ← share draft materials with the organisers
│   ├── pre_workshop_poll.md        ← short, anonymous warm-up poll
│   ├── facilitator_run_sheet.md    ← minute-by-minute run sheet for the day
│   ├── morning_checklist.md        ← what to do before the room fills
│   ├── facilitator_day_of_reset.md ← one-page app reset checklist (passcode, timer, cleanup, export)
│   ├── group_one_pager.md          ← one-page group quick-start (print 1–2 per table)
│   ├── group_pack_cover.md         ← cover/orientation sheet for the printed group-pack booklet
│   ├── role_cards.md               ← optional prompt cards for the five group roles
│   ├── cue_cards.md                ← print-ready facilitator cue cards
│   ├── icebreaker.md               ← a senior-appropriate opener
│   ├── starter_prompts.md          ← a starter-prompt library, per track
│   ├── worked_examples.md          ← one worked example per track (offline fallback)
│   ├── data_decision_aid.md        ← one-page "can I paste this?" decision aid
│   ├── museum_of_caught_errors.md  ← the device for collecting caught errors
│   └── post_workshop_followup.md   ← follow-up email + responsible-use commitment
│
├── submissions/                    ← the open archive of group notes
│   ├── README.md                   ← collection, export and naming convention
│   └── _TEMPLATE.md                ← shape of an archived note
│
├── .github/
│   ├── workflows/                  ← build-slides.yml (CI build) · deploy-pages.yml (publish a live preview)
│   └── ISSUE_TEMPLATE/             ← the pinned submission issue template
│
├── package.json · marp.config.mjs · Makefile · scripts/   ← build tooling (incl. md2pdf.mjs)
├── LICENSE · LICENSE-CODE          ← CC BY 4.0 (materials) · MIT (tooling)
├── CONTRIBUTING.md · CODE_OF_CONDUCT.md
└── .gitignore · .gitattributes
```

**Suggested reading order for a facilitator:** `workshop_plan.md` →
`project_tracks.md` → `evaluation_rubric_template.md` → `slides.md` → the
[`docs/`](docs/) kit.

---

## Render the slides

The deck is [`slides.md`](slides.md), built with [Marp](https://marp.app/) and a
custom theme that extends the built-in `gaia` theme. **No global install needed** —
everything runs through `npx` via the npm scripts.

```bash
npm install            # installs marp-cli locally (see the note below)
npm run build          # → dist/slides.html and dist/slides.pdf
npm run build:html     # HTML only
npm run build:pdf      # PDF only (needs a Chromium/Edge browser present)
npm run build:pptx     # PowerPoint
npm run build:preview  # organiser preview pack → slides + group pack + facilitator pack (needs a Chromium browser)
npm run build:handouts # print-ready handout PDFs → dist/handouts/ (role cards, data aid, rubric, cue cards, …)
npm run build:grouppack       # one combined per-table booklet → dist/handouts/group-pack.pdf
npm run build:facilitatorpack # one combined facilitator booklet → dist/handouts/facilitator-pack.pdf
npm run build:publish  # refresh the committed ready-to-print PDFs in handouts/
npm run watch          # live-reloading preview in the browser
npm run clean          # remove dist/
```

A `Makefile` mirrors these for Unix users: `make`, `make html`, `make pdf`,
`make watch`, `make clean`.

> **Install note.** marp-cli pulls in `speech-rule-engine` (via MathJax), whose npm
> registry metadata intermittently fails to parse on the default registry. If
> `npm install` errors with *"Bad control character in string literal in JSON"*,
> install once via a mirror — `npm install --registry=https://registry.npmmirror.com`
> — or retry later. CI sidesteps this by using the official Marp CLI action rather
> than an npm install.

The output in `dist/` is generated and git-ignored; rebuild it any time.

### Ready-to-use PDFs (no build needed)

Print-ready PDFs are committed under [`handouts/`](handouts/), so you can download and print
them without building anything:

- [`handouts/slides.pdf`](handouts/slides.pdf) — the full deck.
- [`handouts/group-pack.pdf`](handouts/group-pack.pdf) — the combined per-table booklet (cover, role cards, data aid, rubric, worked examples, starter prompts).
- [`handouts/facilitator-pack.pdf`](handouts/facilitator-pack.pdf) — the combined facilitator booklet (cue cards, run sheet, morning checklist).
- [`handouts/group-one-pager.pdf`](handouts/group-one-pager.pdf) — the one-page group quick-start.
- [`handouts/facilitator-day-of-reset.pdf`](handouts/facilitator-day-of-reset.pdf) — the one-page app reset checklist.

They are generated from the Markdown sources and may lag them, so run `npm run build:publish` to refresh.

## Sharing a preview

To show the draft slides and core materials to organisers or colleagues before the
day, pick the option that fits how private the draft should stay:

- **Email the PDFs — simplest, private (recommended for a draft).** `npm run build:preview`
  produces a tidy attachment pack: the slides PDF (`dist/slides.pdf`) plus the combined group
  pack and facilitator pack (in `dist/handouts/`). For a friendly one-page overview of the
  four tracks and the rubric, render [`docs/preview_tracks_and_rubric.md`](docs/preview_tracks_and_rubric.md)
  with `node scripts/md2pdf.mjs docs/preview_tracks_and_rubric.md` (needs a Chromium browser);
  the full working-doc PDFs are available via `npm run build:docs`. A ready covering note is in
  [`docs/organiser_preview_email.md`](docs/organiser_preview_email.md).
- **OneDrive / SharePoint link — private, no setup.** This repo already lives in
  OneDrive: drop `dist/slides.pdf` (and a copy of the materials) in a folder and
  share a view-only link. Good for a controlled draft.
- **GitHub Pages — a live, rendered link, but public.** Push the repo to GitHub, then
  enable *Settings → Pages → Source: GitHub Actions*. The included
  [`deploy-pages.yml`](.github/workflows/deploy-pages.yml) publishes the rendered deck
  and a landing page at `https://<user>.github.io/<repo>/`. This makes the preview
  public, so use it only when a public draft is acceptable.

---

## Submissions flow (no Git on the day)

Participants never touch Git or GitHub. The flow is deliberately simple:

1. Each group fills its shared note in the **groupwork app** ([genai-rt.web.app](https://genai-rt.web.app)),
   following the structure of the [rubric template](evaluation_rubric_template.md). No
   participant needs a GitHub account, and there is nothing to install. A group that cannot
   use the app falls back to **HackMD** and shares its note link with the facilitator.
2. The **facilitator approves** each group from the private dashboard. Approved work becomes
   the curated, world-readable record on the public dashboard.
3. **After the session**, the facilitator exports the approved, consented work and commits it
   under [`submissions/`](submissions/) using the sortable naming convention
   `YYYY-MM-DD_groupNN_track-X_short-slug.md`.

Full details, including the app, the export step and the fallback issue template, are in
[`submissions/README.md`](submissions/README.md) and [`firebase-app/README.md`](firebase-app/README.md).

**Questions and discussion** are directed to the repository's **Discussions** tab —
the closing slide and the follow-up email point there, so answers are shared with
everyone rather than sent privately. Enable it once on GitHub under
*Settings → Features → Discussions*.

---

## Licence

- **Workshop materials** (all Markdown, the slides, the rubric and other prose):
  **Creative Commons Attribution 4.0 International (CC BY 4.0)** — see
  [`LICENSE`](LICENSE). Reuse and adapt freely with attribution.
- **Build tooling** (`package.json`, `marp.config.mjs`, `themes/workshop.css`,
  `Makefile`, the GitHub workflow): **MIT** — see [`LICENSE-CODE`](LICENSE-CODE).

When you adapt the materials, please keep the disclaimer intact and replace the
bracketed placeholders with your own details.

---

## Disclaimer

These materials and the tools they reference are the facilitator's own choices,
made in a personal capacity. They do not represent the views or official position of the University of Oxford — the facilitator's employer — or of the host, the University of Westminster. The University of Oxford accepts no liability for the selection, use or outcomes of any third-party tool. Participants
remain solely responsible for compliance with their own institutional policy, the UK GDPR
and research ethics.

*This wording is a template and is not legal advice.*
