# Submissions: the open archive

This folder is the reproducible archive of participants' group work. Nothing here is
produced with Git on the day. The facilitator curates it afterwards from the approved,
consented submissions in the workshop app, with HackMD or paper notes as the fallback.

## How collection works

1. During the session, each group captures its work in the workshop app
   (genai-rt.web.app): the problem, the artefact, the errors caught, the
   automation–steering map, the oversight model, the key insight and a field
   reflection. No participant needs a GitHub account. A group that cannot use the app
   writes the fuller [rubric template](../evaluation_rubric_template.md) in HackMD or
   on paper and shares it with the facilitator, who may record HackMD links in the
   pinned [fallback issue](../.github/ISSUE_TEMPLATE/group-submission.md).
2. The facilitator approves each group from the private dashboard. Approved work
   appears on the session's passcode-gated dashboard for the room, and it becomes
   world-readable only once archived here.
3. After the session, the facilitator exports the approved submissions whose groups
   opted in to sharing and commits them here.

## The archive workflow (facilitator, after the session)

1. On the facilitator dashboard, click Export approved (Markdown). It downloads a
   file named `YYYY-MM-DD_genai-rt-submissions.md`, dated with the day you export,
   holding every approved group that consented to public sharing. If no approved group
   has consented, the button does nothing and says so.
2. Check it before committing, and remove anything that should not be public: personal
   data, anything a group pasted in error, real identifiers. When in doubt, redact,
   because this archive is public.
3. Commit it as a dated cohort file, renamed to the workshop date if you exported
   later, or split it into one file per group using the naming convention below. Give
   the commit a clear message such as `Archive workshop submissions, 9 September 2026`.
4. For HackMD-fallback groups, open the note, export it to Markdown (HackMD's ··· menu
   under Download and Markdown, or append `/download` to a published note's URL),
   check it and add it alongside the rest. Archive a fallback note only if the group
   said yes to the 'Share publicly?' line in the template.

The shape of an archived note is in [`_TEMPLATE.md`](_TEMPLATE.md): the app's export
shape first, and the fuller fallback shape after it.

### Or automate the pull request

`npm run archive:pr` (that is, `node scripts/archive-pr.mjs`) reads the approved,
consented submissions straight from the live project and opens a pull request adding
the dated archive file. It uses your own `gh` authentication, so that no write token
ever lives in the app. Run `npm run archive:pr -- --dry-run` to write the file and preview it
without committing or opening a pull request. Set `GENAI_RT_PROJECT` and `GENAI_RT_API_KEY` first (the
Firebase project id and web API key, which are not secrets, and which you will find in
`firebase-app/public/firebase-config.js` or the console). Only groups that ticked the
optional consent box are included.

## Naming convention (sortable)

```
YYYY-MM-DD_groupNN_track-X_short-slug.md
```

- `YYYY-MM-DD` is the workshop date, so that cohorts sort chronologically.
- `groupNN` is the group's zero-padded number in the export (`group01` … `group10`),
  so that groups sort in order. The app has no group numbers of its own, since groups
  name themselves, so number them in export order.
- `track-X` is the track letter, `A` to `D`, or `own` for a group that worked on its
  own problem.
- `short-slug` is two or three words on the problem, lower-case and hyphenated.

Examples:

```
2026-09-09_group01_track-A_survey-method-critique.md
2026-09-09_group03_track-C_reading-time-explainer.md
2026-09-09_group07_track-D_lay-summary-fidelity.md
```

## A note on what is preserved

The point of the archive is the reasoning: the tracks chosen, the caught errors, the
automation–steering map and oversight model, the field reflection and the
human-in-the-loop safeguards. Rubric scores and the societal reflection are preserved
as well, where a fallback note supplies them. Read across a cohort and you have a frank map of where
these tools helped real researchers and where a human had to stay in charge.

---

*A personal selection, made in the facilitator's own capacity. It is not the position of the University of Oxford (the facilitator's employer) or of the host, and it is not legal advice.*
