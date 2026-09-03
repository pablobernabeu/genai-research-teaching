# App reset checklist for the day

*Operational only. The [facilitator guide](../workshop_plan.md) holds the rationale, the [run sheet](facilitator_run_sheet.md) the timeline and the [app README](../firebase-app/README.md) the full deployment steps.*

A short reset that gets the live app into a clean, ready state for Westminster on 9 September 2026. The app (genai-rt.web.app) is the default capture surface, and HackMD or paper is the fallback.

## Before Part 1 (about 11:52, with a re-check during lunch)

- [ ] Sign in to the facilitator dashboard at genai-rt.web.app/facilitator.html with the Google account pcbernabeu@gmail.com ('Sign in with Google'). Group devices do not sign in here.
- [ ] Confirm that sign-in actually completes and that you are on the dashboard, not on the sign-in card. If it bounces, the project's Google sign-in needs checking in the Firebase console, which is a pre-deployment concern to fix before the room fills.
- [ ] Clear the rehearsal and test groups. Deletion is console-only, with no button on the dashboard. In the Firestore console, delete stray test documents from the `groups` collection and the matching `groupNames` entry, or the name stays reserved.
- [ ] Confirm that the facilitator group list is clear of rehearsal entries (that is where draft and submitted test groups show) and that the public board at genai-rt.web.app/dashboard.html is empty.
- [ ] Set today's passcode in the Session passcode panel and write it where you can read it out (it overwrites any rehearsal value). The status should then read 'Passcode set. Read it out to the room.' Confirm that the public dashboard opens with this passcode too. Until it is set, no group can start.
- [ ] In the Session timer panel, set Minutes (the default is 15, the build window) but do not start it yet. You can change the length only before starting.
- [ ] Have the 'Open the workshop app' slide ready, with the large URL genai-rt.web.app and the scannable QR code.
- [ ] During lunch, glance at the dashboard once more: passcode set, no stray groups, timer not running.

## At the start of Part 2

- [ ] Read out the passcode and the URL (genai-rt.web.app), and show the QR slide. 'One device per group creates, then reads out its group name and the six-character code; everyone else types both and leaves the passcode blank.'
- [ ] Remind groups to choose a group name that does not identify anyone (for example 'Otters' or 'Team Kelp'), which is the one name they type on the login form.
- [ ] Press Start countdown at 13:18, when the 'Fifteen minutes, starting now' slide goes up, and not at the 13:15 settle-in. The corner chip is advisory: a calm countdown that never locks their form. Once it expires it reads 'Time's up' until you reset it.

## During

- [ ] Watch the count line, 'N groups · M awaiting review'.
- [ ] On each submission: Approve, Reopen… (it prompts for a short note) or Rename… as needed.
- [ ] Approve only when the group is done. Approval shows the work on the session dashboard and makes the group's form read-only, because owners can edit only while a note is in draft or reopened. The join code is wiped too, so no new device can join, and Reopen is no longer offered.
- [ ] Rename any identifying name the moment you spot one (Rename…, keeping it short and non-identifying).
- [ ] If a phase overruns, use Reset / stop and then restart with new Minutes, since the length cannot change while the timer runs.

## After Part 2 (once groups have submitted)

- [ ] Export approved (Markdown) from the dashboard is the default path. It exports only approved and consented groups and downloads `YYYY-MM-DD_genai-rt-submissions.md`, dated with the day you export.
- [ ] Check it before committing (names and content), rename it to the workshop date if you exported later, then commit under `submissions/`.
- [ ] Alternatively, from your own machine if pre-configured, run `npm run archive:pr` (it needs `GENAI_RT_PROJECT` and `GENAI_RT_API_KEY` set and `gh` already logged in; run `npm run archive:pr -- --dry-run` to preview). If either is not ready, use the Markdown export above.

## Troubleshooting

- Sign-in fails: allow pop-ups for the site and try again, since the pop-up path is the reliable one. Then confirm that you are using the pre-registered Google account, and check that Google sign-in is enabled for the project in the Firebase console.
- A group cannot start: the passcode is not set, or they have a typo. Re-read it, since the create path needs the session passcode.
- Timer not showing: glance at your dashboard's Session timer status line first. It reads 'Running: MM:SS left …' when live and 'Timer is off.' when stopped. The group chip appears while the countdown is running and reads 'Time's up' after it expires.
- App wobbles: tell the room to switch to HackMD (hackmd.io), with the same headings. In-progress edits are queued on the device and sync on reconnect, so nothing already typed is lost.

---

*A personal selection, made in the facilitator's own capacity. It is not the position of the University of Oxford (the facilitator's employer) or of the host, and it is not legal advice.*
