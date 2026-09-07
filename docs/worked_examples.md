# Worked examples: one per track

A worked example is a fallback. Start with the seed your group formed around or a
member's non-confidential problem. Use the example for your track only when neither is
available. It also gives you something to critique on paper if the Wi-Fi fails.

The material below is synthetic and safe to paste. It contains no identifiable people,
data or unpublished work, so a group can begin at once. Spend a minute on the data
decision aid anyway. Say what you would remove from your own material, then record it
under Data Security & Ethics. Each example is small enough to start in the short build
window and should lead to a useful caught error.

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

A useful answer should flag the causal claim from cross-sectional data, common-method
or single-source bias (the same person rates both variables), self-selection via
LinkedIn and self-report of one's own team. Look for vague, always-true objections and
invented statistics or citations. Record them as caught errors.

---

## Track B · Accessible Executive-Function Layer

#### Scenario

Turn a messy set of meeting notes into a clear action list, then
check that the tool did not quietly invent or misattribute anything.

> *Synthetic meeting notes (safe to paste; roles only, no real people):*
> 'Centre meeting. Talked about the seminar series. Someone should sort speakers for
> the autumn, maybe the deputy director? Budget underspend, need to use it before July
> or we lose it. The new PhD reps raised workload worries. Website is out of date
> (old staff list). Agreed to revisit the mentoring scheme but no one said who. Ethics
> turnaround is too slow. Chase the committee. Next meeting in three weeks, same room
> hopefully.'

#### First move

Ask for a structured action list with owner, deadline and priority. Ask it to place
unclear items, or items without an owner, in a separate list. Turn the resulting prompt
into a template your group could use again.

#### What to watch for

Does the tool invent owners or dates that the notes never stated ('Deputy Director, by
30 June')? Does it silently drop items with no owner? Does it over-formalise a vague
discussion? Use a safeguard such as 'every action must trace to a line in the notes; no
invented owners'.

---

## Track C · Rapid Prototyping for Knowledge Translation *(technical stretch)*

#### Scenario

Build a tiny interactive that communicates a finding, then verify it before sharing it.

> *Synthetic finding and data (safe to paste):*
> 'In a (made-up) study, average reading time for a one-page brief fell as font size
> rose, then rose again when the font got too large. Synthetic data, mean seconds:
> 10 pt → 95 s; 12 pt → 78 s; 14 pt → 70 s; 16 pt → 72 s; 18 pt → 81 s.'

#### First move

Ask a tool with a preview (for example, Claude artifacts or Gemini's
Canvas) to build a small, self-contained HTML page with a labelled bar or line chart
of these values, plus a one-sentence plain-language takeaway. Keep a verification
log as you go.

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

Watch the tool quietly upgrade 'tended to report slightly higher confidence' into
'boosts exam results', drop 'small, preliminary, correlational' or add a headline the
evidence cannot bear. Create a fidelity checklist: every claim is traceable to the
source, all caveats survive and no causal language appears.

---

*Disclaimer: these materials and the tools they reference are the facilitator's own
choices, made in a personal capacity, and do not represent the views or official
position of the University of Oxford, the facilitator's employer, or of the host, the
University of Westminster. The University of Oxford accepts no liability for the
selection, use or outcomes of any third-party tool. Participants remain solely
responsible for compliance with their own institutional policy, the UK GDPR and
research ethics. This wording is a template and is not legal advice.*
