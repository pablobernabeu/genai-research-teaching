# Project tracks

Four tracks, each a different honest test of where generative AI helps a
researcher and where it must not be trusted. **Choose one per group.** Aim for a
spread across the room so neighbours can compare notes in the lightning round.

Each track is sized for the **15-minute applied session of Part 2** (see the
[facilitator guide](workshop_plan.md)): work the tool on a real problem, record one
caught error and one insight, and — if time is left — sketch the automation–steering
map. The deliverable is never "the AI did it"; it is a clear-eyed account of **what
helped, what failed and where a human stayed in charge**.

> **A note on time.** Keep the artefact *tiny*. Track C (rapid prototyping) is a
> deliberate stretch: in fifteen minutes you will **not** finish and fully verify a
> working artefact, and that is fine — the point is the *verification habit* (what you
> checked, what you refused to trust), not a finished build. If a track is running long,
> drop the map before the insight.

## Quick group seeds (for fast formation)

To form groups fast at the end of Part 1, people gather at a concrete idea — the
letter is its track. Aim for **fives**. Your group then takes **one** problem into
Part 2 — this seed, or a real one a member brings.

- Stress-test a study design — **A** · Critique an assessment or marking rubric — **A**
- Messy notes → owned actions — **B** · Tame an email or admin backlog — **B** · Plan a module, project or paper — **B**
- One-page explainer of a finding — **C** · Quick visualisation or interactive teaching aid — **C**
- Lay summary or press angle — **D** · Explain a hard concept for students — **D** · A social thread from a paper — **D**

## Before you start — common ground

- **Five angles to divide however suits you:** Convenor, Reporter, Driver, Sceptic,
  Steward (see the optional [role cards](docs/role_cards.md)). Each maps to a rubric
  dimension; an experienced group can keep it informal, but leave none unwatched.
- **One real problem per group.** Use the seed you formed around, or swap in a member's
  real, non-confidential problem (anonymise / synthesise first). None to hand? Each
  track below has a ready worked example in
  [docs/worked_examples.md](docs/worked_examples.md).
- **Research or teaching.** Every track works for a teaching task too — a lesson
  plan or assessment to stress-test (A), teaching admin to triage (B), a
  student-facing explainer to build (C), a concept to translate for students (D).
- **Free tiers only.** No paid plans, no installs, no prior experience assumed.
  Everything runs in a browser.
- **Mind the red lines** before you paste anything. Use the one-page
  [data decision aid](docs/data_decision_aid.md). When in doubt, anonymise,
  synthesise or abstain.
- **Record the friction.** Where the tool resists you is the most valuable thing
  you will find. Keep a running [museum of caught errors](docs/museum_of_caught_errors.md).
- **Reflect on the bigger picture.** Your note has a short societal reflection: does
  this widen or narrow disparities (first vs second language, support, career stage,
  background), what would you disclose, and what happens to thinking when the tool
  does the writing?
- **Plan automation against steering.** In your human-in-the-loop section, map which
  phases you will automate and where a human steers — then decide whether that
  oversight is **interwoven** through the whole project or **staged** at distinct
  checkpoints, and why.
- **Write as you go** in the app, inside the [rubric template](evaluation_rubric_template.md),
  and submit for review during Part 2 (by **13:45**); HackMD is the fallback for a group that
  cannot use the app — no GitHub account needed.

**A note on free tools and your data.** Free consumer tiers commonly reuse inputs
to improve models, and settings change without notice. Treat anything you paste as
potentially non-private. This kit names tools as *examples on a spectrum*, not as
endorsements; check each tool's current terms yourself.

---

## Track A · Methodological Blind-Spot Detector

**The spectrum:** off-the-shelf chat, optionally a no-code "critical reviewer"
prompt you save and reuse.

### Rationale
Researchers are trained to find weaknesses in others' work and are systematically
worse at finding them in their own. A language model will readily play critical
reviewer — but will it surface **genuine** blind spots, or fluent, generic
boilerplate and plausible-sounding objections that do not actually hold? This
track turns the tool on a real design and then does the harder second step:
**verifying which critiques are real.** It is the purest test of the day's thesis
that friction is a signal — here, the friction is your own discomfort at a critique
you cannot immediately dismiss.

### Free-tier tooling
ChatGPT (free), Claude (free), Google Gemini (free) or Microsoft Copilot (free) for
the critique; Perplexity (free) to cross-check any factual or methodological claim
the model makes against real sources. One off-the-shelf tool is enough; comparing
two is instructive.

### Task outline
1. **Frame (orientation).** Take a real, non-confidential methods section, design,
   sampling plan or analysis strategy. Strip identifiers.
2. **Critique (build).** Prompt the model to act as a sceptical reviewer across
   several explicit lenses — sampling and recruitment, construct validity (does the
   measure capture what it claims to?), confounds, analysis choices, generalisability
   and ethics. (Adapt the lenses to your field; not all apply to every design or assessment.) Ask for its reasoning,
   not just verdicts.
3. **Verify (evaluation).** For each "blind spot" it raises, classify it:
   **real** (a genuine weakness you had not fully weighed), **generic** (true of
   almost any study, so not informative) or **wrong** (a hallucinated or invalid
   objection). Cross-check factual claims in Perplexity.
4. **Distil.** Turn the exercise into a **reusable critique protocol** — the prompt
   plus the verification rule — that a colleague could apply tomorrow.

### Created artefact
A reusable **methodological-critique protocol** (the prompt + a verification rule),
plus a classified list of the blind spots it raised: real vs generic vs wrong.

### Data note
Use only anonymised, non-confidential or already-public material. **No unpublished
participant data, no confidential grant or peer-review content.** Free tiers may
retain inputs. If your design is sensitive, paraphrase it into a generic version
first — the critique still works on the structure.

### Note headings (tailored)
- **Project Definition** — the design under review and what a useful critique would
  change.
- **Technology Stack** — tool(s) chosen and why off-the-shelf suffices here.
- **Data Security & Ethics** — how you de-identified the design; disclosure if this
  critique fed a real submission.
- **Financial & Scalability Constraints** — does the free tier sustain this as a
  routine pre-submission check?
- **Human-in-the-Loop Protocol** — your rule for accepting, parking or rejecting a
  machine critique; who signs off; and whether oversight is interwoven or staged.
- **Deliverable** — link to the protocol and the classified blind-spot list.
- **Museum of caught errors** — the most confidently wrong or emptily generic
  critique, and what it taught you.
- **Lightning-round insight** — the single most significant limitation, or the
  safeguard you built in.

---

## Track B · Accessible Executive-Function Layer

**The spectrum:** off-the-shelf chat, plus a reusable template or saved prompt
(light no-code).

### Rationale
A great deal of research work is executive function: planning, sequencing,
triaging, summarising, turning a sprawling inbox or a messy set of notes into
ordered next actions. Used well, AI can lower that load and widen access —
particularly valuable for neurodivergent colleagues or anyone under heavy
administrative strain. Used carelessly, the same scaffolding quietly **de-skills**,
creates dependency or advantages only those fluent at prompting. This track builds
a genuinely useful aid **and** asks where the scaffolding should stop.

### Free-tier tooling
ChatGPT (free), Claude (free), Gemini (free) or Copilot (free); Grammarly (free
tier, and the one tool available institution-wide) for clarity of the resulting
text. Optionally a free note tool you already use, to hold the template.

### Task outline
1. **Pick a real recurring burden (orientation).** A weekly planning ritual, a
   meeting-notes-to-actions conversion, an inbox triage, a reading backlog.
2. **Build a workflow (build).** Design an AI-assisted routine and capture it as a
   **reusable template or prompt** — not a one-off chat. Test it on real (redacted)
   material.
3. **Stress-test (evaluation).** Check three failure modes: **accuracy** (does it
   drop or invent actions?), **over-reliance** (what skill atrophies if you always
   use it?) and **equity** (does it only help people who phrase prompts well, or in
   English?).
4. **Set the guardrails.** Decide what the human must always still do.

### Created artefact
A reusable **executive-function template or prompt** (for example, a
meeting-to-actions protocol, a triage rubric or a structured planning scaffold),
with an explicit "guardrails" note on where human judgement stays.

### Data note
**Do not paste colleagues', students' or participants' personal data** — emails,
names, pastoral or HR content — into free tools. Redact to roles and topics
("a PhD student asks about an extension") rather than identities. Calendar and
inbox content is personal data.

### Note headings (tailored)
- **Project Definition** — the burden you are reducing and what "better" means.
- **Technology Stack** — why a template/prompt rather than ad-hoc chat.
- **Data Security & Ethics** — how you redacted; equity and accessibility effects.
- **Financial & Scalability Constraints** — free-tier limits; does it help a whole
  team or just one fluent user?
- **Human-in-the-Loop Protocol** — what the human always verifies; the de-skilling
  guardrail; and whether oversight is interwoven or staged.
- **Deliverable** — link to the template and guardrails note.
- **Museum of caught errors** — a dropped or invented action, and how you caught it.
- **Lightning-round insight** — the limitation, or the safeguard.

---

## Track C · Rapid Prototyping for Knowledge Translation *(technical stretch)*

**The spectrum:** no-code app builders through to IDE/API level — the most control
and the most responsibility.

### Rationale
Findings often die in PDFs. A small interactive artefact — a one-page explainer, a
simple visualisation, a tiny calculator — can carry a result to people who will
never read the paper. Generative AI now builds such things from a prompt in
minutes. That speed is exactly the hazard: it is trivial to produce something that
**looks** right and is subtly wrong. This is the "vibe-coding" trap — accepting code because it runs and looks plausible, without reading it or testing whether it is actually right. The track
embraces the speed and then insists on the verification that publication would
demand.

### Free-tier tooling
Browser-based, no install:
- **Claude (free)** — *artifacts* can generate and preview small self-contained
  HTML/JavaScript pages.
- **ChatGPT (free)** — *canvas* for iterating on code and copy.
- **Google AI Studio (free)** — a free Gemini API key and an in-browser prompt
  workbench, for those who want to touch the API level without installing anything.
- **Google Colab (free)** — in-browser Python notebooks for a quick chart from a
  small dataset.

(If a group has GitHub experience and wants to publish, GitHub Pages is free —
but **no Git is required today**; previewing locally in the tool is enough.)

### Task outline
1. **Choose a finding (orientation).** A public or synthetic result with a number,
   a relationship or a process worth conveying.
2. **Generate (build).** Use a tool to produce a small working artefact — a
   one-page explainer, a chart, a simple interactive. Iterate on it.
3. **Verify (evaluation).** This is the point. Check **correctness** (do the numbers
   and logic survive scrutiny?), **accessibility** (colour, contrast, plain
   language, keyboard use), **licensing** (any libraries or assets it pulled in)
   and **failure modes** (what breaks with odd input?). Keep a verification log.
4. **State the gate.** Write down exactly what a human must confirm before this
   could ever be published in your name.

### Created artefact
A small working **prototype** (an HTML page, a Colab chart or a simple interactive)
**plus a verification log** recording every check and every defect found.

### Data note
**Public or synthetic data only.** Be cautious pasting data into hosted tools.
Read generated code before trusting it — models invent functions, mishandle edge
cases and import libraries with licences you have not checked. "It ran" is not
"it is correct".

### Note headings (tailored)
- **Project Definition** — the finding and the audience the artefact serves.
- **Technology Stack** — where on the spectrum you worked, and the trade-off you
  accepted.
- **Data Security & Ethics** — data provenance; licences of generated code/assets;
  accessibility.
- **Financial & Scalability Constraints** — free-tier and hosting limits; what
  publishing would actually require.
- **Human-in-the-Loop Protocol** — your verification gate before publication; who
  is accountable for correctness; and whether oversight is interwoven or staged.
- **Deliverable** — link to the prototype (or screenshots) and the verification log.
- **Museum of caught errors** — the bug that "looked right"; how you caught it.
- **Lightning-round insight** — the limitation, or the safeguard.

---

## Track D · Public Engagement Translator

**The spectrum:** off-the-shelf chat, plus free readability and translation aids.

### Rationale
Translating dense research into honest public-facing language is a real skill and a
real need — lay summaries, a thread, a press-release draft, a schools explainer. AI
is fluent at this, which is precisely the risk: it will cheerfully **over-claim,
flatten caveats and smooth nuance into something more confident than the evidence
supports**. The track produces audience-tailored translations and then audits them
for fidelity, treating accessibility and accuracy as a tension to be managed, not a
slider to be maxed.

### Free-tier tooling
ChatGPT (free), Claude (free), Gemini (free) or Copilot (free) for drafting;
Grammarly (free) and the Hemingway Editor (free, web) for readability; DeepL (free)
for translation into another language; Canva (free) if a simple visual helps. All
browser-based.

### Task outline
1. **Choose a finding (orientation).** A real abstract or result that is already
   public or cleared for sharing.
2. **Translate (build).** Produce versions for two or three distinct audiences —
   for example, an interested public, a policy reader and secondary-school pupils.
   Vary reading level deliberately.
3. **Audit for fidelity (evaluation).** Line up each version against the source and
   mark **accuracy drift**: over-claims, lost caveats, false certainty, misleading
   simplifications. Decide what a human science communicator must fix.
4. **Build a check.** Distil a reusable **translation + fidelity checklist**.

### Created artefact
A set of **audience-tailored summaries** plus a **fidelity checklist** for vetting
AI-assisted science communication.

### Data note
Use findings that are **already public or cleared for release**; mind **embargoes**
and **co-author consent**. Translating someone else's unpublished work into a public
post can breach both ethics and trust.

### Note headings (tailored)
- **Project Definition** — the finding and the audiences you are translating for.
- **Technology Stack** — drafting and readability/translation tools used.
- **Data Security & Ethics** — publication status, embargo and consent; the ethics
  of disclosing AI assistance in science communication.
- **Financial & Scalability Constraints** — free-tier limits; sustaining this across
  a comms workflow.
- **Human-in-the-Loop Protocol** — the fidelity check before anything goes public;
  who approves; and whether oversight is interwoven or staged.
- **Deliverable** — link to the summaries and the fidelity checklist.
- **Museum of caught errors** — the most seductive over-claim the tool produced.
- **Lightning-round insight** — the limitation, or the safeguard.

---

## Disclaimer

These materials and the tools they reference are the facilitator's own choices,
made in a personal capacity. They do not represent the views or official position of the University of Oxford, the facilitator's employer, or of the host, the University of Westminster. The University of Oxford accepts no liability for the selection, use or outcomes of any third-party tool. Participants
remain solely responsible for compliance with their own institutional policy, the UK GDPR
and research ethics.

*This wording is a template and is not legal advice.*
