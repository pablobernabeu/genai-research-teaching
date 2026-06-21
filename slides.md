---
marp: true
theme: workshop
paginate: true
title: "Generative AI in research and teaching — a practical, critical workshop"
author: "Pablo Bernabeu"
description: "A two-part featured workshop (30 + 30 minutes, split by lunch) on the responsible and effective use of generative AI in research and teaching."
keywords: "generative AI, research, teaching, responsible use, human-in-the-loop, data protection"
---

<!-- _class: lead brand -->
<!-- _paginate: false -->
<!-- _footer: "Personal selection in a personal capacity; not the position of the University of Oxford (employer) or the host; not legal advice." -->

# Generative AI in research and teaching

### A practical, critical workshop — in two parts

<span class="subtitle">Part 1 · Conceptualising the use of AI in research — 12:00<br/>Part 2 · Practical AI for research and teaching — 13:15<br/><br/>Hosted at the University of Westminster · 24 June 2026<br/><br/>Dr Pablo Bernabeu<br/>Postdoctoral Researcher, Department of Education, and AI Ambassador, University of Oxford<br/>Fellow of the Software Sustainability Institute</span>

<!-- Welcome people as they settle. Start Part 1 on time at 12:00. -->

---

## Before we begin — the disclaimer

These materials and the tools they reference are the facilitator's own choices, made in a **personal capacity**. They do **not** represent the views or official position of the **University of Oxford** — the facilitator's employer — or of the host, the **University of Westminster**.

The **University of Oxford** accepts **no liability** for the selection, use or outcomes of any third-party tool. You remain **solely responsible** for compliance with your **own institutional policy**, the **UK GDPR** and **research ethics**.

<span class="small redline">This wording is a template and is not legal advice.</span>

<!-- Read this aloud, briefly. It sets the tone: we are practising discernment, and accountability stays with us. -->

---

## Today — two parts, with lunch between

| When | Session | |
|---|---|---|
| **12:00–12:30** | **Part 1 · Conceptualising** the use of AI in research | the ideas |
| *12:30–13:15* | *Networking lunch* | *a break* |
| **13:15–13:45** | **Part 2 · Practical** AI for research and teaching | applied session |

Part 1 builds the lens. Lunch is a real break. Part 2 puts it to work.

---

<!-- _class: lead invert -->

# Part 1 · Conceptualising the use of AI in research

<span class="subtitle">12:00–12:30 · why we are here, and the stance we will take</span>

---

## Our stance: discernment, not enthusiasm

- **Whatever your confidence** — never tried one, or a daily user — you are in the right room.
- The aim is **not technical instruction** on any one tool, but a **deeper insight into the technology**.
- Not a sales pitch, not a sceptics' meeting: the aim is **judgement**. We use these tools **and** interrogate them, in research and in teaching.
- Success is **not** a polished demo but a **clear-eyed account** — what helped, what failed, where a **human must stay in charge**.

> You bring the expertise; the tool is a fast, confident, frequently-wrong assistant. Leave able to say *when not to* reach for it.

---

## First, a quick word with your neighbour

<div class="redbox center">

**In one sentence each:** the last time an AI tool either<br/>**saved you** or **burned you** — and which it was.

</div>

Thirty seconds each. No need to perform — "I have not really used one" is a fine, interesting answer too.

<span class="small muted">It primes the day: most of us already have a story, and the story usually turns on a moment of friction.</span>

---

## The latest in a long line of tools

Humans have always extended themselves with tools — and a labour economy that rewards productivity keeps moving us to the next one:

<div class="columns">

- mental arithmetic → the calculator
- pen and paper → the computer
- the calculator → Excel

* C → Python
* Internet Explorer → Chrome
* deterministic AI → generative AI

</div>

> For better or worse, our institutions demand output, and we are adept at tooling up to supply it. Generative AI is the newest entry on that list — which is exactly why it deserves careful thought, not automatic adoption.

<span class="small muted">The next step up, in code: Karpathy's *Software is changing (again)* — increasingly you instruct the machine in plain language rather than writing the code yourself, sliding between doing it by hand and handing it over, while staying the one who verifies (2025; link in the close).</span>

---

## Getting started — you do not need to be an expert

A generative AI tool is just a **chat assistant**: you type a request, it writes back. That is the whole interface.

- **Pick one free tool** today — ChatGPT, Claude, Gemini or Copilot. Any will do.
- **A useful request says** who you are, what you want and what "good" looks like — then you push back on the reply.
- **Starter prompts** for every track are in the kit (`docs/starter_prompts.md`): copy, adapt, go.

> Mixed groups are a strength — newcomers ask the questions that matter, regular users show the moves. No one is behind.

---

## Cognitive friction is a signal, not a nuisance

When a tool resists your intent — gives a glib answer, misses the point, smooths over a hard distinction — that **friction is information**. It marks where your judgement is doing real work.

- In a survey of knowledge workers, **higher confidence in the AI** went with **less critical thinking**; higher confidence in **one's own** expertise went with more (Lee et al., 2025).
- Deliberately reintroducing friction — "**provocations**" that question the output — measurably **restores** critical and metacognitive thinking (Drosos et al., 2025).

**We treat friction as data to record, not an obstacle to smooth away** — whether marking, writing or analysing.

<span class="small muted">Deliberate friction — "cognitive forcing functions" that make you pause and decide — measurably cuts over-reliance on AI where explanations alone do not (Buçinca et al., 2021; link in the close).</span>

<!-- This is the spine of the whole session. Return to it in Part 2 and in the close. -->

---

## The tool spectrum: convenience vs control

| Level | Examples (free tiers) | You trade… |
|---|---|---|
| **Off-the-shelf** chat | ChatGPT, Claude, Gemini or Copilot | Most convenient · least control · **data leaves your hands** |
| **No-code / low-code** | Claude Projects, custom GPTs, Gradio / Streamlit on free hosts, Colab | Some setup · more repeatable · clearer guardrails |
| **IDE / API level** | VS Code + assistant, Google AI Studio API key, scripts | Steepest · **most control** · most responsibility |

Friction rises as you move down the table — and so does your ability to **put a human in the loop**.

---

## Data-security red lines

<div class="redbox">

**If you would not pin it to a public noticeboard, do not paste it into a free consumer AI tool.**

</div>

Never paste, without a lawful basis and a cleared tool:

- **Personal data** of identifiable people — students, applicants, participants, staff (**UK GDPR**)
- **Special-category** data — health, ethnicity, beliefs, sexuality, biometrics
- **Confidential or unpublished** material — grant drafts, peer-review files, NDA data
- **In teaching:** marks, references, pastoral notes, records of specific learning difficulties (SpLD), exam scripts, admissions data

<span class="small muted">Free tiers may reuse your inputs to train models. Assume your input is not private. When in doubt, anonymise, synthesise or abstain.</span>

---

## The ethical landscape

Not one risk but several, pulling in different directions:

<div class="columns">

- **Accuracy** — fluent, confident, wrong
- **Bias** — inherited from training data
- **Transparency** — when must you disclose use?
- **Attribution & IP** — whose words, whose licence?

* **Equity** — who benefits, who is left out?
* **Environment** — real energy cost
* **Over-reliance** — quiet de-skilling
* **Accountability** — it never transfers

</div>

<span class="small muted">In teaching, add assessment integrity, disclosure to students and equitable access. Anchored in the Russell Group principles (2023), the EC living guidelines (2024), UNESCO (2023) and ICO guidance — links in the close.</span>

---

## Zoom out — the bigger questions

Beyond any single task, three shifts worth dwelling on, to carry into Part 2:

- **Thinking and writing, decoupled.** We have long thought *by* writing. If the tool drafts, where does the thinking go — and what is lost if we let it?
- **Fairness — leveller or amplifier?** AI might narrow gaps (a second language, thin support, an early career, background) or widen them. Which, and for whom?
- **Disclosure.** We ask people to disclose AI *use*. Should we also disclose the *conditions* it offsets — or would that expose the very inequities it eased?

> No settled answers — these are policy questions in the making. Notice them in your own task.

---

## The human-in-the-loop principle

**The AI proposes. The human disposes.** Accountability does not transfer to a tool.

Before you start a task, decide **in advance**:

1. **Where** must a human verify a claim, a number or a citation?
2. **Who** signs off, and against **what** standard?
3. **What** will you never delegate — the final call on correctness, ethics or authorship?
4. **How** is oversight arranged — **interwoven** through every step, or **staged** at checkpoints between phases?

> A good workflow names its checkpoints *before* it trusts the output, not after something breaks.

<span class="small muted">Two named shapes of this division of labour: Mollick's *centaur* — you and the tool split the work into clean halves, each doing what it does best (the staged pattern) — and the *cyborg*, where you and the tool weave together turn by turn (the interwoven pattern) (2023; link in the close).</span>

---

## What Part 2 asks of you

Take a **real task**, use a tool on it, then **put it on trial**. Part 1 gave you the lens; Part 2 is the verdict. You will **rate yourselves on five dimensions, 1–5**:

- **Project Definition** — your group's one real problem
- **Technology Stack** — which tool on the spectrum, and why *(Part 1)*
- **Data Security & Ethics** — the red lines you hold *(Part 1)*
- **Financial & Scalability** — does the free tier hold
- **Human-in-the-Loop** — where you steer: interwoven or staged? *(Part 1)*

<span class="small muted">Plus the friction you catch (your museum), a short **societal reflection** (fairness, disclosure, thinking vs writing) and one insight to share. Template: `evaluation_rubric_template.md`.</span>

---

## Form your group now — gather at what grabs you

**Groups of five.** Stand by the idea you would most like to try — the letter is your **track**:

<div class="columns">

- Stress-test a study design — *A*
- Critique an assessment or rubric — *A*
- Messy notes → owned actions — *B*
- Tame an email or admin backlog — *B*

* One-page explainer of a finding — *C*
* Quick viz or teaching aid — *C*
* Lay summary or press angle — *D*
* Explain a concept for students — *D*

</div>

<span class="small muted">A · Blind-Spot Detector — turn the tool on your own design and verify its critiques. B · Executive-Function Layer — build a reusable aid for planning or triage. C · Rapid Prototyping — make a small artefact, then check it. D · Public Engagement — translate a finding, then audit it for fidelity. Full briefs in `project_tracks.md`. Your group takes **one** problem into Part 2 — this seed, or a real one a member brings.</span>

---

<!-- _class: lead -->

## Networking lunch

<span class="subtitle">12:30–13:15</span>

---

<!-- _class: lead invert -->

# Part 2 · Practical AI for research and teaching

<span class="subtitle">13:15–13:45 · applied session · groups of five</span>

---

## How Part 2 runs — 30 minutes

| When | Phase | Mins |
|---|---|---|
| <span class="clock">13:15</span> | **Settle in** — re-find your group, agree your **one** problem (60 s), open HackMD; red lines on | 3 |
| <span class="clock">13:18</span> | **Apply it** — run the tool on your problem; capture friction, the automation–steering map and one caught error | 15 |
| <span class="clock">13:33</span> | **Lightning round** — 45 seconds per group: the limitation, or the safeguard | 7 |
| <span class="clock">13:40</span> | **Synthesis** — drawing the threads from the round; take-aways for research and teaching | 5 |

<span class="small muted">Around 13:26 the facilitator calls a 30-second pause — keyboards down — to switch the room from building to interrogating. In the lightning round, 45 seconds is a hard stop: with ten groups, some give a one-line written harvest rather than a full spoken turn, and the facilitator collects the HackMD links during the apply block.</span>

---

## Cover the five angles between you

You will **rate yourselves on five dimensions** — so make sure each has someone keeping half an eye on it. **Split them however suits your group; swap the keyboard freely.**

- **Project definition & the clock** — the real problem, kept in focus *(Convenor)*
- **Which tool, and why** — operate it, place it on the spectrum *(Driver)*
- **Data red lines & ethics** — what must never go in *(Steward)*
- **Cost, scale & the write-up** — does the free tier hold; own the note and the insight *(Reporter)*
- **Where the human stays in charge** — try to break it; keep a caught error *(Sceptic)*

<span class="small muted">These are the five rubric dimensions. Experienced group? Skip the labels — just don't let the building crowd out the interrogating.</span>

---

## Work a real problem — the core five

Use your group's one problem — the seed, a member's real one, or a worked example (`docs/worked_examples.md`). In fifteen minutes, do these five, and only these:

1. **One artefact move** — run your tool and make something: a critique, a template, a small artefact, a translation.
2. **One or two caught errors** — moments it was fluent and wrong. Keep them.
3. **The automation–steering map** — which steps the tool ran, and where *you* steered.
4. **Interwoven or staged?** — was your oversight woven through every step, or staged at checkpoints between phases? Say why, and what it cost.
5. **One insight** — the limitation, or the safeguard, you will report.

<span class="small muted">That is the whole job for the fifteen minutes. The full rubric scoring and the societal reflection come later, when you tidy and share the note — not now.</span>

---

## Capture it: one HackMD note (compact)

You do **not** touch GitHub. Keep it light — this is 15 minutes, not a report:

1. The **Reporter** opens **HackMD** (hackmd.io, free, no install) and pastes the **compact** rubric note (`evaluation_rubric_template.md`).
2. Fill the essentials: the problem · the tool · the **map (interwoven / staged)** · one caught error · your insight.
3. Set it **link-shareable** and **share the link with the facilitator** — that is all; no account, nothing to install.

<span class="small muted">The facilitator archives every note under `submissions/` afterwards — your work becomes part of the open record.</span>

---

## What you are filling in (the rubric)

Five dimensions, scored **1–5** · **1 = Nascent · 3 = Developing · 5 = Robust**. Live, place yourselves on **dimensions 1, 3 and 5** — Project Definition, Data Security & Ethics and Human-in-the-Loop; complete the full table when you tidy the note:

1. **Project Definition** — is the real problem and its success criterion clear?
2. **Technology Stack** — right tool on the spectrum, and why?
3. **Data Security & Ethics** — red lines held; GDPR and ethics addressed?
4. **Financial & Scalability** — does the free tier hold; what breaks at scale?
5. **Human-in-the-Loop** — checkpoints, accountability and a map of automation vs steering: **interwoven or staged**?

<span class="small muted">Plus a deliverable link, a museum of caught errors and your lightning insight.</span>

---

## The museum of caught errors

Keep a short, honest log of the moments the tool went wrong — and what each one **taught** you.

- A confident fake citation · a flattened nuance · a plausible-but-invalid method · a biased rewrite · a misgraded answer.
- For each: **what happened**, **how you caught it**, **what it signals** about where humans must stay.

> These are not failures of your group. They are the **point**.

---

## You are working towards one sentence

At **13:33** every group gives a **45-second** spoken insight — **no slides** — answering **one** question:

<div class="redbox center">

**What was the most significant limitation you found,<br/>or the most important human-in-the-loop safeguard you built in?**

</div>

Choose the **single** most valuable thing. The Reporter delivers it. The Convenor keeps you to 45 seconds.

---

<!-- _class: lead -->

## Go — 15 minutes, starting now (13:18)

<span class="subtitle">Tracks: `project_tracks.md` · Rubric: `evaluation_rubric_template.md` · Help is circulating</span>

**Red lines on · friction recorded · human in the loop**

<!-- Leave this slide displayed during the applied session. Circulate with the prompts from the facilitator guide. -->

---

<!-- _class: invert -->

## ⏱ Pivot — around 13:26

Thirty seconds, keyboards down, as a group:

- What has the tool made **genuinely** easier — and what does that **cost**?
- Where did it resist you? **What was that friction telling you?**
- Have we held the **data red lines**?
- **Switch mode now:** from *building* to *interrogating*. Lock in your map and your insight.

---

<!-- _class: lead invert -->

# Lightning round · 13:33

<span class="subtitle">45 seconds per group · one insight · no slides</span>

**Most significant limitation, or most important safeguard?**

<!-- Facilitator times strictly: 45 s each, as many groups as time allows, then a quick harvest of the rest. Jot a recurring thread from each for the synthesis. -->

---

<!-- _class: lead invert -->

# Close · 13:40

<span class="subtitle">Drawing the threads from the room — and what we take back to research and teaching</span>

---

## What we saw, across the room — live

<span class="small muted">Facilitator: fill each line live, from the two or three threads you jotted during the lightning round. These four are what to listen for — not findings decided in advance.</span>

- **Context decided** — a tool that helped on one task and was a hazard on the next: ______
- **Friction as signal** — where the friction a group recorded marked where judgement lives: ______
- **A human checkpoint, named in advance** — the strongest safeguard a group built in: ______
- **Where a free tier drew a hard line** — on data, scale or accountability: ______

---

## The through-line

> **Use the tool where it earns its place. Keep the human where judgement is owed.**

- Treat fluency as a **prompt to check**, not a proxy for truth.
- Build the **checkpoint before** you trust the output.
- Record the friction — it is your **map of where you matter**.
- Disclose use, respect data, keep accountability with a **named person**.
- Ask the bigger questions: **who is helped, who is left out**, and what we owe to disclose.

---

## Back at your desk — a responsible-use starting point

Pick **one** to try this week, in research **or teaching**:

1. Write a **two-line AI-use note** for one task: what you used, what you checked, what you did not delegate.
2. Add **one human checkpoint** to a workflow you already AI-assist.
3. Before pasting, run the **one-page data decision aid** (`docs/data_decision_aid.md`).
4. Keep your own **museum of caught errors** for a fortnight.

<span class="small muted">A short follow-up with a responsible-use commitment will reach you by email (`docs/post_workshop_followup.md`).</span>

---

## Further reading — verified

- **Russell Group (2023)** · Principles on the use of generative AI tools in education — russellgroup.ac.uk
- **European Commission / ERA Forum (2024)** · Living guidelines on the responsible use of generative AI in research
- **UNESCO (2023)** · Guidance for generative AI in education and research (Miao & Holmes)
- **ICO** · Guidance on AI and data protection (UK GDPR) — ico.org.uk
- **Lee et al. (2025, CHI)** · The impact of generative AI on critical thinking
- **Drosos et al. (2025)** · "It makes you think": provocations help restore critical thinking — arXiv:2501.17247
- **Bender et al. (2021, FAccT)** · On the dangers of stochastic parrots
- **Karpathy (2025)** · *Software is changing (again)* — programming up a level, human on the "autonomy slider" [talk]
- **Mollick (2023)** · *Centaurs and cyborgs* — the human stays the architect of the work

<span class="small muted">Full citations with links: `workshop_plan.md` and `README.md`.</span>

---

<!-- _class: lead -->

## Thank you — and over to you

Your notes become an **open, reproducible archive**: [REPOSITORY URL]

Questions or follow-ups? Open a thread in the repository's **Discussions** tab ([REPOSITORY URL]) — so answers help everyone.

<span class="subtitle">The tool is fast and confident; you are the one who is accountable, and who decides when its fluency has earned your trust. Bring both to the work.</span>

---

<!-- _class: brand -->

## Disclaimer

These materials and the tools they reference are the facilitator's own choices, made in a **personal capacity**, and do not represent the views or official position of the University of Oxford — the facilitator's employer — or of the host, the University of Westminster. The University of Oxford accepts no liability for the selection, use or outcomes of any third-party tool. Participants remain solely responsible for compliance with their own institutional policy, the UK GDPR and research ethics.

<span class="small redline">This wording is a template and is not legal advice.</span>
