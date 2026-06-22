# Evaluation rubric & note template

This is the group's workbench for the day. By default you fill it in the **workshop app**
(genai-rt.web.app) — it has these fields built in, so there is nothing to set up beyond the
passcode. The **HackMD** steps below are the **fallback** if you cannot use the app. Either
way it does two jobs:

1. **Hold your shared note** — in the app (default) or HackMD (fallback); no prior experience
   needed, nothing to install.
2. **Structure your thinking** around five dimensions, each scored **1–5**
   (**1 = Nascent · 3 = Developing · 5 = Robust**), plus a deliverable link, a
   museum of caught errors and your lightning-round insight.

You are not graded. The rubric is a **thinking tool and a shared record** — and,
once archived, part of the open account of what this cohort learned.

> **Short-format note.** Part 2's applied session is about 15 minutes. Get the **core three**
> first — the problem and the tool, **one caught error**, and **one insight** for the lightning
> round. If you have about five minutes left, add the **automation–steering map** (interwoven or
> staged) and the societal reflection. A thoughtful partial note beats a rushed full one.

---

## A. The HackMD fallback (≈ 2 minutes, Reporter drives — only if you cannot use the app)

1. Go to **hackmd.io** and sign in — it is **free**, and you can use a Google,
   GitHub or email login. There is **nothing to install**.
2. Click **“+ New note”**. The left pane is Markdown; the right pane shows a live
   preview. You can ignore the formatting and just type into the headings.
3. **Copy the whole template** in section B below (everything inside the box) and
   **paste it into the note**.
4. **Fill it in as you work**, not all at the end. Rough notes are fine.
5. **Make it link-shareable:** open the note's sharing/permissions control and set
   it so **anyone with the link can read** (you do *not* need to grant editing).
6. **Copy the note's link.**
7. **During Part 2 (by 13:45)**, share that link with the **facilitator** — show the
   note on screen with your **group number** and **track**. You do *not* need a GitHub
   account; the facilitator gathers every group's link.

> **If HackMD will not let you sign up** (some logins are restricted), do not lose
> time: write the same template in any shared document or on paper. It is plain
> Markdown and the facilitator can transcribe one note into the archive afterwards.

The facilitator exports every note to Markdown after the session and commits it
under `submissions/`, so your work is preserved exactly.

---

## B. The note template — the app has these fields built in; paste this box into HackMD on the fallback

```markdown
# [Group NN] · Track [A / B / C / D] · 24 June 2026

**Members & roles:** Convenor — … · Reporter — … · Driver — … · Sceptic — … · Steward — …
**The real problem we brought:** …

## 1. Project Definition
- The real problem, in one sentence a colleague would recognise: …
- Success criterion — how we would know the tool actually helped: …

## 2. Technology Stack
- Tool(s) used, and where they sit on the spectrum (off-the-shelf / no-code / IDE–API): …
- Why this level and not one up or down (control vs data exposure vs effort): …

## 3. Data Security & Ethics
- What we put into the tool, and how we de-identified it: …
- Red lines we held; UK GDPR, ethics, disclosure of AI use, IP, consent and fairness: …

## 4. Financial & Scalability Constraints
- Free-tier limits we hit or foresee: …
- What breaks first at scale — cost, usage limits or trust: …

## 5. Human-in-the-Loop Protocol
- **Automation–steering map** — break the project into its phases; for each, note what is *automated* (the tool does) and what is *human-steered* (we decide, verify or override):

| Phase | Automated (AI does) | Human steering (we decide / verify / override) |
|---|---|---|
| … | … | … |

- **Interwoven or staged?** Is our oversight **interwoven** (continuous — a human in the loop at every step) or **staged** (concentrated at distinct checkpoints between phases)? Which did we choose, and why?
- What our choice costs, and how we offset it. (Interwoven oversight is thorough but heavy, and checking every step can dull attention until you wave things through out of habit; staged oversight is lighter, but errors can pile up unnoticed in the stretches between checkpoints.): …
- Checkpoints we set *in advance*: …
- What we will never delegate to the tool: …
- Who is accountable for the final judgement: …

## Deliverable
- Link or screenshot of the artefact we made: …

## Museum of caught errors
| What happened | How we caught it | What it signals about where humans must stay |
|---|---|---|
| … | … | … |

## Societal reflection (complete when you tidy & share the note — no score, just think)
- Thinking vs writing — if the tool did the writing, what thinking did we still have to do, and what might we lose by offloading it? …
- Fairness — could this widen or narrow disparities (first vs second language, more vs less support, career stage, socioeconomic background)? Who gains, who is left behind? …
- Disclosure — would we disclose using AI here? Would we, or should we, disclose the conditions it offset (e.g. writing in a second language, limited support)? Why or why not? …
- Disciplinary norms — is our field generally **under-** or **over-using** GenAI for this kind of task? Why, with what consequences, and how would we redress it over the next two years? …

## Lightning-round insight — 45 seconds, no slides
> Pick the sharpest of: the single most significant **limitation** we found; the most
> important **human-in-the-loop safeguard** we built in; or one honest thing this exposed
> about how our **field** is over- or under-using AI for this task:
>
> …

## Self-assessment — complete when you tidy & share the note (1 = Nascent · 3 = Developing · 5 = Robust)
| Dimension | Score (1–5) | One-line justification |
|---|---|---|
| Project Definition | | |
| Technology Stack | | |
| Data Security & Ethics | | |
| Financial & Scalability | | |
| Human-in-the-Loop | | |
```

---

## C. The rubric anchors

Use these to place yourselves honestly. Most groups will sit around **3** on most
dimensions in a short applied session — that is exactly right. A thoughtful **3** with a sharp
caught error beats an unexamined **5**.

### 1 · Project Definition
*Is the real problem and its success criterion clear?*

- **1 — Nascent:** The task is vague or a toy ("use AI on something"); no success
  criterion.
- **3 — Developing:** A real problem is named and there is a rough sense of what
  "better" would look like; scope may be broad.
- **5 — Robust:** A specific, bounded, genuinely-held problem a colleague would
  recognise, with an explicit success criterion you could actually test.

### 2 · Technology Stack
*Right tool on the spectrum, and why?*

- **1 — Nascent:** One tool used by default; no awareness of alternatives or of the
  spectrum.
- **3 — Developing:** The choice is explained, with some sense of where it sits and
  what moving a level up or down would change.
- **5 — Robust:** Deliberate placement on the spectrum, with a reasoned trade-off of
  control, data exposure and effort, and alternatives weighed.

### 3 · Data Security & Ethics
*Red lines held; UK GDPR, ethics and fairness addressed?*

- **1 — Nascent:** Personal, special-category or confidential data used without
  thought; no disclosure, consent or fairness consideration.
- **3 — Developing:** Red lines mostly respected and data de-identified; some
  ethical reflection on disclosure, IP, bias or fairness.
- **5 — Robust:** Red lines explicitly held; anonymisation or lawful basis reasoned;
  disclosure, IP, consent, bias and fairness addressed; the note would withstand
  being public.

### 4 · Financial & Scalability Constraints
*Does the free tier hold; what breaks at scale?*

- **1 — Nascent:** No thought to cost or scale; assumes free forever.
- **3 — Developing:** Free-tier limits noted, with a rough sense of what scaling
  would cost or require.
- **5 — Robust:** Clear-eyed on free-tier viability, lock-in and the precise point at
  which data, cost or trust breaks the approach.

### 5 · Human-in-the-Loop Protocol
*Explicit checkpoints, verification, accountability — and a deliberate map of
automation against human steering?*

- **1 — Nascent:** Output trusted as-is; no checkpoint; no named accountability; no
  sense of where automation ends and human steering begins.
- **3 — Developing:** Some verification done; one or two checkpoints identified; an
  implicit split between the automated and human-steered steps.
- **5 — Robust:** A deliberate automation–steering map; oversight consciously chosen
  as interwoven or staged, with the weakness of that choice offset; what is never
  delegated is explicit; a named person owns the final judgement on correctness,
  ethics and attribution.

---

## Disclaimer

These materials and the tools they reference are the facilitator's own choices,
made in a personal capacity. They do not represent the views or official position of the University of Oxford — the facilitator's employer — or of the host, the University of Westminster. The University of Oxford accepts no liability for the selection, use or outcomes of any third-party tool. Participants
remain solely responsible for compliance with their own institutional policy, the UK GDPR
and research ethics.

*This wording is a template and is not legal advice.*
