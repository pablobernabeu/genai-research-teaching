<!--
  The shape of an archived submission. This file is an empty template and carries no
  participant data. Two shapes follow: first the app's export (the default path), then
  the fuller note a HackMD or paper fallback group writes from the rubric template.
  Rename a real export to: YYYY-MM-DD_groupNN_track-X_short-slug.md
-->

# Group … · Track … · 9 September 2026

| | |
|---|---|
| **Group** | groupNN, its number in the export. Say here whether the name the group chose in the app is reproduced. Groups are told to choose a non-identifying name, but some choose their position in the room, which identifies them to everyone who was there, so check each one and leave it out if it does. |
| **Track** | A / B / C / D / own, with the track name |
| **Date** | YYYY-MM-DD (the workshop date) |
| **Source** | Where the content actually came from: the dashboard's Markdown export, the app's own record read as `scripts/archive-pr.mjs` does, or a HackMD or paper note. Only the second carries the three optional scales. |
| **Consent** | The wording the group agreed to, quoted whole to a sentence boundary rather than trimmed: the app's optional box ('We are happy for our group's non-identifying submission to be shared in the public workshop archive at github.com/pablobernabeu/genai-research-teaching.', which goes on to say that ticking is optional, that an unticked submission stays out of the public archive and that approved work still appears on the session's passcode-gated dashboard) or 'Archive this note publicly?' in the fallback note |
| **Redactions** | What was taken out and replaced with a bracketed placeholder, or 'None'. Say what a placeholder does not achieve as well as what it does, because this repository names the host and the date, and a reader may still infer an institution from them. |
| **Archived by** | Pablo Bernabeu, checked for personal data before committing |

---

## Shape 1: the app export

The export opens with `# Approved submissions — YYYY-MM-DD` and a count, then gives one
block per approved, consented group under the headings below, which the facilitator
keeps as they are. A field a group left empty is exported as a dash.

### N. Group name · Track X

*Scenario: …*

**The problem.** …

**The artefact.** …

**Errors caught.** …

**Automation–steering map.** …

**Oversight model.** Interwoven (checking throughout), or Staged (check at set points).

**Why that model.** …

**Key insight.** …

**Field reflection.** …

The export stops there. A group also answers three optional scales in the app, which the
export leaves behind, so a per-group note carries them under their own heading, with
'Not answered' where a group skipped one.

## Three quick reflections

| Scale | Answer |
|---|---|
| Field's use here | Far too little / A little too little / About right / A little too much / Far too much (N of 5) |
| Trust before checking | Not at all / Slightly / Moderately / Largely / Completely (N of 5) |
| Human steering needed | Minimal / A little / A fair amount / A lot / Constant (N of 5) |

A note closes with the kit's disclaimer, in the agreed wording, as every standalone
document does. The app's export does not emit one, so the facilitator adds it on
archiving.

---

## Shape 2: the fallback note (from the rubric template)

A group that could not use the app writes the same headings on HackMD or on paper, so a
fallback note archives in the same shape as an export. Anything under 'optional' is
often blank, which is expected.

**The problem:** …

**The artefact, and the tool that made it:** …

**Errors caught (what happened, how we caught it, where a human must stay):** …

**Our line for the lightning round:** …

**Automation–steering map (optional):** the phases, what the tool ran, where the group steered.

**Oversight interwoven or staged, and why (optional):** …

**Field reflection (optional):** whether the field is over- or under-using AI for this kind of task, and what the group would change.

**Archive this note publicly?** yes / no

**Rubric scores (optional, 1 Nascent · 3 Developing · 5 Robust):** project definition,
technology stack, data security and ethics, financial and scalability, human in the
loop, each with a sentence saying why.

---

*A personal selection, made in the facilitator's own capacity. It is not the position of the University of Oxford (the facilitator's employer) or of the host, and it is not legal advice.*
