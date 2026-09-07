---
marp: true
theme: workshop
paginate: true
transition: slide
title: "Generative AI in research and teaching: a practical, critical workshop"
author: "Pablo Bernabeu"
description: "A two-part featured workshop (30 + 30 minutes, split by lunch) on the responsible and effective use of generative AI in research and teaching."
keywords: "generative AI, research, teaching, responsible use, human-in-the-loop, data protection"
---

<!-- _class: lead brand -->
<!-- _paginate: false -->
<!-- _footer: "A personal selection in the facilitator's own capacity, which is not the position of Oxford or the host and is not legal advice." -->

# Generative AI in research and teaching

### A practical and critical workshop, in two parts

<span class="subtitle">Part 1 · Conceptualising the use of AI in research (12:00)<br/>Part 2 · Practical AI for research and teaching (13:15)<br/><br/>Hosted at the University of Westminster · 9 September 2026<br/><br/>Dr Pablo Bernabeu<br/>Postdoctoral Researcher, Department of Education, and AI Ambassador, University of Oxford<br/>Fellow of the Software Sustainability Institute</span>

---

## Before we begin

These materials and the tools they reference are the facilitator's own choices, made in a personal capacity. They do not represent the views or official position of the University of Oxford, the facilitator's employer, or of the host, the University of Westminster.

The University of Oxford accepts no liability for the selection, use or outcomes of any third-party tool. You remain solely responsible for compliance with your own institutional policy, the UK GDPR and research ethics.

<span class="small redline">This wording is a template and is not legal advice.</span>

---

## Two parts, with a break between

| When | Session | |
|---|---|---|
| **12:00–12:30** | **Part 1 · Conceptualising** the use of AI in research | the ideas |
| *12:30–13:15* | *Networking lunch* | *a break* |
| **13:15–13:45** | **Part 2 · Practical** AI for research and teaching | applied session |

Part 1 gives us a common frame. Lunch is a proper break. Part 2 puts those ideas to work.

---

<!-- _class: lead invert -->

# Part 1 · Conceptualising the use of AI in research

<span class="subtitle">12:00–12:30 · why we are here, and the stance we will take</span>

---

## Our stance: critical judgement

- Whatever your level of confidence, whether you have never tried one or use them daily, you are in the right room.
- The aim is a deeper understanding of the technology, with no technical instruction on any one tool.
- This is a session about judgement. We use these tools and we interrogate them, in research and in teaching.
- Success means a clear account of what helped, what failed and where a human must stay in charge.

> You bring the expertise. The tool is fast and can sound certain, but its reliability depends on the task. The aim is to leave able to decide when to use it and when to leave it aside.

---

## A brief word with your neighbour

<div class="redbox center">

In one sentence each, recall the last time an AI tool either<br/>helped you or let you down, and which it was.

</div>

Take about a minute each, and there is no need to perform. 'I have not really used one' is a perfectly good answer.

<span class="small muted">Most of us already have a story, and it usually turns on a moment of friction.</span>

---

## The latest in a long line of tools

Humans have always extended themselves with tools, and a labour economy that rewards productivity keeps moving us on to the next one.

<div class="columns">
<div>

- mental arithmetic → the calculator
- pen and paper → the computer
- the ledger → the spreadsheet

</div>
<div>

- the typewriter → the word processor
- the library catalogue → the search engine
- deterministic software → generative AI

</div>
</div>

> This is the first entry on the list whose output can pass for judgement, so it earns more scrutiny than the last one did.

---

## Getting started, with no expertise needed

A generative AI tool works much like a chat assistant. You type a request and it writes back. That is essentially the whole interface.

- Choose one free tool today, such as ChatGPT, Claude, Gemini or Copilot. Any of them will serve.
- A useful request states who you are, what you want and what a good answer would look like. You then push back on the reply.
- A ready example for each track is in your group reference pack.

> Mixed groups are a strength. Newcomers ask the questions that matter, and regular users show what is possible. No one is behind.

---

## Cognitive friction is a signal

When a tool resists your intent by giving a glib answer, missing the point or smoothing over a hard distinction, that friction is information. It marks where your judgement matters.

- In a survey of knowledge workers, those with more confidence in the AI reported less critical-thinking effort, while those with more confidence in their own expertise reported more (Lee et al., 2025). Self-reported, and correlational.
- Deliberately reintroducing friction, through prompts that question the output, can restore critical and metacognitive engagement (Drosos et al., 2025).

We treat friction as data to record, whether we are marking, writing or analysing.

<span class="small muted">Deliberate friction, the 'cognitive forcing functions' that make you pause and decide, measurably cuts over-reliance on AI where explanations alone do not (Buçinca et al., 2021; link in the close).</span>

---

## The tool spectrum, from convenience to control

| Level | Examples (free tiers) | You trade… |
|---|---|---|
| Off-the-shelf chat | ChatGPT, Claude, Gemini, Copilot | convenient · least control · data leaves your hands |
| No-code / low-code | Claude Projects, Gemini Gems, saved reusable prompts | some setup · repeatable · clearer guardrails |
| IDE / API level | Colab, Gradio/Streamlit, VS Code + assistant, AI Studio API key | steepest · most control · most responsibility |

Effort and setup cost rise as you move down the table, and so does the control you keep over what the tool does with your data.

<span class="small muted">No-code means setting things up by clicking and prompting, without writing code. Working at the IDE or API level means using a code editor or calling the model programmatically, with more control and more responsibility.</span>

---

## Data-security red lines

<div class="redbox">

Red line. If you would not pin it to a public noticeboard, do not paste it into a free consumer AI tool.

</div>

Personal data needs a lawful basis and a cleared tool. Confidential material is not yours to release at all. Do not paste:

- Personal data of identifiable people, such as students, applicants, participants or staff (UK GDPR).
- Special-category data, such as health, ethnicity, political or religious beliefs, trade union membership, sexuality, genetics or biometrics.
- Confidential or unpublished material, such as grant drafts, peer-review files or data under an NDA.
- In teaching, also marks, references, pastoral notes, SpLD records, exam scripts and admissions data.

<span class="small muted">Free tiers may train on your inputs, so assume nothing is private. When in doubt, anonymise, synthesise or abstain.</span>

---

## The ethical landscape

These risks are distinct, and they pull in different directions.

<div class="columns">
<div>

- **Accuracy**, fluent and confident yet wrong
- **Bias**, inherited from training data
- **Transparency**, when must use be disclosed?
- **Attribution and IP**, whose words and whose licence?

</div>
<div>

- **Equity**, who benefits and who is left out?
- **Environment**, an energy cost that scales with use
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
- Disclosure. We ask people to disclose their use of AI. Should we also disclose what it offset for us, such as writing in a second language or having little support, or would that expose the very inequities it eased?

> There are no settled answers here. These are policy questions in the making. Notice them in your own task.

---

## The human-in-the-loop principle

The tool can propose, but a human remains accountable.

Before you start a task, decide the following in advance.

1. Where must a human verify a claim, a number or a citation?
2. Who signs off, and against what standard?
3. What will you never delegate, such as the final call on correctness, ethics or authorship?
4. How is oversight arranged? Interwoven means a human checks at every step. Staged means a human checks at a few points between phases.

> A good workflow names its checkpoints before it trusts the output, not after something has broken.

---

## What Part 2 asks of you

Take one task, use a tool on it and examine what comes back. Part 1 gave you the frame.
The applied session is where you use it. Your group has fifteen minutes and three things
to do.

1. **Use it.** Keep a tangible result: a critique, a template, a chart or a translation.
2. **Catch it out.** One or two moments where the tool was fluent and wrong.
3. **Prepare one line** for the room, which you give in up to 45 seconds at 13:33.

> These three tasks apply the earlier ideas. The spectrum guides the tool choice and the
> red lines govern what goes into it. Caught errors reveal friction. A named checkpoint
> keeps a human in the loop.

<span class="small muted">Your pack also holds a five-dimension rubric and a short reflection on the wider questions. Both support the debrief after the activity.</span>

---

## Form your groups now

Move to the idea you would most like to try, and make a group of five with the people there. The letter beside it is your track.

<div class="columns">
<div>

- Stress-test a study design (A)
- Critique an assessment or rubric (A)
- Turn messy notes into clear actions (B)
- Triage an email or admin backlog (B)
- Plan a module, project or paper (B)

</div>
<div>

- A one-page explainer of a finding (C)
- A quick visualisation or teaching aid (C)
- A lay summary or press angle (D)
- Explain a concept for students (D)
- A social thread from a paper (D)

</div>
</div>

<span class="small muted">Note who is in your group and which track you chose. You regroup straight after lunch, without re-forming.</span>

<span class="small muted">A · Methodological Blind-Spot Detector, test a design and verify the critique. B · Executive-Function Layer, build a reusable aid for planning or triage. C · Rapid Prototyping, make a small artefact, then check it. D · Public Engagement, translate a finding, then audit it for fidelity. Fuller briefs are in your group reference pack, with one-line summaries in the app. Take one problem into Part 2: the seed or a member's non-confidential task.</span>

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

---

## How Part 2 runs (30 minutes)

| When | Phase | Mins |
|---|---|---|
| <span class="clock">13:15</span> | **Settle in.** Re-find your group, agree your one problem (60 s), open the app (HackMD as fallback), red lines on | 3 |
| <span class="clock">13:18</span> | **Apply it.** Run the tool on your problem, catch it out and settle on one line for the room | 15 |
| <span class="clock">13:33</span> | **Lightning round.** Up to 45 seconds per group, on the limitation, the safeguard or how your field over- or under-uses AI | 7 |
| <span class="clock">13:40</span> | **Synthesis.** Drawing the threads together, with takeaways for research and teaching | 5 |

---

## Three jobs, shared in seconds

Five of you, one problem, one shared note. Divide three jobs and start.

1. One of you **drives the tool**.
2. One **guards the red lines**, using the check on your group sheet.
3. One **keeps the note** in the app and speaks for the group at 13:33.

> The rest of the group should question the output. Pass the keyboard around freely.

<span class="small muted">The five-dimension rubric in your pack supports reflection afterwards. A sharp caught error tells you more than an unexamined 5.</span>

---

## Work on one problem

Use the problem your group agreed: the seed you formed around, a member's non-confidential task or the ready example for your track.

1. **Use it** and keep a tangible result, such as a critique, a template, a chart or a translation.
2. **Catch it out.** Write down the fluent-but-wrong moments as they happen. They show what needs checking.
3. **Prepare one line** for the room: the limitation you found, the checkpoint you would require before use or how your field over- or under-uses AI here.

> If time runs short, write that line before anything else. If time is left, map which steps the tool ran and where you steered. Then decide whether oversight is interwoven or staged, and reflect on how your field uses AI.

<span class="small muted">Those last three are optional extras.</span>

---

## Capturing your work in the app

There is no GitHub to touch and no report to write. Use the app to capture the essentials.

1. The note-keeper opens genai-rt.web.app, names the group and enters the session passcode. One device creates the group, then reads out the group name and six-character code. The others use both to join. There is no account and nothing to install.
2. Fill in the problem, the artefact and which tool made it, the errors you caught and your line for the room. The app saves as you go.
3. Submit for review as soon as that line is written, and by 13:33 at the latest. If you are still typing when the round starts, submit as soon as you have spoken.

<span class="small muted">No device, or the app misbehaving? HackMD (hackmd.io) is the fallback, with the same headings. A countdown on screen shows the time left, and the facilitator archives the approved work afterwards.</span>

---

## The museum of caught errors

Keep a short record of the moments the tool went wrong and what each one taught you.

- A confident but fake citation · a flattened nuance · a plausible but invalid method · a biased rewrite · a misgraded answer.
- For each, note what happened, how you caught it and what it signals about where humans must stay in charge.

> These entries often provide the most useful discussion material.

---

<!-- _class: lead -->

## Fifteen minutes, starting now (13:18)

<span class="subtitle">Tracks are in your pack and in the app · the rubric is in your pack · help is circulating</span>

Hold the red lines, record the friction, keep a human in the loop.

---

<!-- _class: invert -->

## ⏱ Pivot, around 13:26

Thirty seconds, keyboards down, as a group.

- What has the tool made easier, and what does that cost?
- Where did it resist you, and what was that friction telling you?
- Have we held the data red lines?
- Switch now from building to interrogating. Settle on your one insight.

---

<!-- _class: lead invert -->

# Lightning round · 13:33

<span class="subtitle">One insight each · no slides · the note-keeper speaks · the facilitator calls the time</span>

What was the most significant limitation, the most important human-in-the-loop safeguard or one observation about how your field over- or under-uses AI?

---

<!-- _class: lead invert -->

# Close · 13:40

<span class="subtitle">Drawing the threads from the room, and what we take back to research and teaching</span>

---

## What we saw across the room

Threads worth drawing out from the lightning round:

- **Context matters.** A tool that helped on one task was a hazard on the next.
- **Friction as a signal.** A group's friction marked the point at which human judgement was needed.
- **A checkpoint named in advance.** The strongest safeguard a group built in.
- **Where a free tier drew a hard line.** On data, scale or accountability.

---

## The through-line

> Use the tool where it earns its place. Keep the human where judgement is owed.

- Treat fluency as a reason to check.
- Build the checkpoint before you trust the output.
- Record the friction. It maps where you matter.
- Disclose use, respect data and keep accountability with a named person.
- Ask the bigger questions of who is helped, who is left out and what we owe to disclose.

---

## Back at your desk

Choose one to try this week, in research or in teaching.

1. Write a two-line note on your AI use for one task, recording what you used, what you checked and what you did not delegate.
2. Add one human checkpoint to a workflow you already assist with AI.
3. Before pasting anything sensitive, work through the data check on your group sheet.
4. Keep your own museum of caught errors for a fortnight.

<span class="small muted">A short follow-up, with a responsible-use commitment, will reach you by email.</span>

---

<!-- _class: refs -->

## Further reading

<div class="columns">
<div>

- **Russell Group (2023).** Principles on generative AI in education. russellgroup.ac.uk
- **EC / ERA Forum (2026, third version).** Living guidelines on the responsible use of generative AI in research.
- **UNESCO (2023).** Guidance for generative AI in education and research (Miao & Holmes).
- **ICO.** Guidance on AI and data protection (UK GDPR). ico.org.uk
- **Lee et al. (2025, CHI).** The impact of generative AI on critical thinking, a survey of knowledge workers. <span class="doi">[doi.org/10.1145/3706598.3713778](https://doi.org/10.1145/3706598.3713778)</span>

</div>
<div>

- **Drosos et al. (2025).** 'It makes you think': provocations help restore thinking. <span class="doi">[arXiv:2501.17247](https://arxiv.org/abs/2501.17247)</span>
- **Buçinca et al. (2021, CSCW).** Cognitive forcing functions reduce over-reliance on AI. <span class="doi">[doi.org/10.1145/3449287](https://doi.org/10.1145/3449287)</span>
- **Bender et al. (2021, FAccT).** On the dangers of stochastic parrots, fluent remixing without understanding. <span class="doi">[doi.org/10.1145/3442188.3445922](https://doi.org/10.1145/3442188.3445922)</span>
- **Karpathy (2025).** *Software is changing (again)*, the human on the 'autonomy slider' [talk].
- **Mollick (2023).** *Centaurs and cyborgs*, the human stays the architect [essay].

</div>
</div>

<span class="small muted">Full citations, with links, are in the repository (github.com/pablobernabeu/genai-research-teaching).</span>

---

<!-- _class: lead -->

## Thank you

The notes of groups that opt in become an open, reproducible archive at github.com/pablobernabeu/genai-research-teaching

Questions and follow-ups go in the repository's Discussions tab (github.com/pablobernabeu/genai-research-teaching/discussions), so that answers help everyone.

<span class="subtitle">The tool is fast and confident. You are the one who is accountable, and who decides when its fluency has earned your trust. Bring both to the work.</span>

---

<!-- _class: brand -->

## Disclaimer

These materials and the tools they reference are the facilitator's own choices, made in a personal capacity, and do not represent the views or official position of the University of Oxford, the facilitator's employer, or of the host, the University of Westminster. The University of Oxford accepts no liability for the selection, use or outcomes of any third-party tool. Participants remain solely responsible for compliance with their own institutional policy, the UK GDPR and research ethics.

<span class="small redline">This wording is a template and is not legal advice.</span>
