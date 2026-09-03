# The workshop app for Part 2

A small, self-contained web app that centralises the Part 2 groupwork. Each group
logs in under a unique, self-chosen group name, works through the core three and
submits. The facilitator vets each submission from a private dashboard and approves it
or reopens it for edits, and approved work appears on a passcode-gated session
dashboard with live summary statistics.

> This is the default capture surface for Part 2, and HackMD or paper is the fallback.
> Test it end to end before the day, with real devices, the conference Wi-Fi, the
> create, submit, approve and reopen loop, and the timer. If anything wobbles on the
> day, groups fall back to HackMD or paper without losing work.

No personal data is collected. The only identifier is a group-chosen name, which must
not reveal anyone's identity.

## Architecture

Firestore holds one document per group, a small name-uniqueness index and a small
config collection (the session passcode, its hash for the dashboard gate and the
optional countdown). An on-disk (IndexedDB) cache means that a Wi-Fi blip or an
accidental reload does not lose work, because edits queue locally and sync on
reconnect. Autosave writes only the fields edited on the device, as dot-path updates,
so that two devices editing different fields merge instead of overwriting each other.

Firebase Hosting serves three static pages with no build step: vanilla ES modules plus
the Firebase v12 modular SDK and Chart.js from a CDN, which keeps the code easy to read
and audit.

Authentication is minimal. Groups and the public dashboard sign in anonymously, and the
facilitator signs in with a Google account recognised by its verified email. All trust
is enforced in `firestore.rules`, never in the interface. The dashboard adds a passcode
gate on top, using the same passcode groups use, as a privacy gate and not a hard wall
(see the security model).

For resilience, the group app persists its `groupId` locally and silently rejoins after
a reload or disconnect. An optional facilitator-controlled countdown shows as a calm,
accessible corner chip, which is advisory only and never locks the form.

Pages (in `public/`):

| Page | Who | Does |
|---|---|---|
| `index.html` | groups | claim a unique name (or join with a code), choose a scenario, do the core three (artefact, caught error, insight) and submit |
| `facilitator.html` | facilitator only | live list of all groups; approve, reopen or rename each submission; set the passcode and the optional session timer; export the approved, consented work |
| `dashboard.html` | anyone with the session passcode | approved submissions plus live statistics and plots (field over- or under-use, trust against steering, tracks, oversight) |

## Data model (the build contract)

`groups/{groupId}`, where `groupId` is a client-generated Firestore id:

| field | type | notes |
|---|---|---|
| `name` | string | display name, as typed |
| `nameLower` | string | `name.trim().toLowerCase()`, used for uniqueness; matches the `groupNames` id |
| `joinCode` | string | six characters from `ABCDEFGHJKLMNPQRSTUVWXYZ23456789` (no I, L, O, 0 or 1, so it can be read aloud), generated on create and shown to the group so that a second device can join; blanked on approval |
| `sessionCode` | string | the per-session passcode typed on create, which must equal `config/app.sessionCode`; blanked on approval |
| `ownerUids` | array&lt;string&gt; | anonymous uids; create sets `[creatorUid]`, and joining appends via `arrayUnion` |
| `status` | string | `draft`, then `submitted`, then `approved`, or `reopened` (back to the group) |
| `scenario` | string | the chosen scenario label, or `Own problem` |
| `track` | string | `A`, `B`, `C`, `D` or empty |
| `shareConsent` | bool | the group's opt-in consent to include its non-identifying submission in the public archive; only consented, approved work is exported or sent as a pull request |
| `survey` | map | three optional 1–5 scales: `fieldBalance` (the field under- or over-using AI here), `trust` (trust in the output before checking) and `steering` (human steering needed); they power the dashboard plots, and `0` or absent means unanswered |
| `responses` | map | `problem`, `artefact`, `caughtErrors`, `map`, `oversight` (`interwoven`, `staged` or empty), `oversightWhy`, `insight` and `fieldUse` (an optional field reflection) |
| `facilitatorNote` | string | set by the facilitator when reopening |
| `createdAt` / `updatedAt` | timestamp | `serverTimestamp()` |

The app captures no rubric scores and no societal reflection. Those belong to the
fuller note template, which fallback groups write in HackMD or on paper.

`groupNames/{nameLower}` holds `{ groupId }`, the uniqueness index (no secrets). It is
immutable to groups, and only the facilitator may delete an entry (which backs
renaming).

`config/app` holds `{ sessionCode }`, the per-session passcode. It is facilitator-only
for reading and writing, and groups must type it to start a group (the create rule
compares against it and rejects an empty value).

`config/clock` holds `{ running, durationSec, startedAt, endsAt }`, the optional session
countdown. Any signed-in device may read it, so that groups can show a calm corner
timer, and only the facilitator may write, and only those four fields (the rule pins
them with `hasOnly`, so no secret can be smuggled onto a group-readable document). The
absolute `endsAt` is the single source of truth, so every screen agrees. The chip shows
while `running`, and once the countdown expires it reads 'Time's up' until the
facilitator resets or stops the timer.

`config/dashboard` holds `{ passHash }`, the public-dashboard gate. `passHash` is a
SHA-256 hash of the session passcode, never the passcode itself. Any signed-in device
may read it (the dashboard verifies a typed passcode against the hash, client-side),
and only the facilitator may write, and only that one field (`hasOnly`). It is the same
passcode that gates group creation (`config/app`), set once from the Session passcode
panel, so a viewer needs nothing beyond the passcode the facilitator already reads out.

Scenarios offered: A Methodological Blind-Spot Detector, B Executive-Function Layer,
C Rapid Prototyping, D Public Engagement and Own problem (a real, non-confidential
problem a member brings).

### Status flow

`draft`, then (group submits) `submitted`, then (facilitator) `approved` or `reopened`,
then (group edits and resubmits) `submitted`, and so on. The public dashboard shows
`approved` only. The dashboard does not offer Reopen on an approved card, because
approval blanks the join code and each device discards its stored session, so a reopened
group could not get back in. The rules themselves do not forbid it, so avoid moving an
approved document back from the Firestore console.

## Setup (about 15 minutes; the Spark free plan is enough, with no Cloud Functions)

1. Create a Firebase project (or reuse one) at <https://console.firebase.google.com>.
2. Under Firestore, create a database in production mode.
3. Under Authentication, enable Anonymous and Google. Leave Email/Password disabled:
   groups use Anonymous, and keeping it off removes any way to register the
   facilitator's email as a password account. There is no need to add a user, since the
   facilitator account is created on first Google sign-in.
4. Set the facilitator's Google-account email in `firestore.rules`
   (`facilitatorEmail()`), and paste your web config into `public/firebase-config.js`.
5. Install the CLI once with `npm i -g firebase-tools`, then `firebase login`.
6. From `firebase-app/`, run `firebase use --add` (pick your project), then
   `firebase deploy --only firestore:rules,hosting`.
7. Open the Hosting URL. The group app is `/`, the facilitator page is
   `/facilitator.html` and the public dashboard is `/dashboard.html`.
8. Set the session passcode in the facilitator dashboard (the Session passcode panel)
   before groups start, and read it out to the room. Groups type it to start a group
   (until it is set, no group can start), and the same passcode unlocks the public
   dashboard.

Exercise the test plan below against a scratch Firebase project before deploying to
the real one. The pages connect to whatever project `firebase-config.js` names, and
there is no emulator wiring in the client, so the Firebase emulators are not a
substitute.

## Security model: what the rules guarantee

- A group can read only its own document, at any status, and edit it only while
  `draft` or `reopened`. A group document is private while active, since only its owners
  and the facilitator can read it, and nothing reaches the session dashboard until it is
  approved.
- Starting a new group requires the per-session passcode the facilitator sets. The
  create rule compares the typed passcode against `config/app.sessionCode` and rejects
  an empty value, so a group cannot start until the facilitator has set one and read it
  out.
- A group cannot change its owners, name or join code, cannot self-approve and cannot
  read another group's draft.
- Joining requires the correct join code, and is allowed only before submission
  (`draft` or `reopened`). A `submitted` or `approved` group cannot gain new owners, so
  submitted or approved work cannot be overwritten. A wrong code fails closed, because it
  would change the `joinCode` field, which the rules reject.
- The facilitator, matched by verified email (the rule also requires `email_verified`,
  so the privileged claim cannot be self-registered), may move `status`, add a note and
  rename a group (to fix an inappropriate or personal name), but cannot edit a group's
  content. Renaming swaps the `groupNames` index in one transaction, and only the
  facilitator may delete a `groupNames` entry, so groups still cannot reassign names.
- On approval the document is scrubbed: the rule requires `joinCode` and `sessionCode`
  to be blanked, so the document, now readable by any signed-in device and shown on the
  passcode-gated dashboard, carries no secrets.
- Only signed-in devices can read `approved` documents, and nothing in `draft` or
  `submitted` is readable without ownership, nor is anything readable without an
  (anonymous) token. This keeps approved work off the open, unauthenticated, indexable
  web, and the dashboard layers a passcode gate on top, using the same passcode groups
  use (verified client-side against a hash in `config/dashboard`). This is a privacy gate
  and not a hard wall: the data is non-identifying by design, and a determined signed-in
  caller could still read `approved` documents directly, since there is no backend on
  the free plan to enforce a typed secret on a read. The protection is sized to the data.
- Only the facilitator can read or write `config/app` (the session passcode).
- `config/dashboard` (the dashboard gate) is readable by any signed-in device but
  writable only by the facilitator, pinned by `hasOnly` to `passHash` (a hash of the
  passcode, never the passcode itself).
- `config/clock` (the optional countdown) is readable by any signed-in device but
  writable only by the facilitator, and the rule pins it to four non-secret fields with
  `hasOnly`, so no secret can be smuggled onto a group-readable document.
- Everything else is denied by default.

### Before you deploy: a checklist

- [ ] `facilitatorEmail()` in the rules matches the Google account you will sign in with.
- [ ] Only Anonymous and Google are enabled in Authentication, and Email/Password stays
      disabled. `isFacilitator()` trusts the `email` and `email_verified` claims of
      whatever providers you enable, so re-review that rule before adding any
      email-bearing provider (OIDC, SAML or Email/Password).
- [ ] `public/firebase-config.js` holds your project's config.
- [ ] In the Firebase console Rules Playground, confirm that an anonymous user cannot
      read a `draft` it does not own, cannot approve its own document and cannot read
      another group, and that the public read returns only `approved` documents.
- [ ] Names are non-identifying. Check them on the facilitator dashboard and rename any
      that are not. To delete a stray test entry, use the Firestore console and remove
      both the `groups` document and its `groupNames` entry, because the dashboard has
      no delete button and a leftover index entry keeps the name reserved.

## Test plan (against a scratch project)

1. The facilitator signs in and sets the passcode (for example `kelp`), which then shows
   as the current passcode. Setting an empty passcode is refused.
2. Create the group 'Otters' with the session passcode, note the join code, and see it
   appear in `draft`. Creating with a wrong passcode, or with none set, is denied with a
   clear hint and no document is written.
3. In a second browser, join 'Otters' with the code and edit. Type in one field on each
   device at the same time and confirm that both edits survive. With a wrong code, the
   join is denied.
4. Fill in the core three and submit. The status becomes `submitted` and the group view
   goes read-only. A second device can no longer join once `submitted`.
5. The facilitator sees 'Otters', reopens it with a note, the group edits again and
   resubmits, and the facilitator approves. Inspect the approved document: `joinCode` and
   `sessionCode` are now empty, and the card no longer offers Reopen.
6. The public dashboard shows 'Otters' and the statistics update. It never showed the
   group while `draft` or `submitted`, and the approved document carries no secrets.
7. From the browser console as an anonymous user, try to read all `groups`, which is
   denied.

## Licence and status

Part of the workshop kit (MIT for the tooling and the app). It is intentionally
minimal, with the goal of a readable, auditable app, which makes it a good object to
critique against the workshop's own rubric.
