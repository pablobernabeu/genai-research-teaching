# Submissions: the open archive

This folder is the reproducible archive of participants' group work. Nothing here is
produced with Git on the day. The facilitator curates it afterwards from the approved,
consented submissions in the workshop app, with HackMD or paper notes as the fallback.

> **Were you at the session and looking for your group's work?** The consented notes are
> the files in this folder. To read everything your cohort had approved, including the
> groups that did not tick the sharing box, go to
> [genai-rt.web.app/dashboard.html](https://genai-rt.web.app/dashboard.html) and enter
> the session passcode your facilitator read out on the day. If you no longer have the
> passcode, or have any other query, write to
> [pablo.bernabeu@education.ox.ac.uk](mailto:pablo.bernabeu@education.ox.ac.uk).

## How collection works

1. During the session, each group captures its work in the workshop app
   (genai-rt.web.app): the problem, the artefact, the errors caught, the
   automation–steering map, the oversight model, the key insight and a field
   reflection. No participant needs a GitHub account. A group that cannot use the app
   writes the same headings from the [rubric template](../evaluation_rubric_template.md)
   in HackMD or on paper and shares them with the facilitator, who may record HackMD links in the
   pinned [fallback issue](../.github/ISSUE_TEMPLATE/group-submission.md).
2. The facilitator approves each group from the private dashboard. Approved work
   appears on the session's passcode-gated dashboard, which is where participants read
   their own cohort's work, during the session and afterwards, and it becomes
   world-readable only once archived here. The passcode therefore has to stay set for
   participants to come back to that board, since clearing it on the facilitator page
   closes the dashboard to everyone.
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
   answered yes to the 'Archive this note publicly?' line in the template.

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

Examples, which are illustrative and belong to no archived cohort:

```
2026-10-14_group01_track-A_survey-method-critique.md
2026-10-14_group03_track-C_reading-time-explainer.md
2026-10-14_group07_track-D_lay-summary-fidelity.md
```

## Archived cohorts

### 9 September 2026

Four groups, all approved and all consented to sharing. One file per group, in export
order:

| File | Track | The problem |
|---|---|---|
| [`2026-09-09_group01_track-D_abstract-audience-translation.md`](2026-09-09_group01_track-D_abstract-audience-translation.md) | D · Public Engagement Translator | one research abstract translated for three audiences, across two tools |
| [`2026-09-09_group02_track-B_email-admin-backlog.md`](2026-09-09_group02_track-B_email-admin-backlog.md) | B · Accessible Executive-Function Layer | an email or admin backlog, worked on a student check-in message |
| [`2026-09-09_group03_track-C_reading-time-one-pager.md`](2026-09-09_group03_track-C_reading-time-one-pager.md) | C · Rapid Prototyping | a one-page explainer built on the track's synthetic reading-time data |
| [`2026-09-09_group04_track-A_coursework-assessment-framework.md`](2026-09-09_group04_track-A_coursework-assessment-framework.md) | A · Methodological Blind-Spot Detector | a framework for coursework assessment in UK higher education |

Two things were taken out. Group 04 named the institution it was studying, and that name
is replaced with a bracketed placeholder. The placeholder takes the name out of the note,
and no further than that, because this repository names the workshop host and the date
elsewhere, so a reader may still infer the institution. Separately, no note reproduces
the name its group chose in the app, since two of the four chose their position in the
room, which identifies them to everyone who was there. Each note records on its face what
was taken out of it.

## A note on what is preserved

The point of the archive is the reasoning: the tracks chosen, the caught errors, the
automation–steering map and oversight model, the field reflection and the checkpoints
named. A note also carries the group's three optional scales, which are the field's use
here, trust before checking and human steering needed, with 'Not answered' where a group
skipped one. Rubric scores and the societal reflection are preserved
as well, where a fallback note supplies them. Read across a cohort and you have a frank map of where
these tools helped real researchers and where a human had to stay in charge.

## Queries

Anything about a submission, about the dashboard passcode or about withdrawing work
goes to [pablo.bernabeu@education.ox.ac.uk](mailto:pablo.bernabeu@education.ox.ac.uk).

---

*A personal selection, made in the facilitator's own capacity. It is not the position of the University of Oxford (the facilitator's employer) or of the host, and it is not legal advice.*
