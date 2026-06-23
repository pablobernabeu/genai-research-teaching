---
marp: true
theme: workshop
paginate: true
transition: fade
title: "Generative AI in research and teaching — a practical, critical workshop"
author: "Pablo Bernabeu"
description: "A two-part featured workshop (30 + 30 minutes, split by lunch) on the responsible and effective use of generative AI in research and teaching."
keywords: "generative AI, research, teaching, responsible use, human-in-the-loop, data protection"
---

<!-- _class: lead brand -->
<!-- _paginate: false -->
<!-- _footer: "A personal selection in the facilitator's own capacity. Not the position of Oxford or the host, and not legal advice." -->

# Generative AI in research and teaching

### A practical and critical workshop, in two parts

<span class="subtitle">Part 1 · Conceptualising the use of AI in research (12:00)<br/>Part 2 · Practical AI for research and teaching (13:15)<br/><br/>Hosted at the University of Westminster · 24 June 2026<br/><br/>Dr Pablo Bernabeu<br/>Postdoctoral Researcher, Department of Education, and AI Ambassador, University of Oxford<br/>Fellow of the Software Sustainability Institute</span>

<!-- Welcome people as they settle. Start Part 1 on time at 12:00. -->

---

## Before we begin

These materials and the tools they reference are the facilitator's own choices, made in a personal capacity. They do not represent the views or official position of the University of Oxford, the facilitator's employer, or of the host, the University of Westminster.

The University of Oxford accepts no liability for the selection, use or outcomes of any third-party tool. You remain solely responsible for compliance with your own institutional policy, the UK GDPR and research ethics.

<span class="small redline">This wording is a template and is not legal advice.</span>

<!-- Read this aloud, briefly. It sets the tone: we are practising discernment, and accountability stays with us. -->

---

## Two parts, with a break between

| When | Session | |
|---|---|---|
| **12:00–12:30** | **Part 1 · Conceptualising** the use of AI in research | the ideas |
| *12:30–13:15* | *Networking lunch* | *a break* |
| **13:15–13:45** | **Part 2 · Practical** AI for research and teaching | applied session |

Part 1 sets up a way of thinking. The lunch is a genuine break. Part 2 puts the thinking into practice.

---

<!-- _class: lead invert -->

# Part 1 · Conceptualising the use of AI in research

<span class="subtitle">12:00–12:30 · why we are here, and the stance we will take</span>

---

## Our stance is discernment, not enthusiasm

- Whatever your level of confidence, whether you have never tried one or use them daily, you are in the right room.
- The aim is not technical instruction on any one tool, but a deeper understanding of the technology.
- This is neither a sales pitch nor a sceptics' meeting. The aim is judgement. We use these tools and we interrogate them, in research and in teaching.
- Success is not a polished demo but a clear-eyed account of what helped, what failed and where a human must stay in charge.

> You bring the expertise. The tool is a fast and confident assistant that is often wrong. The aim is to leave knowing when not to reach for it.

---

## A brief word with your neighbour

<div class="redbox center">

In one sentence each, recall the last time an AI tool either<br/>**helped you** or **let you down**, and which it was.

</div>

Thirty seconds each. There is no need to perform. "I have not really used one" is a perfectly good answer.

<span class="small muted">This primes the day. Most of us already have a story, and it usually turns on a moment of friction.</span>

---

## The latest in a long line of tools

Humans have always extended themselves with tools, and a labour economy that rewards productivity keeps moving us on to the next one.

<div class="columns">
<div>

- mental arithmetic → the calculator
- pen and paper → the computer
- the calculator → Excel

</div>
<div>

- C → Python
- Internet Explorer → Chrome
- deterministic AI → generative AI

</div>
</div>

> For better or worse, our institutions demand output, and we are adept at tooling up to supply it. Generative AI is the newest entry on that list, which is exactly why it deserves careful thought rather than automatic adoption.

<!-- Speaker note: the next step up, in code — Karpathy's "Software is changing (again)" (2025): increasingly you instruct the machine in plain language rather than writing the code, sliding between doing it by hand and handing it over, while staying the one who verifies. (In Further reading.) -->

---

## Getting started, with no expertise needed

A generative AI tool works much like a chat assistant. You type a request and it writes back. That is essentially the whole interface.

- Choose one free tool today, such as ChatGPT, Claude, Gemini or Copilot. Any of them will serve.
- A useful request states who you are, what you want and what a good answer would look like. You then push back on the reply.
- Starter prompts for each track are in your group pack and in the app, ready to adapt.

> Mixed groups are a strength. Newcomers ask the questions that matter, and regular users show what is possible. No one is behind.

---

## Cognitive friction is a signal, not a nuisance

When a tool resists your intent, by giving a glib answer, missing the point or smoothing over a hard distinction, that friction is information. It marks where your judgement is doing real work.

- In a survey of knowledge workers, higher confidence in the AI went with less critical thinking, while higher confidence in one's own expertise went with more (Lee et al., 2025).
- Deliberately reintroducing friction, through prompts that question the output, can restore critical and metacognitive engagement (Drosos et al., 2025).

We treat friction as data to record rather than an obstacle to smooth away, whether marking, writing or analysing.

<span class="small muted">Deliberate friction, the "cognitive forcing functions" that make you pause and decide, measurably cuts over-reliance on AI where explanations alone do not (Buçinca et al., 2021; link in the close).</span>

<!-- This is the spine of the whole session. Return to it in Part 2 and in the close. Note: Lee et al. is a self-report survey — an association, not proof that AI use causes weaker thinking. -->

---

## The tool spectrum, from convenience to control

| Level | Examples (free tiers) | You trade… |
|---|---|---|
| Off-the-shelf chat | ChatGPT, Claude, Gemini, Copilot | convenient · least control · data leaves your hands |
| No-code / low-code | Claude Projects, custom GPTs, Gradio/Streamlit, Colab | some setup · repeatable · clearer guardrails |
| IDE / API level | VS Code + assistant, AI Studio API key, scripts | steepest · most control · most responsibility |

Friction rises as you move down the table, and so does your ability to keep a human in the loop.

<span class="small muted">No-code means setting things up by clicking and prompting, without writing code. Working at the IDE or API level means using a code editor or calling the model programmatically, with more control and more responsibility.</span>

---

## Data-security red lines

<div class="redbox">

Red line. If you would not pin it to a public noticeboard, do not paste it into a free consumer AI tool.

</div>

Without a lawful basis and a cleared tool, never paste:

- Personal data of identifiable people, such as students, applicants, participants or staff (UK GDPR).
- Special-category data, such as health, ethnicity, beliefs, sexuality or biometrics.
- Confidential or unpublished material, such as grant drafts, peer-review files or data under an NDA.
- In teaching, also marks, references, pastoral notes, SpLD records, exam scripts and admissions data.

<span class="small muted">Free tiers may train on your inputs, so assume nothing is private. When in doubt, anonymise, synthesise or abstain.</span>

---

## The ethical landscape

These are not one risk but several, pulling in different directions.

<div class="columns">
<div>

- **Accuracy**, fluent and confident yet wrong
- **Bias**, inherited from training data
- **Transparency**, when must use be disclosed?
- **Attribution and IP**, whose words and whose licence?

</div>
<div>

- **Equity**, who benefits and who is left out?
- **Environment**, a real energy cost
- **Over-reliance**, a quiet de-skilling
- **Accountability**, which never transfers

</div>
</div>

<span class="small muted">In teaching, add assessment integrity, disclosure to students and equitable access. Frameworks (Russell Group, EC, UNESCO, ICO) in the close.</span>

---

## Stepping back, the bigger questions

Beyond any single task, three larger shifts are worth carrying into Part 2.

- Thinking and writing, decoupled. We have long thought by writing. If the tool drafts, where does the thinking go, and what is lost if we let it?
- Fairness, as leveller or amplifier. AI might narrow gaps (a second language, thin support, an early career) or widen them. Which, and for whom?
- Disclosure. We ask people to disclose their use of AI. Should we also disclose the conditions it offsets, or would that expose the very inequities it eased?

> There are no settled answers here. These are policy questions in the making. Notice them in your own task.

---

## The human-in-the-loop principle

The AI proposes and the human disposes. Accountability does not transfer to a tool.

Before you start a task, decide the following in advance.

1. Where must a human verify a claim, a number or a citation?
2. Who signs off, and against what standard?
3. What will you never delegate, such as the final call on correctness, ethics or authorship?
4. How is oversight arranged? Interwoven means a human checks at every step. Staged means a human checks at a few points between phases.

> A good workflow names its checkpoints before it trusts the output, not after something has broken.

<!-- Speaker note: two nicknames — Mollick's "centaur" (a clean split of the work, loosely our staged pattern) and "cyborg" (weaving turn by turn, loosely interwoven) (2023; in Further reading). He did not coin the staged/interwoven framing — that is our synthesis. -->

---

## What Part 2 asks of you

Take a real task, use a tool on it, then examine the result closely. Part 1 provided the way of thinking. Part 2 puts it into practice. You will rate your work on five dimensions, from 1 to 5.

- Project Definition, your group's one real problem.
- Technology Stack, which tool on the spectrum, and why (Part 1).
- Data Security and Ethics, the red lines you hold (Part 1).
- Financial and Scalability, whether the free tier holds.
- Human-in-the-Loop, where you steer, interwoven or staged (Part 1).

<span class="small muted">Plus the friction you catch (your museum of caught errors), a short societal reflection (fairness, disclosure, thinking versus writing, and whether your field is over- or under-using AI here) and one insight to share. The app walks you through it.</span>

---

## Form your groups now

Groups of five. Move to the idea you would most like to try. The letter beside it is your track.

<div class="columns">
<div>

- Stress-test a study design (A)
- Critique an assessment or rubric (A)
- Turn messy notes into clear actions (B)
- Triage an email or admin backlog (B)

</div>
<div>

- A one-page explainer of a finding (C)
- A quick visualisation or teaching aid (C)
- A lay summary or press angle (D)
- Explain a concept for students (D)

</div>
</div>

<span class="small muted">Note who is in your group and which track you chose. You regroup straight after lunch, without re-forming.</span>

<span class="small muted">A · Blind-Spot Detector, turn the tool on your own design and verify its critiques. B · Executive-Function Layer, build a reusable aid for planning or triage. C · Rapid Prototyping, make a small artefact, then check it. D · Public Engagement, translate a finding, then audit it for fidelity. Fuller briefs are in your group pack and in the app. Your group takes one problem into Part 2, either this seed or a real one a member brings.</span>

---

<!-- _class: lead -->

## Networking lunch

<span class="subtitle">12:30–13:15</span>

---

<!-- _class: lead invert -->

# Part 2 · Practical AI for research and teaching

<span class="subtitle">13:15–13:45 · applied session · groups of five</span>

---

## Open the workshop app

<div class="qr-row">

<div class="qr">
<svg viewBox="0 0 33 33" shape-rendering="crispEdges" role="img" aria-label="QR code linking to the group app at genai-rt.web.app" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M0 0h33v33H0z"/><path stroke="#000000" d="M4 4.5h7m3 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M4 5.5h1m5 0h1m2 0h2m2 0h3m2 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m1 0h5m1 0h1m1 0h1m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h1m3 0h3m3 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m1 0h2m8 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m1 0h1m5 0h2m2 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m1 0h1m3 0h3M4 12.5h1m1 0h5m4 0h6m1 0h5M4 13.5h4m1 0h1m4 0h1m1 0h1m3 0h1m2 0h1m3 0h1M4 14.5h3m1 0h1m1 0h2m3 0h3m1 0h1m1 0h5m1 0h2M4 15.5h1m1 0h1m1 0h2m1 0h2m1 0h1m6 0h3m4 0h1M7 16.5h4m1 0h2m1 0h1m1 0h1m1 0h4m1 0h1m1 0h3M4 17.5h2m1 0h1m1 0h1m3 0h2m1 0h2m2 0h1m2 0h1m1 0h1m1 0h1M4 18.5h1m2 0h1m2 0h1m1 0h2m3 0h5m1 0h3m1 0h2M4 19.5h1m2 0h1m1 0h1m3 0h2m1 0h1m2 0h2m2 0h2m3 0h1M4 20.5h1m4 0h2m1 0h1m1 0h1m1 0h3m1 0h5m1 0h1M12 21.5h1m1 0h1m4 0h2m3 0h2M4 22.5h7m2 0h4m3 0h1m1 0h1m1 0h1m1 0h3M4 23.5h1m5 0h1m1 0h2m1 0h1m2 0h3m3 0h2m2 0h1M4 24.5h1m1 0h3m1 0h1m1 0h2m1 0h10m1 0h1M4 25.5h1m1 0h3m1 0h1m1 0h3m1 0h1m1 0h1m2 0h2m1 0h5M4 26.5h1m1 0h3m1 0h1m1 0h2m2 0h1m2 0h2m4 0h2m1 0h1M4 27.5h1m5 0h1m5 0h1m2 0h2m1 0h4m2 0h1M4 28.5h7m1 0h3m2 0h2m2 0h8"/></svg>
</div>

<div class="qr-text">

<span class="bigurl">genai-rt.web.app</span>

Scan the code, or type the address into any browser.

Your facilitator will read out the session passcode you need to start a group.

<span class="small muted">No device, or trouble connecting? HackMD (hackmd.io) is the fallback, and your facilitator will point you there.</span>

</div>

</div>

<!-- Display this while groups settle (13:15); read out the session passcode. One device per group creates; the others join with the 6-character code it shows. -->

---

## How Part 2 runs (30 minutes)

| When | Phase | Mins |
|---|---|---|
| <span class="clock">13:15</span> | **Settle in.** Re-find your group, agree your one problem (60 s), open the app (HackMD as fallback), red lines on | 3 |
| <span class="clock">13:18</span> | **Apply it.** Run the tool on your problem and capture one caught error and one insight (the automation–steering map if time allows) | 15 |
| <span class="clock">13:33</span> | **Lightning round.** 45 seconds per group, on the limitation, the safeguard, or how your field over- or under-uses AI | 7 |
| <span class="clock">13:40</span> | **Synthesis.** Drawing the threads together, with take-aways for research and teaching | 5 |

<!-- Speaker note: around 13:26 call a 30-second pause — keyboards down — to switch the room from building to interrogating. In the lightning round, 45 seconds is a hard stop: with ten groups, some give a one-line written harvest rather than a full spoken turn; collect the app submissions during the apply block. -->

---

## The five angles

The note rates your work on five dimensions, from 1 (Nascent) through Developing to Robust. Split them across the group and share the keyboard freely. Place yourselves on 1, 3 and 5 during the session, and complete the rest when you tidy the note.

1. Project Definition (Convenor). Your group's one real problem, kept in focus.
2. Technology Stack (Driver). The right tool on the spectrum, and why.
3. Data Security and Ethics (Steward). The red lines you hold.
4. Financial and Scalability (Reporter). Whether the free tier holds. This role also owns the note and the spoken insight.
5. Human-in-the-Loop (Sceptic). Checkpoints and accountability. Add the automation–steering map when you tidy the note.

<span class="small muted">The five dimensions are for the note you tidy later, not five things to do live. During the session, focus on the three. An experienced group can ignore the labels.</span>

---

## Working on a real problem

Use your group's one problem: the seed, a member's real one, or a worked example from your pack. In fifteen minutes, complete these three first. If that is all you manage, you have done the task.

1. One artefact. Run your tool and produce something real, such as a critique, a template or a translation.
2. One or two caught errors. Moments where it was fluent but wrong. Keep them.
3. One insight. A limitation, a safeguard, or one honest observation about how your field is over- or under-using AI. This is your contribution to the 45-second round.

> If about five minutes remain, go further. Add the automation–steering map (which steps the tool ran, and where you steered) and decide whether oversight was interwoven or staged, noting why and what it cost. If you fall behind, drop the map before the insight.

<span class="small muted">Complete the three first. The map and the oversight model are a bonus if time allows. The full rubric scoring and the societal reflection come later, when you tidy the note.</span>

---

## Capturing your work in the app

There is no GitHub to touch and no report to write. This is fifteen minutes of capture, kept deliberately light.

1. The Reporter opens the app (genai-rt.web.app), names the group and enters the session passcode. There is no account and nothing to install. One device creates the group, and the others join with the code it shows.
2. Fill in the essentials: the problem, the tool, one caught error and your insight, adding the map and the oversight model if time allows. The app saves as you go.
3. Submit for review. The facilitator sees it live and approves it. That is all.

<span class="small muted">No device, or the app misbehaving? HackMD (hackmd.io) is the fallback, with the same headings. A countdown on screen shows the time left, and the facilitator archives the approved work afterwards.</span>

---

## The museum of caught errors

Keep a short, honest log of the moments the tool went wrong, and what each one taught you.

- A confident but fake citation · a flattened nuance · a plausible but invalid method · a biased rewrite · a misgraded answer.
- For each, note what happened, how you caught it, and what it signals about where humans must stay in charge.

> These are not failures of your group. They are the point.

---

<!-- _class: lead -->

## Fifteen minutes, starting now (13:18)

<span class="subtitle">Tracks and rubric are in your pack and in the app · help is circulating</span>

Hold the red lines, record the friction, keep a human in the loop.

<!-- Leave this slide displayed during the applied session. Circulate with the prompts from the facilitator guide. -->

---

<!-- _class: invert -->

## ⏱ Pivot, around 13:26

Thirty seconds, keyboards down, as a group.

- What has the tool genuinely made easier, and what does that cost?
- Where did it resist you, and what was that friction telling you?
- Have we held the data red lines?
- Switch now from building to interrogating. Settle your map and your insight.

---

<!-- _class: lead invert -->

# Lightning round · 13:33

<span class="subtitle">45 seconds per group · one insight · no slides · the Reporter delivers, the Convenor keeps time</span>

What was the most significant limitation, the most important human-in-the-loop safeguard, or one honest thing this exposed about how your field over- or under-uses AI?

<!-- Facilitator times strictly: 45 s each, as many groups as time allows, then a quick harvest of the rest. Jot a recurring thread from each for the synthesis. -->

---

<!-- _class: lead invert -->

# Close · 13:40

<span class="subtitle">Drawing the threads from the room, and what we take back to research and teaching</span>

---

## What we saw, across the room

<span class="small muted">Facilitator: fill each line live, from the two or three threads you noted during the lightning round. These four are what to listen for, not findings decided in advance.</span>

- **Context decided.** A tool that helped on one task but became a hazard on the next: ______
- **Friction as signal.** Where a group's recorded friction marked where judgement lives: ______
- **A checkpoint named in advance.** The strongest safeguard a group built in: ______
- **Where a free tier drew a hard line.** On data, scale or accountability: ______

---

## The through-line

> Use the tool where it earns its place. Keep the human where judgement is owed.

- Treat fluency as a prompt to check, not a proxy for truth.
- Build the checkpoint before you trust the output.
- Record the friction. It maps where you matter.
- Disclose use, respect data, and keep accountability with a named person.
- Ask the bigger questions of who is helped, who is left out, and what we owe to disclose.

---

## Back at your desk

Choose one to try this week, in research or in teaching.

1. Write a two-line note on your AI use for one task, recording what you used, what you checked, and what you did not delegate.
2. Add one human checkpoint to a workflow you already assist with AI.
3. Before pasting anything sensitive, work through the one-page data decision aid from your pack.
4. Keep your own museum of caught errors for a fortnight.

<span class="small muted">A short follow-up, with a responsible-use commitment, will reach you by email.</span>

---

## Further reading

<div class="columns">
<div>

- **Russell Group (2023).** Principles on generative AI in education. russellgroup.ac.uk
- **EC / ERA Forum (2024).** Living guidelines on responsible generative AI in research.
- **UNESCO (2023).** Guidance for generative AI in education and research (Miao & Holmes).
- **ICO.** Guidance on AI and data protection (UK GDPR). ico.org.uk
- **Lee et al. (2025, CHI).** The impact of generative AI on critical thinking, a survey of knowledge workers. <span class="doi">[doi.org/10.1145/3706598.3713778](https://doi.org/10.1145/3706598.3713778)</span>

</div>
<div>

- **Drosos et al. (2025).** "It makes you think": provocations help restore thinking. <span class="doi">[arXiv:2501.17247](https://arxiv.org/abs/2501.17247)</span>
- **Buçinca et al. (2021, CSCW).** Cognitive forcing functions reduce over-reliance on AI. <span class="doi">[doi.org/10.1145/3449287](https://doi.org/10.1145/3449287)</span>
- **Bender et al. (2021, FAccT).** On the dangers of stochastic parrots, fluent remixing without understanding. <span class="doi">[doi.org/10.1145/3442188.3445922](https://doi.org/10.1145/3442188.3445922)</span>
- **Karpathy (2025).** *Software is changing (again)*, the human on the "autonomy slider" [talk].
- **Mollick (2023).** *Centaurs and cyborgs*, the human stays the architect [essay].

</div>
</div>

<span class="small muted">Full citations, with links, are in the repository (github.com/pablobernabeu/genai-research-teaching).</span>

---

<!-- _class: lead -->

## Thank you

Your notes become an open, reproducible archive at github.com/pablobernabeu/genai-research-teaching

Questions or follow-ups? Open a thread in the repository's Discussions tab (github.com/pablobernabeu/genai-research-teaching/discussions), so that answers help everyone.

<span class="subtitle">The tool is fast and confident. You are the one who is accountable, and who decides when its fluency has earned your trust. Bring both to the work.</span>

---

<!-- _class: brand -->

## Disclaimer

These materials and the tools they reference are the facilitator's own choices, made in a personal capacity, and do not represent the views or official position of the University of Oxford, the facilitator's employer, or of the host, the University of Westminster. The University of Oxford accepts no liability for the selection, use or outcomes of any third-party tool. Participants remain solely responsible for compliance with their own institutional policy, the UK GDPR and research ethics.

<span class="small redline">This wording is a template and is not legal advice.</span>
