# Contributing

Thank you for considering an improvement to this workshop kit. It is built to be
adapted and reused, which is the point of the licence, and contributions that make it
clearer, more accurate or easier to run are welcome.

## Ways to contribute

- Fix or sharpen the materials: typos, clarity, a better prompt, a stronger worked
  example.
- Improve the build: the theme, the scripts, the CI, the app.
- Report a problem by opening an issue that describes it.
- Adapt it for your own context by forking it. You do not need permission, only
  attribution (see the licence).

## Ground rules for the materials

To keep the kit coherent, please preserve these conventions.

- British English throughout, in an academic register that is neither familiar nor
  distant. Use single quotation marks, and no serial comma unless it prevents
  ambiguity. Avoid em dashes, decorative bold, semicolons where a comma would do and
  lists that carry an argument a paragraph could carry.
- A formal, balanced, evidence-oriented tone. The stance is discernment, not
  enthusiasm, so avoid the marketing register.
- Keep the disclaimer in every standalone document and in the deck, in the agreed
  wording.
- Facilitator-specific values are set to the facilitator's own. This build names the
  facilitator (Pablo Bernabeu), the affiliation (Postdoctoral Researcher, Department of
  Education, and AI Ambassador, University of Oxford; Fellow of the Software
  Sustainability Institute), the host (University of Westminster) and the date
  (9 September 2026). If you adapt the kit, swap these, the logo, the app details and the
  disclaimer for your own, and fill the placeholders that remain: `[VENUE]` and
  `[POLL URL]` in the pre-workshop email, and `[FEEDBACK URL]` in the follow-up email.
- No fabricated citations. Verify any reference against a primary source and include
  a working link, or leave a clearly labelled placeholder describing the source. The
  further-reading list in the facilitator guide records when it was last checked.
- Protect the timing. The workshop is two 30-minute parts split by lunch (60 minutes
  of contact), and any change must keep each part's minutes adding up and the timings
  consistent everywhere (slides, guide, tracks, rubric, run sheet, cue cards).
- Keep the documents and the app in step. If you change what the app captures or how
  a control is named, update the one-pager, the day-of reset, the rubric template and
  the submissions README in the same change.

## Building the slides

```bash
npm install      # see the registry note in the README if this errors
npm run build    # → dist/slides.html and dist/slides.pdf
npm run watch    # live preview while editing
```

Please rebuild and skim the deck before submitting changes that touch `slides.md` or
the theme, and run `npm run build:publish` so that the committed PDFs under
`handouts/` match the Markdown. The CI workflow builds the deck on every pull request,
and on pushes to `main` that touch the deck, the theme, the assets or the Marp
configuration.

## The submissions archive

`submissions/` is an archive of participants' work, curated by the facilitator after
the session (see [`submissions/README.md`](submissions/README.md)). Please do not
open pull requests adding to it directly, and never add anything containing personal
data.

## Licence of contributions

By contributing, you agree that your contribution is licensed under the same terms as
the relevant part of the repository: CC BY 4.0 for materials, and MIT for the build
tooling and the app (see `LICENSE` and `LICENSE-CODE`).

## Code of conduct

Participation is governed by the [code of conduct](CODE_OF_CONDUCT.md).

---

*A personal selection, made in the facilitator's own capacity. It is not the position of the University of Oxford (the facilitator's employer) or of the host, and it is not legal advice.*
