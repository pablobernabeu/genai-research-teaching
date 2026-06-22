# Groupwork hub — the Part 2 groupwork app

A small, self-contained web app that centralises the Part 2 groupwork: each group
logs in under a unique, self-chosen **group name**, works through the **core three**,
and submits. The facilitator vets each submission from a **private dashboard** and
approves it (or reopens it for edits); approved work appears on a **public
dashboard** with live summary stats.

> **This is the default capture surface for Part 2; HackMD/paper is the fallback.**
> **Test it end to end before the day** (real devices, the conference Wi-Fi, the
> create → submit → approve/reopen loop, the timer). If anything wobbles on the day,
> groups fall back to HackMD or paper without losing work.

**No personal data.** The only identifier is a group-chosen name, which must not
reveal anyone's identity. Nothing else about individuals is collected.

## Architecture

- **Firestore** — one document per group; a tiny name-uniqueness index; a small config
  collection (the session passcode and the optional countdown). An **on-disk (IndexedDB)
  cache** means a Wi-Fi blip or accidental reload does not lose work — edits queue locally
  and sync on reconnect.
- **Firebase Hosting** — three static pages, no build step (vanilla ES modules +
  the Firebase v10 modular SDK and Chart.js from a CDN). Easy to read and audit.
- **Auth** — groups sign in **anonymously**; the facilitator signs in with their
  **Google account** (recognised by its verified email). All trust is enforced in
  `firestore.rules`, never in the UI.
- **Resilience** — the group app persists its `groupId` locally and silently rejoins after
  a reload or disconnect; an optional facilitator-controlled **countdown** shows as a calm,
  accessible corner chip (advisory only — it never locks the form).

Pages (in `public/`):

| Page | Who | Does |
|---|---|---|
| `index.html` | groups | claim a unique name (or join with a code) → choose a scenario → do the core three (artefact, caught error, insight) → submit |
| `facilitator.html` | facilitator only | live list of all groups; approve, reopen or rename each submission; set the passcode and the optional session timer |
| `dashboard.html` | anyone | approved submissions + live summary stats/plots |

## Data model (the build contract)

`groups/{groupId}` — `groupId` is a client-generated Firestore id:

| field | type | notes |
|---|---|---|
| `name` | string | display name, as typed |
| `nameLower` | string | `name.trim().toLowerCase()` — used for uniqueness; matches the `groupNames` id |
| `joinCode` | string | 6 chars `A–Z2–9`, generated on create, shown to the group so a second device can join; blanked on approval |
| `sessionCode` | string | the per-session passcode typed on create; must equal `config/app.sessionCode`; blanked on approval |
| `ownerUids` | array&lt;string&gt; | anonymous uids; create sets `[creatorUid]`; joining appends via `arrayUnion` |
| `status` | string | `draft` → `submitted` → `approved`, or `reopened` (back to the group) |
| `scenario` | string | chosen scenario label, or `Own problem` |
| `track` | string | `A` / `B` / `C` / `D` / `` |
| `shareConsent` | bool | the group's opt-in consent to include its (non-identifying) submission in the public archive; only consented, approved work is exported/PR'd |
| `responses` | map | `problem`, `artefact`, `caughtErrors`, `map`, `oversight` (`interwoven`/`staged`/``), `oversightWhy`, `insight`, `fieldUse` (optional field reflection); optional deferred `rubric` map (five 1–5 scores) and `societal` |
| `facilitatorNote` | string | set by the facilitator when reopening |
| `createdAt` / `updatedAt` | timestamp | `serverTimestamp()` |

`groupNames/{nameLower}` → `{ groupId }` — uniqueness index (no secrets). Immutable to
groups; only the facilitator may delete an entry (this backs renaming).

`config/app` → `{ sessionCode }` — the per-session passcode. Facilitator-only read/write;
groups must type it to start a group (the create rule compares against it).

`config/clock` → `{ running, durationSec, startedAt, endsAt }` — the optional session
countdown. **Any signed-in device may read it** (so groups show a calm corner timer); only
the facilitator may write, and only those four fields (the rule pins them with `hasOnly`, so
no secret can ever be smuggled onto a group-readable doc). The absolute `endsAt` is the single
source of truth, so every screen agrees; the chip shows only while `running` and not expired.

Scenarios offered: **A** Methodological Blind-Spot Detector · **B** Executive-Function
Layer · **C** Rapid Prototyping · **D** Public Engagement · **Own problem** (a real,
non-confidential problem a member brings — kept, per the current design).

### Status flow
`draft` →(group submits)→ `submitted` →(facilitator)→ `approved` **or** `reopened`
→(group edits + resubmits)→ `submitted` … Public dashboard shows `approved` only.

## Setup (≈ 15 minutes, Spark/free plan is enough — no Cloud Functions)

1. **Create a Firebase project** (or reuse one) at <https://console.firebase.google.com>.
2. **Firestore** → create database (production mode).
3. **Authentication** → enable **Anonymous** and **Google**. Leave **Email/Password
   disabled**: groups use Anonymous, and keeping it off removes any way to register the
   facilitator's email as a password account. No need to add a user — the facilitator
   account is created on first Google sign-in.
4. Set the facilitator's **Google-account email** in `firestore.rules`
   (`facilitatorEmail()`), and paste your web config into `public/firebase-config.js`.
5. Install the CLI once: `npm i -g firebase-tools`, then `firebase login`.
6. From `firebase-app/`: `firebase use --add` (pick your project), then
   **`firebase deploy --only firestore:rules,hosting`**.
7. Open the Hosting URL. Group app is `/`, facilitator `/facilitator.html`, public
   `/dashboard.html`.
8. **Set the session passcode** in the facilitator dashboard (the **Set passcode**
   panel) **before groups start**, and read it out to the room. Groups must type it to
   start a group; until it is set, no group can start.

Run locally first with the emulators: `firebase emulators:start` (Firestore + Hosting
+ Auth) and exercise the test plan below before deploying.

## Security model — what the rules guarantee

- A group can **read and edit only its own** document, and only while `draft`/`reopened`.
  A group document is **private while active** — only its owners and the facilitator can
  read it; nothing leaks to the public board until it is approved.
- Starting a new group requires the **per-session passcode** the facilitator sets (see
  below): the create rule compares the typed passcode against `config/app.sessionCode`,
  so a group cannot start until the facilitator has set one and read it out.
- A group **cannot** change its owners, name or join code, **cannot self-approve**, and
  **cannot read another group's draft**.
- **Joining** requires the correct **join code**, and is allowed **only before
  submission** (`draft`/`reopened`): a `submitted` or `approved` group cannot gain new
  owners, so submitted or approved work cannot be overwritten. A wrong code fails closed
  (it would change the `joinCode` field, which the rules reject).
- The **facilitator** (matched by **verified** email — the rule also requires
  `email_verified`, so the privileged claim cannot be self-registered) may move `status`,
  add a note, and **rename** a group (to fix an inappropriate or personal name), but
  **cannot edit a group's content**. Renaming swaps the `groupNames` index in one
  transaction; only the facilitator may delete a `groupNames` entry, so groups still
  cannot reassign names.
- On **approval** the document is **scrubbed**: the rule requires `joinCode` and
  `sessionCode` to be blanked, so the now world-readable document carries **no secrets**.
- The **public** can read **only `approved`** documents — nothing in `draft`/`submitted`.
- Only the **facilitator** can read or write `config/app` (the session passcode).
- `config/clock` (the optional countdown) is **readable by any signed-in device but
  writable only by the facilitator**, and the rule pins it to four non-secret fields with
  `hasOnly` — so no secret can ever be smuggled onto a group-readable doc.
- Default-deny everywhere else.

### Before you deploy — checklist
- [ ] `facilitatorEmail()` in the rules matches the Google account you will sign in with.
- [ ] **Only Anonymous + Google are enabled** in Authentication; **Email/Password stays
      disabled.** `isFacilitator()` trusts the `email`/`email_verified` claims of whatever
      providers you enable, so re-review that rule before adding any email-bearing
      provider (OIDC/SAML/Email-Password).
- [ ] `public/firebase-config.js` holds **your** project's config.
- [ ] In the Firebase console **Rules Playground**, confirm: an anonymous user cannot
      read a `draft` it does not own; cannot approve its own doc; cannot read another
      group; the public read returns only `approved`.
- [ ] Names are non-identifying — eyeball them on the facilitator dashboard; **rename**
      any that aren't (or delete a stray test entry). Renaming and deleting are
      facilitator-only.

## Test plan (emulator or a scratch project)
1. Facilitator signs in → **Set passcode** (e.g. `kelp`) → it shows as the current
   passcode.
2. Create group "Otters" with the session passcode → note the join code → it appears in
   `draft`. Creating with a **wrong passcode** (or none set) → denied with a clear hint;
   no document is written.
3. Second browser: join "Otters" with the code → can edit; with a wrong code → denied.
4. Fill the core five → submit → status `submitted`; the group view goes read-only.
   A second device can no longer join once `submitted`.
5. Facilitator → sees "Otters" → reopen with a note → group can edit again → resubmit →
   approve. Inspect the approved doc: `joinCode` and `sessionCode` are now **empty**.
6. Public dashboard shows "Otters" and the stats update; it never showed it while
   `draft`/`submitted`, and the approved doc carries no secrets.
7. From the browser console as an anonymous user, try to read all `groups` → denied.

## Licence & status
Part of the workshop kit (MIT for tooling). Intentionally minimal; the goal is a
readable, auditable app — fittingly, a good object to critique against the workshop's
own rubric.
