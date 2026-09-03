# Worked examples: one per track

A worked example is the fallback, for when neither your group's seed nor a member's
real problem is to hand. Use your group's seed, or a
real, non-confidential problem a member brings, and turn to the example below only if
neither is to hand. It is also what you use when the Wi-Fi fails and you switch to
critiquing on paper.

The material below is fully synthetic and safe to paste, with no real people, data or
unpublished work, so a group with nothing to hand can start at once. If you are using
it, still spend a minute on the data decision aid: say what you would have had to strip
out had this been your own material, and record that under Data Security & Ethics.
Each example is sized for the short build window and leads naturally to a caught
error.

---

## Track A · Methodological Blind-Spot Detector

#### Scenario

You are about to submit the study below. Use an AI tool as a critical
reviewer, then verify which of its objections are real, which are generic and which
are wrong.

> *Synthetic methods snippet (safe to paste):*
> 'We ran a cross-sectional online survey of 200 marketing managers recruited through
> a LinkedIn post. Each manager completed a 12-item self-report scale of "authentic
> leadership" and, in the same questionnaire, rated their own team's "innovativeness"
> on a 5-item scale. Authentic leadership correlated positively with team
> innovativeness (r = .46, p < .001). We conclude that authentic leadership causes
> higher team innovation and recommend leadership training to raise innovation.'

#### First move

Ask it openly what is wrong with the design, without naming the lenses, because a
prompt that lists the failure modes also hides them. Classify each point it raises as
real, generic or wrong. Only then run the second pass across explicit lenses (sampling
and recruitment, common-method bias, construct validity, causal inference and
generalisability), and note what the guardrails added.

#### What to watch for

A strong tool should flag the causal claim from cross-sectional
data, common-method or single-source bias (the same person rates both variables),
self-selection via LinkedIn and self-report of one's own team. Note whether it also
pads the list with vague, always-true objections, and whether it ever invents a
statistic or a citation. Those are your museum pieces.

---

## Track B · Accessible Executive-Function Layer

#### Scenario

Turn a messy set of meeting notes into a clean, owned action list, then
check that the tool did not quietly invent or misattribute anything.

> *Synthetic meeting notes (safe to paste; roles only, no real people):*
> 'Centre meeting. Talked about the seminar series. Someone should sort speakers for
> the autumn, maybe the deputy director? Budget underspend, need to use it before July
> or we lose it. The new PhD reps raised workload worries. Website is out of date
> (old staff list). Agreed to revisit the mentoring scheme but no one said who. Ethics
> turnaround is too slow. Chase the committee. Next meeting in three weeks, same room
> hopefully.'

#### First move

Ask for a structured action list with owner, deadline and priority, plus a
separate 'unclear or needs an owner' list. Build it as a reusable template, and not as
a one-off.

#### What to watch for

Does the tool invent owners or dates that the notes never stated
('Deputy Director, by 30 June')? Does it silently drop the items with no owner instead
of flagging them? Does it confidently over-formalise a vague discussion? The safeguard
you design ('every action must trace to a line in the notes; no invented owners') is
the deliverable.

---

## Track C · Rapid Prototyping for Knowledge Translation *(technical stretch)*

#### Scenario

Build a tiny interactive that communicates a finding, and verify that it is
actually correct before you would ever show it to anyone.

> *Synthetic finding and data (safe to paste):*
> 'In a (made-up) study, average reading time for a one-page brief fell as font size
> rose, then rose again when the font got too large. Synthetic data, mean seconds:
> 10 pt → 95 s; 12 pt → 78 s; 14 pt → 70 s; 16 pt → 72 s; 18 pt → 81 s.'

#### First move

Ask a tool with a preview (for example, Claude artifacts or Gemini's
Canvas) to build a small, self-contained HTML page with a labelled bar or line chart
of these values, plus a one-sentence plain-language takeaway. Keep a verification
log.

#### What to watch for

Do the plotted numbers match the data exactly? Is the takeaway
honest about the U-shape (fastest reading around 14 pt), or does it over-simplify to
'bigger is better'? Check colour contrast and that the axes are labelled. Then add a sixth point of your own, 20 pt, and
see whether the axis, the scale and the takeaway update correctly or whether the tool
hard-coded them. The fact that it rendered does not mean that it is correct, so log
every gap.

---

## Track D · Public Engagement Translator

#### Scenario

Translate a hedged, cautious finding for three audiences, then audit each
version for accuracy drift.

> *Synthetic abstract (safe to paste):*
> 'In a small, preliminary, correlational study of 60 undergraduates, students who
> reported using a structured note-taking app tended to report slightly higher exam
> confidence (not exam marks). The effect was modest, the sample was not
> representative, and no causal claim can be made. Replication is needed.'

#### First move

Produce three versions (an interested public, a policy reader and
secondary-school pupils), then line each up against the source and mark every
over-claim, dropped caveat or false certainty.

#### What to watch for

Watch the tool quietly upgrade 'tended to report slightly higher
confidence' into 'boosts exam results', drop 'small, preliminary, correlational' and
add a confident headline the evidence cannot bear. Your fidelity checklist ('every
claim traceable to the source; all caveats survive; no causal language') is the
artefact.

---

*Disclaimer: these materials and the tools they reference are the facilitator's own
choices, made in a personal capacity, and do not represent the views or official
position of the University of Oxford, the facilitator's employer, or of the host, the
University of Westminster. The University of Oxford accepts no liability for the
selection, use or outcomes of any third-party tool. Participants remain solely
responsible for compliance with their own institutional policy, the UK GDPR and
research ethics. This wording is a template and is not legal advice.*
