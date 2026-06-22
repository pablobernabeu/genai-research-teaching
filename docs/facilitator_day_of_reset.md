# Morning reset checklist

*Operational only — the [facilitator guide](../workshop_plan.md) holds the rationale, the [run sheet](facilitator_run_sheet.md) the timeline and the [app README](../firebase-app/README.md) the full deploy steps.*

A short reset, in the minutes before Part 2, that gets the live app into a clean, ready state — Westminster, 24 June 2026. The app (genai-rt.web.app) is the default capture surface; HackMD or paper is the fallback.

## Before the room fills (during the lunch break, ~12:45–13:10)

- [ ] Sign in to the facilitator dashboard at genai-rt.web.app/facilitator.html with the Google account **pcbernabeu@gmail.com** ('Sign in with Google'). Group devices do not sign in here.
- [ ] Confirm sign-in actually completes — you are on the dashboard, not the sign-in card. If it bounces, the project's Google sign-in needs checking in the Firebase console (a pre-deploy concern; fix before the room fills).
- [ ] **Clear the rehearsal / test groups** — deletion is console-only, not on the dashboard. In the Firestore console (Firebase console), delete stray test docs from the `groups` collection and the matching `groupNames` index entry, or the name stays reserved.
- [ ] Confirm the facilitator group list is clear of rehearsal entries (that is where draft/submitted test groups show); the public board at genai-rt.web.app/dashboard.html should also be empty.
- [ ] **Set today's passcode** in the Session passcode panel and write it where the room can see it (it overwrites any rehearsal value). Status should then read 'Passcode set. Read it out to the groups.' Until set, no group can start.
- [ ] In the Session timer panel, set **Minutes** (default 15 — the build window) but **do not start it yet**. You change the length only before starting.
- [ ] Have the 'Open the workshop app' slide ready — big URL **genai-rt.web.app** and the scannable QR.

## At the start of Part 2

- [ ] Read out the passcode and the URL (genai-rt.web.app), and show the QR slide. 'One device per group creates; the others join with the 6-character code it shows.'
- [ ] Remind groups to choose a **group name that does not identify anyone** (e.g. 'Otters', 'Team Kelp') — the one name they type on the login form.
- [ ] Press **'Start countdown'** when groups begin. The corner chip is advisory — a calm countdown, never a lock on their form.

## During

- [ ] Watch the count line — 'N groups · M awaiting review'.
- [ ] On each submission: Approve, Reopen… (it prompts for a short note) or Rename… as needed.
- [ ] **Approve only when the group is done** — it makes the work world-readable on the public dashboard and locks the group out, as its join code is wiped.
- [ ] Rename any identifying names the moment you spot one (Rename…, keep it short and non-identifying).
- [ ] If a phase overruns, 'Reset / stop' then restart with new Minutes — there is no change-while-running.

## After Part 2 (once groups have submitted)

- [ ] **Export approved (Markdown)** from the dashboard — the default path. It exports only **approved and consented** groups and downloads `YYYY-MM-DD_genai-rt-submissions.md`.
- [ ] Check it before committing — eyeball names and content — then commit under `submissions/`.
- [ ] Alternatively, from your own machine if pre-configured: `npm run archive:pr` (needs `GENAI_RT_PROJECT` and `GENAI_RT_API_KEY` set and `gh` already logged in; add `--dry-run` to preview). If either is not ready, use the Markdown export above.

## Troubleshooting

- **Sign-in fails** → confirm you are using the pre-registered Google account; check Google sign-in is enabled for the project in the Firebase console.
- **A group cannot start** → the passcode is not set, or they have a typo. Re-read it; the create path needs the session passcode.
- **Timer not showing** → glance at your dashboard's Session timer status line first: it reads 'Running — MM:SS left …' when live and 'Timer is off.' when stopped. The group chip appears only while the countdown is running and not yet expired.
- **App wobbles** → tell the room to switch to HackMD (hackmd.io), same headings; in-progress edits are queued on-device and sync on reconnect, so nothing already typed is lost.

---

*Disclaimer: a personal selection in the facilitator's own capacity; not the position of the University of Oxford (the employer) or the host; not legal advice.*
