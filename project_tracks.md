# Project tracks

Four tracks explore where generative AI can help a researcher and where it needs close
human judgement. Choose one track per group. A spread across the room makes the
lightning round more useful.

Each track is designed to begin in the fifteen-minute build window of Part 2 (see the
[facilitator guide](workshop_plan.md)). Keep the artefact small. In Track A, verify the
three objections that matter most. In Track D, audit one audience version in full.
Record what helped, what failed and what required human judgement.

## Quick group seeds (for fast formation)

At the end of Part 1, people gather at a concrete idea, and the letter beside it is the
track. Aim for groups of five. Each group takes one problem into Part 2: the seed or a
member's non-confidential problem.

- Stress-test a study design (A) · Critique an assessment or marking rubric (A)
- Turn messy notes into owned actions (B) · Tame an email or admin backlog (B) · Plan a module, project or paper (B)
- A one-page explainer of a finding (C) · A quick visualisation or interactive teaching aid (C)
- A lay summary or press angle (D) · Explain a hard concept for students (D) · A social thread from a paper (D)

## Before you start

Each table has a [group sheet](docs/group_one_pager.md) with the app details, join code
and red lines. The session runs like this.

1. Agree one problem: the seed you formed around or a member's non-confidential problem,
   anonymised first. If neither is to hand, each track has a
   [worked example](docs/worked_examples.md).
2. Share out three jobs. Someone drives the tool, someone guards the data red lines and
   someone keeps the note and speaks for the group. Everyone else doubts the output,
   and that is the job nobody delegates.
3. Check anything you plan to paste against the red lines on the group sheet. The fuller
   [data decision aid](docs/data_decision_aid.md) stays with the facilitator.
4. Use the tool on that problem and keep an output you can show, such as a critique, a
   template or a translation.
5. Record one or two caught errors for the [museum of caught errors](docs/museum_of_caught_errors.md).
   Note where the tool was fluent but wrong.
6. Prepare one line for the lightning round: the limitation you found, the checkpoint
   you would require before use or how your field over- or under-uses AI for this task.
   Submit in the app before 13:33, or during the round at the latest.

The same tracks work for teaching: a lesson plan or assessment to stress-test (A),
teaching admin to triage (B), a student-facing explainer to build (C) or a concept to
translate for students (D). Everything runs in a browser on free tiers, and one person
needs a device already signed in to a chat assistant. If nobody has one, use a tool that
does not require sign-in or share a neighbouring group's screen for one run. The tools
named below are examples, not endorsements, so check their current terms. A group with
time left can add the automation–steering map, the oversight choice and the field
reflection in the app. The [rubric](evaluation_rubric_template.md) supports the paper
fallback and debrief. The pivot at 13:26 lands during the third step of each outline.

---

## Track A · Methodological Blind-Spot Detector

The spectrum: off-the-shelf chat, optionally with a no-code 'critical reviewer'
prompt you save and reuse.

### Rationale
Researchers are trained to find weaknesses in others' work and are worse at finding
them in their own. A language model will readily play critical reviewer, though much of
what it offers is fluent boilerplate or a plausible objection that does not hold. The
track turns it on a real design and then takes the harder second step of verifying
which critiques are real. The friction here is your own discomfort at a critique you
cannot dismiss.

### Free-tier tooling
ChatGPT (free), Claude (free), Google Gemini (free) or Microsoft Copilot (free) for
the critique, and Perplexity (free) to cross-check any factual or methodological claim
the model makes against real sources. One off-the-shelf tool is enough, and comparing
two is instructive.

### Task outline
1. Frame. Take a real, non-confidential methods section, design, sampling plan or
   analysis strategy, and strip the identifiers.
2. Critique. Prompt the model to act as a sceptical reviewer across explicit lenses:
   sampling and recruitment, construct validity, confounds, analysis choices,
   generalisability and ethics. Adapt them to your field, and ask for reasoning as well
   as verdicts.
3. Verify. Classify each 'blind spot' as real (a weakness you had not weighed), generic
   (true of almost any study) or wrong (hallucinated or invalid), and cross-check
   factual claims in Perplexity.
4. Distil the exercise into a reusable critique protocol, the prompt plus the
   verification rule, that a colleague could apply tomorrow.

### Created artefact
A reusable methodological-critique protocol (the prompt and a verification rule),
plus a classified list of the blind spots it raised: real, generic or wrong.

### Data note
Use only anonymised, non-confidential or already-public material. Do not use
unpublished participant data or confidential grant or peer-review content. Free tiers
may retain inputs. If your design is sensitive, paraphrase it into a generic version
first, because the critique still works on the structure.

---

## Track B · Accessible Executive-Function Layer

The spectrum: off-the-shelf chat, plus a reusable template or saved prompt (light
no-code).

### Rationale
A great deal of research work is executive function: planning, sequencing, triaging
and turning messy notes into ordered next actions. Used well, AI lowers that load and
widens access, which matters for neurodivergent colleagues and anyone under heavy
administrative strain. Used carelessly, it de-skills or helps only those already fluent
at prompting. The track builds a useful aid and asks where the scaffolding should stop.

### Free-tier tooling
ChatGPT (free), Claude (free), Gemini (free) or Copilot (free), with Grammarly (free
tier) for the clarity of the resulting text. Optionally, a free note tool you already
use, to hold the template.

### Task outline
1. Pick a real recurring burden: a weekly planning ritual, a meeting-notes-to-actions
   conversion, an inbox triage or a reading backlog.
2. Build the workflow as a reusable template or prompt that outlasts a single chat,
   then test it on real, redacted material.
3. Stress-test it. Look for dropped or invented actions, for the skill that would
   atrophy with constant use and for the way a prompt-shaped aid helps only those
   already fluent in English.
4. Set the guardrails. Decide what the human must always still do.

### Created artefact
A reusable executive-function template or prompt (for example, a meeting-to-actions
protocol, a triage rubric or a structured planning scaffold), with an explicit
'guardrails' note on where human judgement stays.

### Data note
Do not paste colleagues', students' or participants' personal data (emails, names,
pastoral or HR content) into free tools. Redact to roles and topics ('a PhD student
asks about an extension') instead of identities. Calendar and inbox content is
personal data.

---

## Track C · Rapid Prototyping for Knowledge Translation *(technical stretch)*

The spectrum: no-code app builders through to the IDE or API level, which offers the
most control and the most responsibility.

### Rationale
Findings often die in PDFs. A small artefact such as an explainer, a chart or a tiny
calculator can carry a result to people who will never read the paper, and generative
AI builds such things from a prompt in minutes. That speed is the hazard, since the
'vibe-coding' trap is accepting code because it runs and looks plausible when it is
subtly wrong. The track takes the speed and then insists on the verification that
publication would demand. You will not finish and fully verify in fifteen minutes,
which is fine, because the habit matters more here than a finished build.

### Free-tier tooling
Browser-based, with nothing to install:
- Claude (free): artifacts can generate and preview small self-contained HTML and
  JavaScript pages. (ChatGPT works too: its canvas was withdrawn in May 2026, and the
  code blocks that replaced it preview HTML inline.)
- Gemini (free): Canvas, for iterating on code and copy with a live preview.
- Google AI Studio (free): a free Gemini API key and an in-browser prompt workbench,
  for those who want to touch the API level without installing anything.
- Google Colab (free): in-browser Python notebooks for a quick chart from a small
  dataset.

If a group has GitHub experience and wants to publish, GitHub Pages is free, but no
Git is required today, and previewing locally in the tool is enough.

### Task outline
1. Choose a finding that is public or synthetic and carries a number, a relationship or
   a process worth conveying.
2. Generate a small working artefact with a tool, and iterate on it.
3. Verify. This is the point of the track. Check that the numbers and the logic
   survive scrutiny, that colour, contrast, plain language and keyboard use are sound,
   that anything it pulled in is licensed and that odd input does not break it. Keep a
   verification log.
4. State the gate. Write down what a human must confirm before this could ever be
   published in your name.

### Created artefact
A small working prototype (an HTML page, a Colab chart or a simple interactive) plus a
verification log recording every check and every defect found.

### Data note
Public or synthetic data only. Be cautious about pasting data into hosted tools. Read
generated code before trusting it, because models invent functions, mishandle edge
cases and import libraries with licences you have not checked. The fact that it ran
does not mean that it is correct.

---

## Track D · Public Engagement Translator

The spectrum: off-the-shelf chat, plus free readability and translation aids.

### Rationale
Translating dense research into clear public language is an important skill, whether for
a lay summary, a press-release draft or a schools explainer. AI is
fluent at this, and the fluency is the risk, since it will cheerfully over-claim,
flatten caveats and smooth nuance into something more confident than the evidence
supports. The track produces audience-tailored translations and audits them for
fidelity.

### Free-tier tooling
ChatGPT (free), Claude (free), Gemini (free) or Copilot (free) for drafting, with
Grammarly (free) and the Hemingway Editor (free, web) for readability. DeepL (free)
handles translation into another language, and Canva (free) is there if a simple visual
helps. All are browser-based.

### Task outline
1. Choose a finding that is already public or cleared for sharing.
2. Translate it for two or three distinct audiences, for example an interested public,
   a policy reader and secondary-school pupils, varying the reading level deliberately.
3. Audit for fidelity. Line each version up against the source and mark the drift:
   over-claims, lost caveats, false certainty and misleading simplification. Decide
   what a human science communicator must fix.
4. Build a check. Distil a reusable translation and fidelity checklist.

### Created artefact
A set of audience-tailored summaries plus a fidelity checklist for vetting
AI-assisted science communication.

### Data note
Use findings that are already public or cleared for release, and mind embargoes and
co-author consent. Translating someone else's unpublished work into a public post can
breach both ethics and trust.

---

## Disclaimer

These materials and the tools they reference are the facilitator's own choices, made
in a personal capacity. They do not represent the views or official position of the
University of Oxford, the facilitator's employer, or of the host, the University of
Westminster. The University of Oxford accepts no liability for the selection, use or
outcomes of any third-party tool. Participants remain solely responsible for compliance
with their own institutional policy, the UK GDPR and research ethics.

*This wording is a template and is not legal advice.*
