# Contributing

Thank you for considering an improvement to this workshop kit. It is built to be
**adapted and reused** — that is the point of the licence. Contributions that make
it clearer, more accurate or easier to run are very welcome.

## Ways to contribute

- **Fix or sharpen the materials** — typos, clarity, a better prompt, a stronger
  worked example.
- **Improve the build** — the theme, the scripts, the CI.
- **Report a problem** — open an issue describing it.
- **Adapt it for your own context** — fork it; you do not need permission, only
  attribution (see the licence).

## Ground rules for the materials

To keep the kit coherent, please preserve these conventions:

- **British English throughout.** No Oxford comma unless it is strictly needed to
  prevent ambiguity.
- **Formal, balanced, evidence-oriented tone.** The stance is *discernment, not
  enthusiasm*. Avoid marketing register.
- **Keep the disclaimer** in every standalone document and in the deck, in the
  agreed wording.
- **Facilitator-specific values are set to the facilitator's own.** This build names
  the facilitator (Pablo Bernabeu), the affiliation (Postdoctoral Researcher,
  Department of Education, and AI Ambassador, University of Oxford; Fellow of the
  Software Sustainability Institute) and the host (University of Westminster). If you
  adapt the kit, swap these, the logo and the disclaimer for your own, and fill the
  remaining placeholders — `[EMAIL]`, `[DATE]`, `[VENUE]`, `[TIME]`,
  `[REPOSITORY URL]` (and optional `[POLL URL]`, `[FEEDBACK URL]`).
- **No fabricated citations.** Verify any reference against a primary source and
  include a working link, or leave a clearly-labelled placeholder describing the
  source.
- **Protect the timing.** The workshop is **two 30-minute parts split by lunch**
  (60 minutes of contact); any change must keep each part reconciling and the
  timings consistent everywhere (slides, guide, tracks, rubric, run sheet).

## Building the slides

```bash
npm install      # see the registry note in the README if this errors
npm run build    # → dist/slides.html and dist/slides.pdf
npm run watch    # live preview while editing
```

Please rebuild and skim the deck before submitting changes that touch `slides.md`
or the theme. The CI workflow also builds the deck on every push.

## The submissions archive

`submissions/` is an **archive of participants' work**, curated by the facilitator
after the session (see [`submissions/README.md`](submissions/README.md)). Please do
not open pull requests adding to it directly — and never add anything containing
personal data.

## Licence of contributions

By contributing you agree your contribution is licensed under the same terms as the
relevant part of the repository: **CC BY 4.0** for materials, **MIT** for build
tooling (see `LICENSE` and `LICENSE-CODE`).

## Code of conduct

Participation is governed by our [Code of Conduct](CODE_OF_CONDUCT.md).

---

*A personal selection, made in the facilitator's own capacity. It is not the position of the University of Oxford (the facilitator's employer) or of the host, and it is not legal advice.*
