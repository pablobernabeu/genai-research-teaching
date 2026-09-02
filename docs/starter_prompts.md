# Starter-prompt library

Starting points, and never scripts. Adapt freely, replace the bracketed parts and
remember the [data decision aid](data_decision_aid.md) before you paste anything.

Each track has two prompts, and the order matters. Run the first pass as it stands,
without the guardrails, because a prompt that forbids a failure mode also hides it, and
the failure is what you are here to catch. Then design the second prompt as the
safeguard your group would actually adopt, and note the difference between them. That
difference is your finding.

## Prompting for friction: five habits

1. Make it disagree with itself. Ask for the strongest case against its own answer.
2. Ask it to sort its own claims. 'Mark each claim as confident, uncertain or a guess,
   and say what would change your mind.' These labels are the model's guess about
   itself and not a measurement, and a confidently wrong claim will be labelled
   confident, so use them only to decide what to verify first, and verify it elsewhere.
3. Demand checkable sources. 'Cite sources I can verify. If you are not sure a source
   exists, say so instead of inventing one.'
4. Ask what it is missing. 'What would an expert say you have overlooked?'
5. Keep the human in the loop. 'List what a human must check before this is used.'

---

## Track A · Methodological Blind-Spot Detector

First pass, unguarded. Naming the flaws for it would tell you only that it can follow
a list, so do not.

> 'Act as a sceptical peer reviewer. Here is a study design: [PASTE ANONYMISED
> DESIGN]. What is wrong with it? For each issue, say how serious it is and why.'

Then classify every objection yourselves as real, generic or wrong, and check any
factual claim outside the tool. Only now add the guardrails, as the protocol you would
give a colleague.

> 'Review it again across these lenses: sampling and recruitment, common-method bias,
> construct validity, causal inference, generalisability and ethics. Separate
> study-specific weaknesses from objections that would apply to almost any study, and
> do not invent citations.'

> 'Now argue the opposite: what is methodologically strong here, and which of your
> own criticisms is weakest?'

## Track B · Accessible Executive-Function Layer

First pass, unguarded. Watch what it does with the items that have no owner and no
date.

> 'Turn these meeting notes into a structured action list with columns for action,
> owner, deadline and priority: [PASTE REDACTED NOTES].'

Check every owner and date against the notes. Then write the safeguard, which is the
deliverable for this track.

> 'Do it again. Only include owners and dates that are explicitly stated, put anything
> vague in a separate list headed "needs an owner or unclear", and do not invent
> details.'

> 'Review your own output: did you add any action, owner or date that was not in my
> notes? List exactly what you inferred and what I gave you.'

## Track C · Rapid Prototyping for Knowledge Translation

> 'Build a single self-contained HTML page that shows this data as a labelled chart,
> with a one-sentence plain-language takeaway: [PASTE SYNTHETIC DATA]. Use accessible
> colours and label the axes. Add a short comment noting any assumption you made.'

> 'Now act as a reviewer of your own code: where could the numbers be wrong, what
> breaks with unexpected input, and what must a human verify before this is
> published?'

## Track D · Public Engagement Translator

First pass, unguarded. Telling it to keep the caveats would hide the drift you are
looking for.

> 'Rewrite this abstract for three audiences, an interested general reader, a policy
> reader and secondary-school pupils: [PASTE PUBLIC ABSTRACT].'

Line each version up against the source yourselves and mark every over-claim, dropped
caveat and added certainty. Then write the checklist as a prompt.

> 'Do it again, preserving every caveat and uncertainty, and adding no causal claim the
> abstract does not make.'

> 'Audit your three versions against the original. List every place you strengthened
> a claim, dropped a caveat or added certainty the source did not have.'

---

## General critical-use prompts (any track)

> 'Before answering, tell me what you would need to know to answer well, and what
> assumptions you are making.'

> 'Give your answer, then a section headed "Where I might be wrong" and a section
> headed "What a human should check".'

> 'I think your answer is wrong because [REASON]. Defend it or revise it, and tell me
> which.'

> 'Map the task: list its phases, mark what you would automate and where a human must
> steer or verify, then say whether oversight should be continuous (interwoven) or at
> checkpoints (staged), and why.'

---

*Disclaimer: these materials and the tools they reference are the facilitator's own
choices, made in a personal capacity, and do not represent the views or official
position of the University of Oxford, the facilitator's employer, or of the host, the
University of Westminster. The University of Oxford accepts no liability for the
selection, use or outcomes of any third-party tool. Participants remain solely
responsible for compliance with their own institutional policy, the UK GDPR and
research ethics. This wording is a template and is not legal advice.*
