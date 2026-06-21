# Submissions — the open archive

This folder is the **reproducible archive** of participants' group work. Nothing
here is produced with Git on the day; the facilitator curates it afterwards from the
groups' HackMD notes.

## How collection works

1. During the session each group keeps a shared **HackMD** note, structured by the
   [rubric template](../evaluation_rubric_template.md).
2. During Part 2 (by **13:45**) each group shares its note link with the **facilitator**,
   who records the links in the **single pinned submission issue** (created from the
   [issue template](../.github/ISSUE_TEMPLATE/group-submission.md)). No participant needs a
   GitHub account.
3. After the session the facilitator exports each note and commits it here.

## The archive workflow (facilitator, after the session)

For each linked note:

1. **Open the HackMD note** from its link in the issue.
2. **Export to Markdown.** In HackMD use the **···** menu → **Download → Markdown**,
   or append `/download` to a published note's URL. You now have a `.md` file.
3. **Check it before committing.** Remove anything that should not be public —
   personal data, anything a group pasted in error, real identifiers. When in doubt,
   redact. This archive is public.
4. **Rename** it to the convention below and place it in this folder.
5. **Commit** in one batch with a clear message, e.g.
   `Archive workshop submissions — 24 June 2026`.

A copy of the empty shape is in [`_TEMPLATE.md`](_TEMPLATE.md).

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
