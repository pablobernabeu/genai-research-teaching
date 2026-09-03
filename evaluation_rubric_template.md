# Evaluation rubric and note template

This is the group's workbench for the day. By default, you capture your work in the
workshop app (genai-rt.web.app). Its short form covers the essentials: the problem, the
artefact, the errors you caught, the automation–steering map, the oversight model, your
insight and a field reflection. Nothing needs setting up beyond the passcode. The
fuller template below adds the five rubric dimensions, each scored from 1 to 5
(1 Nascent, 3 Developing, 5 Robust), a deliverable link, the museum table and the
societal reflection. It is the note for the HackMD or paper fallback, and for a group
that wants to record its scores and reflection after submitting in the app.

You are not graded. The rubric is a thinking tool and a shared record, and, once
archived, part of the open account of what this cohort learned.

> A note on the short format. The build window in Part 2 is about 15 minutes. Get the
> core three first: the artefact (your tool run on your problem), one caught error and
> one insight for the lightning round. If you have about five minutes left, add the
> automation–steering map and say whether your oversight was interwoven or staged. The
> rubric scores and the societal reflection come later, when you tidy the note. A
> thoughtful partial note is worth more than a rushed full one.

---

## A. The HackMD fallback (about five minutes, Reporter drives, only if you cannot use the app)

1. Go to hackmd.io and sign in. It is free, and you can use a Google, GitHub or email
   login. There is nothing to install.
2. Click '+ New note'. The left pane is Markdown and the right pane shows a live
   preview. You can ignore the formatting and type straight into the headings.
3. Copy the whole template in section B below (everything inside the box) and paste
   it into the note.
4. Fill it in as you work, and avoid leaving it all to the end. Rough notes are fine.
5. Make it link-shareable: open the note's sharing or permissions control and set it
   so that anyone with the link can read (you do not need to grant editing).
6. Copy the note's link.
7. Share that link with the facilitator before the lightning round at 13:33 where you
   can, and by 13:45 at the latest. Show the note on screen with your group number and
   track. You do not need a GitHub account, because the facilitator gathers every
   group's link.

> If HackMD will not let you sign up (some logins are restricted), do not lose time
> troubleshooting: switch to paper at once. Write the same template in any shared
> document or on paper. It is plain Markdown,
> and the facilitator can transcribe one note into the archive afterwards.

After the session, the facilitator exports every note whose group opted in to sharing,
removes anything that should not be public, and commits it under `submissions/`.

---

## B. The note template (paste this box into HackMD or copy it on paper; the app has its own shorter form)

```markdown
# [Group NN] · Track [A / B / C / D] · 9 September 2026

Roles taken (no names needed): Convenor · Reporter · Driver · Sceptic · Steward
The real problem we brought: …
Share publicly? yes / no (yes means the group is content for this note, which should name no one, to enter the public archive)

## 1. Project Definition
- The real problem, in one sentence a colleague would recognise: …
- Success criterion (how we would know the tool actually helped): …

## 2. Technology Stack
- Tool(s) used, and where they sit on the spectrum (off-the-shelf / no-code / IDE–API): …
- Why this level and not one up or down (control, data exposure, effort): …

## 3. Data Security & Ethics
- What we put into the tool, and how we de-identified it: …
- Red lines we held; UK GDPR, ethics, disclosure of AI use, IP, consent and fairness: …

## 4. Financial & Scalability Constraints
- Free-tier limits we hit or foresee: …
- What breaks first at scale (cost, usage limits or trust): …

## 5. Human-in-the-Loop Protocol
- Automation–steering map. Break the project into its phases; for each, note what is automated (the tool does it) and what is human-steered (we decide, verify or override):

| Phase | Automated (AI does) | Human steering (we decide / verify / override) |
|---|---|---|
| … | … | … |

- Interwoven or staged? Is our oversight interwoven (continuous, with a human in the loop at every step) or staged (concentrated at distinct checkpoints between phases)? Which did we choose, and why?
- What our choice costs, and how we offset it. (Interwoven oversight is thorough but heavy, and checking every step can dull attention until things are waved through out of habit; staged oversight is lighter, but errors can accumulate unnoticed between checkpoints.): …
- Checkpoints we set in advance: …
- What we will never delegate to the tool: …
- Who is accountable for the final judgement: …

## Deliverable
- Link or screenshot of the artefact we made: …

## Museum of caught errors
| What happened | How we caught it | What it signals about where humans must stay |
|---|---|---|
| … | … | … |

## Societal reflection (complete when you tidy and share the note; no score, just think)
- Thinking versus writing: if the tool did the writing, what thinking did we still have to do, and what might we lose by offloading it? …
- Fairness: could this widen or narrow disparities (first versus second language, more versus less support, career stage, socioeconomic background)? Who gains, and who is left behind? …
- Disclosure: would we disclose using AI here? Would we, or should we, disclose the conditions it offset (for example, writing in a second language or limited support)? Why or why not? …
- Disciplinary norms: is our field generally under- or over-using generative AI for this kind of task? Why, with what consequences, and how would we redress it over the next two years? …

## Lightning-round insight (45 seconds, no slides)
> Pick the strongest of three: the single most significant limitation we found; the most
> important human-in-the-loop safeguard we built in; or one honest thing this exposed
> about how our field is over- or under-using AI for this task:
>
> …

## Self-assessment (complete when you tidy and share the note; 1 Nascent · 3 Developing · 5 Robust)
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

Use these to place yourselves honestly. Most groups will sit around 3 on most
dimensions in a short applied session, and that is as it should be. A thoughtful 3
with a sharp caught error is worth more than an unexamined 5. Use 2 and 4 for work
that sits between two anchors: 2 is nearer Nascent than Developing, and 4 is nearer
Robust than Developing.

### 1 · Project Definition
*Is the real problem, and its success criterion, clear?*

- **1, Nascent:** the task is vague or a toy ('use AI on something'), with no success
  criterion.
- **3, Developing:** a real problem is named and there is a rough sense of what
  'better' would look like, although the scope may be broad.
- **5, Robust:** a specific, bounded, genuinely held problem a colleague would
  recognise, with an explicit success criterion you could actually test.

### 2 · Technology Stack
*Is it the right tool on the spectrum, and why?*

- **1, Nascent:** one tool used by default, with no awareness of alternatives or of
  the spectrum.
- **3, Developing:** the choice is explained, with some sense of where it sits and
  what moving a level up or down would change.
- **5, Robust:** deliberate placement on the spectrum, with a reasoned trade-off of
  control, data exposure and effort, and alternatives weighed.

### 3 · Data Security & Ethics
*Were the red lines held, and were the UK GDPR, ethics and fairness addressed?*

- **1, Nascent:** personal, special-category or confidential data used without
  thought, and no consideration of disclosure, consent or fairness.
- **3, Developing:** red lines mostly respected and data de-identified, with some
  ethical reflection on disclosure, IP, bias or fairness.
- **5, Robust:** red lines explicitly held; anonymisation or lawful basis reasoned;
  disclosure, IP, consent, bias and fairness addressed; and a note that would
  withstand being public.

### 4 · Financial & Scalability Constraints
*Does the free tier hold, and what breaks at scale?*

- **1, Nascent:** no thought to cost or scale, and an assumption that it stays free
  forever.
- **3, Developing:** free-tier limits noted, with a rough sense of what scaling would
  cost or require.
- **5, Robust:** clear about free-tier viability, lock-in and the precise point at
  which data, cost or trust breaks the approach.

### 5 · Human-in-the-Loop Protocol
*Are there explicit checkpoints, verification and accountability, and a deliberate
map of automation against human steering?*

- **1, Nascent:** output trusted as it is, with no checkpoint, no named
  accountability and no sense of where automation ends and human steering begins.
- **3, Developing:** some verification done, one or two checkpoints identified and an
  implicit split between the automated and human-steered steps.
- **5, Robust:** a deliberate automation–steering map; oversight consciously chosen
  as interwoven or staged, with the weakness of that choice offset; an explicit list of
  what is never delegated; and a named person who owns the final judgement on
  correctness, ethics and attribution.

---

## Disclaimer

These materials and the tools they reference are the facilitator's own choices, made
in a personal capacity. They do not represent the views or official position of the
University of Oxford, the facilitator's employer, or of the host, the University of
Westminster. The University of Oxford accepts no liability for the selection, use or
outcomes of any third-party tool. Participants remain solely responsible for compliance
with their own institutional policy, the UK GDPR and research ethics.

*This wording is a template and is not legal advice.*
