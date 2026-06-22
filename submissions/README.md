# Submissions — the open archive

This folder is the **reproducible archive** of participants' group work. Nothing
here is produced with Git on the day; the facilitator curates it afterwards from the
**approved submissions in the groupwork app** (HackMD notes are the fallback).

## How collection works

1. During the session each group fills its shared note in the **workshop app**
   (genai-rt.web.app), structured by the [rubric template](../evaluation_rubric_template.md).
   No participant needs a GitHub account. (A group that cannot use the app falls back to
   **HackMD** and shares the link with the facilitator — optionally via the
   [issue template](../.github/ISSUE_TEMPLATE/group-submission.md).)
2. The facilitator **approves** each group from the private dashboard. Approved work is the
   curated, world-readable record.
3. After the session the facilitator **exports** the approved submissions and commits them here.

## The archive workflow (facilitator, after the session)

1. On the **facilitator dashboard**, click **Export approved (Markdown)**. It downloads a
   dated file (`YYYY-MM-DD_genai-rt-submissions.md`) holding every approved group's note.
2. **Check it before committing.** Remove anything that should not be public — personal
   data, anything a group pasted in error, real identifiers. When in doubt, redact. This
   archive is public.
3. **Commit** it as a dated cohort file, or split it into one file per group using the
   naming convention below — a clear message, e.g. `Archive workshop submissions — 24 June 2026`.
4. **HackMD-fallback groups:** open the note, **Export to Markdown** (HackMD's **···** menu →
   **Download → Markdown**, or append `/download` to a published note's URL), check, and add
   it alongside the rest.

A copy of the empty per-group shape is in [`_TEMPLATE.md`](_TEMPLATE.md).

### Or automate the PR

`npm run archive:pr` (i.e. `node scripts/archive-pr.mjs`) reads the approved, **consented**
submissions straight from the live project and opens a pull request adding the dated archive
file — using your own `gh` auth, so no write-token ever lives in the app. Add `--dry-run` to
write the file and preview it without committing or opening a PR. Set `GENAI_RT_PROJECT` and
`GENAI_RT_API_KEY` first (the Firebase project id and web API key — not secrets; see
`firebase-app/public/firebase-config.js` or the console). Only groups that ticked
**"share publicly"** are included.

## Naming convention (sortable)

```
YYYY-MM-DD_groupNN_track-X_short-slug.md
```

- `YYYY-MM-DD` — the workshop date, so cohorts sort chronologically.
- `groupNN` — zero-padded group number (`group01` … `group10`), so groups sort in
  order.
- `track-X` — the track letter, `A`–`D`.
- `short-slug` — two or three words on the problem, lower-case and hyphenated.

**Examples**

```
2026-06-10_group01_track-A_survey-method-critique.md
2026-06-10_group03_track-C_reading-time-explainer.md
2026-06-10_group07_track-D_lay-summary-fidelity.md
```

## A note on what is preserved

The point of the archive is the **reasoning**, not a leaderboard: the tracks chosen,
the rubric self-assessments, the caught errors and the human-in-the-loop safeguards.
Read across a cohort and you have a candid map of where these tools helped real
researchers and where a human had to stay in charge.

---

*Disclaimer: a personal selection in the facilitator's own capacity; not the position of the University of Oxford (the employer) or the host; not legal advice.*
