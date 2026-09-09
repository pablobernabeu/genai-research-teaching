---
marp: true
theme: workshop
paginate: true
transition: slide
title: "Generative AI in research and teaching: a practical, critical workshop"
author: "Pablo Bernabeu"
description: "A two-part featured workshop (30 + 30 minutes, split by lunch) on the responsible and effective use of generative AI in research and teaching."
keywords: "generative AI, research, teaching, responsible use, human oversight, data protection"
---

<!-- _class: lead brand -->
<!-- _paginate: false -->
<!-- _footer: "A personal selection in the facilitator's own capacity, which is not the position of Oxford or the host and is not legal advice." -->

# Generative AI in research and teaching

### A practical workshop in two parts

<span class="subtitle">Part 1 · Conceptualising the use of AI in research (12:00)<br/>Part 2 · Practical AI for research and teaching (13:15)<br/><br/>Hosted at the University of Westminster · 9 September 2026<br/><br/>Dr Pablo Bernabeu<br/>Postdoctoral Researcher, Department of Education, and AI Ambassador, University of Oxford<br/>Fellow of the Software Sustainability Institute</span>

---

<!-- _class: fill -->

## Before we begin

These are independent teaching materials. They do not represent the position of the University of Oxford or the University of Westminster, and they are not legal advice.

Before using any third-party tool, check your institutional policy, data-protection obligations and research ethics.

---

## Two parts, with a break between

| When | Session | Purpose |
|---|---|---|
| **12:00–12:30** | **Part 1 · Conceptualising** AI in research | shared frame |
| *12:30–13:15* | *Networking lunch* | *break* |
| **13:15–13:45** | **Part 2 · Practical** AI for research and teaching | group activity |

Part 1 gives us a common frame. Lunch is a proper break. Part 2 puts those ideas to work.

---

<!-- _class: lead invert -->

# Part 1 · Conceptualising the use of AI in research

<span class="subtitle">12:00–12:30 · why we are here, and the stance we will take</span>

---

## Our stance: critical judgement

- You are in the right room whether you use these tools daily or have never opened one.
- We are building judgement, not expertise in any one product.
- We will use the tools and interrogate their outputs, in research and teaching.
- Success is knowing what helped, what failed and where a person must remain responsible.

> You bring the expertise. The tool is fast and can sound certain, but its reliability depends on the task.

---

## A brief word with your neighbour

<div class="redbox center">

In one sentence each, recall the last time an AI tool either<br/>helped you or let you down, and which it was.

</div>

Take about a minute each, and there is no need to perform. 'I have not really used one' is a perfectly good answer.

<span class="small muted">Most of us already have a story, and it usually turns on a moment of friction.</span>

---

## The latest in a long line of tools

We have long extended ourselves with tools. Institutions that reward output keep making the next one attractive.

<div class="columns">
<div>

- mental arithmetic → the calculator
- pen and paper → the computer
- the ledger → the spreadsheet

</div>
<div>

- the typewriter → the word processor
- the library catalogue → the search engine
- rules-based software → systems that generate under uncertainty

</div>
</div>

> Its output can resemble considered judgement. That is precisely why it deserves more scrutiny than the tools before it.

---

## Getting started, with no expertise needed

A chat assistant takes a request and writes back. Behind it sits a **large language model**.

<div class="insight-grid">
<div class="insight-card">
<span class="eyebrow">Pick one free tool</span>
ChatGPT, Claude, Gemini or Copilot. Any of them will serve today, and there is nothing to install.
</div>
<div class="insight-card">
<span class="eyebrow">How to ask</span>
Say who you are, what you want and what a good answer would look like. Then push back on the reply.
</div>
<div class="insight-card">
<span class="eyebrow">A ready example</span>
Your group pack carries a scenario and a first move for each track, so nobody starts from a blank page.
</div>
</div>

> Mixed groups are a strength. Newcomers ask the questions that matter, and regular users show what is possible. No one is behind.

<span class="slide-source">Technical background: given the context, a model assigns probabilities to possible next tokens, then selects or samples one. A vast corpus gives breadth, and post-training can add granularity, though recipes vary and are rarely public. None of that makes an output verified, impartial or right for your context. Bender et al. (2021). Ouyang et al. (2022) describes one post-training approach.</span>

---

## Cognitive friction is a signal

When an output is glib, misses the point or smooths over an important distinction, that friction is information. It marks where your judgement matters.

- **Survey (n = 319).** Higher AI self-confidence was associated with less self-reported critical-thinking effort, while higher confidence in one's own expertise was associated with more (Lee et al., 2025). Correlation, self-report.
- **Small experiment (n = 24).** Brief prompts that challenge an output induced critical and metacognitive thinking in an AI-assisted shortlisting task (Drosos et al., 2025, preprint).

We treat friction as data to record, whether we are marking, writing or analysing.

<span class="slide-source">In an AI-assisted decision-making study, deliberate friction, a prompt that makes you pause and decide, reduced over-reliance where explanations alone did not (Buçinca et al., 2021).</span>

---

<!-- _class: tool-landscape -->

## The tool spectrum, from convenience to control

| Mode | Illustrative examples | What changes, and the control to keep |
|---|---|---|
| **Chat** | ChatGPT, Claude, Gemini, Copilot | You drive the conversation → **verify before reuse** |
| **Context-rich workspace** | Projects, custom assistants, connected files | Instructions and sources persist → **minimise data and sources** |
| **Coding / project agent** | Claude Code, Codex, GitHub Copilot coding agent | Reads or changes files and may run commands → **review diffs, tests and permissions** |
| **Delegated work** | ChatGPT Work | Pursues a bounded, multi-step outcome with approved tools → **scope access and review results** |
| **Persistent agent system** | Grok Bot (cloud), OpenClaw (self-hosted) | State, tools and possibly routines persist → **set approvals, logs and stop conditions** |
| **Built workflow** | APIs, retrieval and automation | You design the workflow and controls → **evaluate, monitor and assign ownership** |

> 'Agentic' is not a new kind of model. It is a system design that pairs a model with tools, state and a loop. More access raises the need for review and reversibility.

<span class="slide-source">Effort and setup cost rise as you move down, and so does the control you keep over what the tool does with your data. These modes overlap, and product capability varies by plan, tenant settings and permissions. [Product sources are in the repository's full bibliography.](https://github.com/pablobernabeu/genai-research-teaching/blob/main/docs/bibliography.md)</span>

---

<!-- _class: data-redlines -->

## Data-security red lines

<div class="redbox">

If you would not pin it to a public noticeboard in the building, do not put it into a free AI tool.

</div>

Use personal data only through an approved route. Do not disclose confidential material without explicit authority. Do not paste:

<div class="columns">
<div>

- Identifiable or re-identifiable information, including pseudonymised student, applicant, participant or staff data.
- Special-category data: health, ethnicity, beliefs, trade-union membership, sexuality, genetics or biometrics.

</div>
<div>

- Confidential or unpublished material: grant drafts, peer-review files or data under an NDA.
- Teaching records: marks, references, pastoral or SpLD notes, scripts and admissions data.

</div>
</div>

<div class="agent-boundary">
When systems can act, treat web pages, files and connected accounts as untrusted. Grant least privilege, and approve sending, publishing, record changes, spending and commands. Retain an approved audit trail and a way to stop it.
</div>

<span class="slide-source">Free tiers may reuse what you enter for model training, and privacy settings can change without notice. Sources: ICO, <em>Guidance on AI and data protection</em>; European Commission / ERA Forum (2026), <em>Living guidelines</em>. Full links: slide 32.</span>

---

## The ethical landscape

Different risks need different checks.

<div class="columns">
<div>

- **Accuracy**, plausible yet wrong
- **Bias**, arising from data, design and use
- **Provenance, attribution and IP**, whose material and whose licence?
- **Privacy and confidentiality**, what may enter and leave the system?

</div>
<div>

- **Security and control**, including tool access and hidden instructions in content
- **Equity**, who benefits and who is left out?
- **Environment**, costs that vary by model, task and scale
- **Accountability**, held by a named person or role

</div>
</div>

<span class="slide-source">In teaching, add assessment integrity, disclosure to students and equitable access. Frameworks: Russell Group, European Commission/ERA Forum, UNESCO and ICO.</span>

---

## Stepping back, the bigger questions

Beyond any single task, three larger shifts are worth carrying into Part 2.

- Thinking and writing. We often think through writing. If a tool drafts, where does that thinking go, and what might be lost?
- Fairness. AI might narrow gaps linked to language, support or career stage, and it might widen them. For whom, and why?
- Disclosure. What use of AI is material to disclose? Would fuller disclosure expose the inequities the tool helped to ease?

> There are no settled answers here. These are policy questions in the making. Notice them in your own task.

---

## Design human oversight

Generated material can inform a decision. A named person or role remains accountable for it.

Before you start a task, decide the following in advance.

1. Where must someone verify a claim, a number, a citation or a source?
2. Who signs off, against which standard, with time, evidence and authority to pause, override or escalate?
3. What will never be delegated: the final call on correctness, ethics, authorship or impact?
4. How is oversight arranged? Interwoven means a check at every step. Staged means a check at a few points between phases.

> Name the checkpoints before the system produces anything, not after a failure. This is human oversight in practice.

---

## What Part 2 asks of you

Take one task, use a tool and examine the output. You have fifteen minutes and three things to do.

1. **Use it.** Keep a tangible result: a critique, a template, a chart or a translation.
2. **Catch it out.** Note one or two moments where the tool was fluent and wrong, and keep the output as it appeared.
3. **Prepare one line** for the room, which you give in up to 45 seconds at 13:33.

> The spectrum guides the tool choice. The red lines govern what enters it. Caught errors reveal friction. A named checkpoint keeps oversight in place.

<span class="small muted">Your pack also holds a five-dimension rubric and a short reflection on the wider questions. Both support the debrief after the activity.</span>

---

## Form your groups

Move to the idea you would most like to try. Form a group of five, and the letter beside it is your track.

<div class="columns seed-list">
<div>

- Stress-test a study design **(A)**
- Critique an assessment or marking rubric **(A)**
- Turn messy notes into owned actions **(B)**
- Tame an email or admin backlog **(B)**
- Plan a module, project or paper **(B)**

</div>
<div>

- A one-page explainer of a finding **(C)**
- A quick visualisation or interactive teaching aid **(C)**
- A lay summary or press angle **(D)**
- Explain a hard concept for students **(D)**
- A social thread from a paper **(D)**

</div>
</div>

<span class="small muted">Note your group and track. You regroup after lunch without re-forming. A · Methodological Blind-Spot Detector, test a design. B · Accessible Executive-Function Layer, build a support layer. C · Rapid Prototyping, make an artefact. D · Public Engagement Translator, reach a public. Briefs are in your pack.</span>

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

<span class="small muted">If you have no device, or cannot connect, HackMD (hackmd.io) is the fallback, and your facilitator will point you there.</span>

</div>

</div>

---

## How Part 2 runs (30 minutes)

| When | Phase | Mins |
|---|---|---|
| <span class="clock">13:15</span> | **Settle in.** Re-find your group, agree your one problem (60 s), open the app (HackMD as fallback), keep red lines visible | 3 |
| <span class="clock">13:18</span> | **Apply it.** Run the tool on your problem, catch it out and settle on one line for the room | 15 |
| <span class="clock">13:26</span> | **Pivot.** Thirty seconds, keyboards down, then switch from building to interrogating | in&nbsp;the&nbsp;15 |
| <span class="clock">13:33</span> | **Lightning round.** Up to 45 seconds per group, on the limitation, the checkpoint you would require or how your field over- or under-uses AI | 7 |
| <span class="clock">13:40</span> | **Synthesis.** Drawing the threads together, with takeaways for research and teaching | 5 |

<span class="small muted">Only the fifteen minutes from 13:18 are yours. The rest belongs to the room, so protect that window.</span>

---

## Three jobs, shared in seconds

Fifteen minutes is a demanding window for this, so take prompt action, pun intended. Have something in the tool within two minutes, then improve it.

Five of you, one problem, one shared note. Divide the three jobs and start, combining them if your group is smaller.

1. One of you **drives the tool**.
2. One **guards the red lines**, using the check on your group sheet.
3. One **keeps the note** in the app and speaks for the group at 13:33.

> Everyone else questions the output. Pass the keyboard around.

<span class="small muted">The five-dimension rubric in your pack supports reflection afterwards. A sharp caught error tells you more than an unexamined 5.</span>

---

## Work on one problem

Use the agreed problem: your seed, a member's non-confidential task or a ready example.

1. **Use it** and keep a tangible result, such as a critique, a template, a chart or a translation.
2. **Catch it out.** Write down the fluent-but-wrong moments as they happen. They show what needs checking.
3. **Prepare one line** for the room: the limitation you found, the checkpoint you would require before use or how your field over- or under-uses AI here.

> If time runs short, write the line first. If time remains, map automated and person-led steps. Then decide whether oversight is interwoven (checks throughout) or staged (checks at set points), and reflect on how your field uses AI.

<span class="small muted">Those last three are optional extras.</span>

---

## Capturing your work in the app

There is no report to write. Use the app to capture the essentials.

1. The note-keeper opens genai-rt.web.app, names the group and enters the passcode. One device creates the group. Everyone else joins with its name and six-character code.
2. Record the problem, artefact, tool, caught errors and the line for the room. The app saves as you go.
3. Submit before the lightning round at 13:33 where possible. If you are still typing when the round begins, submit as soon as you have spoken.

<span class="small muted">If you have no device, or the app misbehaves, HackMD (hackmd.io) is the fallback for non-sensitive content only, with the same data boundaries and headings. A countdown on screen shows the time left, and the facilitator archives approved work afterwards.</span>

---

## The museum of caught errors

Keep a brief record of what went wrong and what it teaches you.

- A confident but fake citation · flattened nuance · a plausible but invalid method · a biased rewrite · a misgraded answer.
- For each, note what happened, how you caught it and what it signals about where humans must stay in charge.

> These entries often provide the most useful discussion material.

---

<!-- _class: go -->

## Fifteen minutes, starting now (13:18)

<div class="columns go-grid">
<div>

1. **Use it.** Run the tool on your one problem and keep something tangible.
2. **Catch it out.** Note where it was fluent and wrong.
3. **Settle on one line** for the room.

</div>
<div>

<div class="milestones">
<span class="clock">13:26</span><span>keyboards down for thirty seconds, then start interrogating</span>
<span class="clock">13:33</span><span>submit in the app, and the <span class="nowrap">note-keeper</span> speaks</span>
</div>

</div>
</div>

<div class="redbox center">

Keep within the red lines. Record the friction. Design the oversight.

</div>

<span class="small muted">Tracks are in your pack and in the app · the rubric is in your pack · help is circulating · genai-rt.web.app</span>

---

<!-- _class: invert fill -->

## Pivot, around 13:26

Thirty seconds, keyboards down, as a group.

- What has the tool made easier, and what does that cost?
- Where did it resist you, and what was that friction telling you?
- Have we held the data red lines?
- Switch now from building to interrogating. Settle on your one insight.

---

<!-- _class: lead invert -->

# Lightning round · 13:33

<span class="subtitle">One insight each · no slides · the note-keeper speaks · the facilitator calls the time</span>

What was the most significant limitation, the most important safeguard or one observation about how your field over- or under-uses AI?

---

<!-- _class: lead invert -->

# Close · 13:40

<span class="subtitle">Drawing the threads from the room, and what we take back to research and teaching</span>

---

<!-- _class: fill -->

## What we saw across the room

Threads worth drawing out from the lightning round.

- **Context matters.** A tool that helped on one task was a hazard on the next.
- **Friction as a signal.** A group's friction marked the point at which human judgement was needed.
- **A checkpoint named in advance.** The strongest safeguard a group built in.
- **Where a free tier drew a hard line.** On data, scale or accountability.

---

<!-- _class: synthesis -->

## Before / during / after

<div class="insight-grid">
<div class="insight-card">
<span class="eyebrow">Before</span>
Choose the mode, define the data boundary and name the accountable person or role.
</div>
<div class="insight-card">
<span class="eyebrow">During</span>
Test material claims against evidence or a disciplinary standard. Record where the tool resisted you, because that friction marks where your judgement is doing the work. Stop or escalate when a boundary is crossed.
</div>
<div class="insight-card">
<span class="eyebrow">After</span>
Record what mattered, disclose material use where required and decide what you would change next time, including who this helped and who it left out.
</div>
</div>

---

## Back at your desk

Choose one to try this week, in research or in teaching.

1. Write a two-line record for one AI-assisted task: what you used, what you checked and what you did not delegate.
2. Add one human checkpoint to a workflow you already use AI to assist.
3. Before pasting anything sensitive, work through the data check on your group sheet.
4. Keep your own museum of caught errors for a fortnight.

<span class="small muted">A short follow-up, with a responsible-use commitment, will reach you by email.</span>

---

<!-- _class: refs -->

## Sources for today's claims

<div class="columns">
<div>

- **Policy and practice**
  - [European Commission & ERA Forum (2026). *Living guidelines on the responsible use of generative AI in research* (3rd ed.).](https://research-and-innovation.ec.europa.eu/document/download/2b6cf7e5-36ac-41cb-aab5-0d32050143dc_en)
  - [Information Commissioner's Office. *Guidance on AI and data protection.*](https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/)
  - [Russell Group (2023). *Principles on the use of generative AI tools in education.*](https://russellgroup.ac.uk/media/6137/rg_ai_principles-final.pdf)
  - [UNESCO (2023). *Guidance for generative AI in education and research.*](https://doi.org/10.54675/EWZM9535)

</div>
<div>

- **Research and technical foundations**
  - [Lee et al. (2025). *The impact of generative AI on critical thinking.* CHI '25.](https://doi.org/10.1145/3706598.3713778)
  - [Drosos et al. (2025). *“It makes you think”* [preprint].](https://arxiv.org/abs/2501.17247)
  - [Ouyang et al. (2022). *Training language models to follow instructions with human feedback.* NeurIPS.](https://proceedings.neurips.cc/paper_files/paper/2022/hash/b1efde53be364a73914f58805a001731-Abstract.html)
  - [Buçinca, Malaya & Gajos (2021). *To trust or to think.*](https://doi.org/10.1145/3449287)
  - [Bender et al. (2021). *On the dangers of stochastic parrots.* FAccT.](https://doi.org/10.1145/3442188.3445922)

</div>
</div>

<span class="small muted">Full bibliography, including official documentation for the product examples, is in the repository ([github.com/pablobernabeu/genai-research-teaching](https://github.com/pablobernabeu/genai-research-teaching)), under docs/bibliography.md.</span>

---

## Thank you

<div class="qr-row qr-close">

<div class="qr">
<svg viewBox="0 0 41 41" shape-rendering="crispEdges" role="img" aria-label="QR code linking to the workshop repository at github.com/pablobernabeu/genai-research-teaching" xmlns="http://www.w3.org/2000/svg"><path fill="#ffffff" d="M0 0h41v41H0z"/><path stroke="#000000" d="M4 4.5h7m1 0h2m1 0h1m1 0h1m2 0h6m1 0h1m2 0h7M4 5.5h1m5 0h1m1 0h3m1 0h2m2 0h2m3 0h1m1 0h2m1 0h1m5 0h1M4 6.5h1m1 0h3m1 0h1m2 0h3m4 0h1m2 0h1m2 0h1m1 0h1m1 0h1m1 0h3m1 0h1M4 7.5h1m1 0h3m1 0h1m1 0h2m4 0h4m4 0h1m3 0h1m1 0h3m1 0h1M4 8.5h1m1 0h3m1 0h1m2 0h2m3 0h1m2 0h1m1 0h1m4 0h1m1 0h1m1 0h3m1 0h1M4 9.5h1m5 0h1m2 0h2m1 0h1m4 0h1m1 0h4m1 0h1m1 0h1m5 0h1M4 10.5h7m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h1m1 0h7M12 11.5h1m5 0h1m2 0h1m1 0h2m2 0h1M4 12.5h1m1 0h2m1 0h3m1 0h1m1 0h2m1 0h1m1 0h4m1 0h2m1 0h1m1 0h1m2 0h1m1 0h2M4 13.5h1m2 0h3m1 0h3m1 0h2m3 0h6m1 0h1m2 0h2m1 0h2m1 0h1M5 14.5h3m1 0h2m1 0h2m4 0h1m2 0h1m2 0h2m1 0h1m1 0h1m1 0h3m1 0h2M4 15.5h3m4 0h1m1 0h1m1 0h5m2 0h2m7 0h1m1 0h1m2 0h1M4 16.5h1m2 0h1m2 0h1m4 0h1m5 0h1m4 0h4m1 0h3m1 0h2M5 17.5h1m3 0h1m1 0h2m1 0h1m5 0h1m2 0h1m1 0h1m2 0h2m5 0h1M4 18.5h2m1 0h2m1 0h1m1 0h1m1 0h4m1 0h2m1 0h4m2 0h1m1 0h5M5 19.5h2m2 0h1m2 0h2m1 0h1m1 0h2m1 0h1m1 0h1m2 0h1m3 0h6M5 20.5h1m1 0h1m1 0h2m1 0h3m3 0h2m2 0h1m2 0h3m1 0h2m1 0h3M5 21.5h2m1 0h1m3 0h1m1 0h3m1 0h2m1 0h1m2 0h7m1 0h2m1 0h2M5 22.5h2m1 0h3m1 0h3m2 0h3m1 0h1m2 0h2m2 0h1m2 0h2m1 0h1M4 23.5h3m1 0h1m2 0h2m2 0h2m2 0h1m1 0h1m1 0h1m3 0h2m3 0h1m2 0h2M5 24.5h2m3 0h1m1 0h2m2 0h1m4 0h2m2 0h2m6 0h2M4 25.5h2m2 0h2m1 0h1m3 0h1m2 0h2m1 0h5m1 0h1m2 0h1m2 0h2m1 0h1M6 26.5h1m1 0h1m1 0h1m2 0h1m4 0h1m1 0h1m1 0h1m2 0h1m1 0h5m3 0h2M5 27.5h2m6 0h1m1 0h1m1 0h2m1 0h1m1 0h3m2 0h1m2 0h1m1 0h2m1 0h1M4 28.5h1m1 0h2m2 0h3m2 0h2m1 0h4m4 0h1m1 0h5m3 0h1M12 29.5h2m3 0h1m1 0h3m1 0h3m2 0h1m3 0h2m1 0h1M4 30.5h7m1 0h1m3 0h3m2 0h4m2 0h2m1 0h1m1 0h1M4 31.5h1m5 0h1m1 0h1m3 0h5m3 0h5m3 0h4M4 32.5h1m1 0h3m1 0h1m4 0h2m4 0h1m1 0h10m1 0h3M4 33.5h1m1 0h3m1 0h1m1 0h5m1 0h1m5 0h2m1 0h1m3 0h1m1 0h2m1 0h1M4 34.5h1m1 0h3m1 0h1m1 0h2m2 0h1m1 0h1m2 0h2m3 0h1m3 0h2M4 35.5h1m5 0h1m3 0h2m1 0h5m4 0h1m1 0h5m3 0h1M4 36.5h7m1 0h3m4 0h5m1 0h1m1 0h1m4 0h1m1 0h1"/></svg>
</div>

<div class="qr-text">

<span class="bigurl">github.com/pablobernabeu/genai-research-teaching</span>

Groups that opt in have their notes published here after review, alongside the slides and the full reading list.

Questions and follow-ups go in the repository's Discussions tab, so that answers reach everyone.

</div>

</div>

<span class="subtitle">Generated language can be fluent and persuasive. You decide what counts as sufficient evidence, what can be shared and where responsibility remains.</span>

---

<!-- _class: brand -->

## Disclaimer

- These materials and tool references are the facilitator's own selection, made in a personal capacity. They do not represent the position of the University of Oxford, the facilitator's employer, or the University of Westminster.
- The University of Oxford accepts no liability for the selection, use or outcome of a third-party tool.
- Participants remain responsible for their own institutional policy, the UK GDPR and research ethics.

<span class="small redline">This wording is a template and is not legal advice.</span>
