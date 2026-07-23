# PREP — Specification v0.3

> An open standard for AI-readable project folders.
> Prepare once. Continue anywhere.

**Status:** Draft v0.3 · **Author:** Rafael Carrer ([AMETI](https://ameti.app)) · **License:** CC BY 4.0
**Home:** https://prep.md

The key words MUST, MUST NOT, SHOULD, SHOULD NOT, and MAY in this document
are to be interpreted as described in [RFC 2119](https://www.rfc-editor.org/rfc/rfc2119).

---

## 1. The problem

Every large language model keeps its own memory in its own way. A long
ChatGPT conversation grows heavy and starts to forget. Move to Claude or
Gemini and you start again from nothing. The knowledge you built lives
trapped inside one chat, in one product, and disappears when the tab
closes.

PREP inverts this. The memory belongs to the **project**, not to the AI.
A project is an ordinary folder in your cloud drive, arranged in a small,
predictable way. Any AI that can read that folder can open the project,
understand where things stand, and continue — today in ChatGPT, tomorrow
in Claude, without losing a thing. The conversation becomes a temporary
interface over a permanent project.

PREP is not another AI model, app, or platform. It is a convention: a
handful of files with agreed names, in an agreed order. If a folder
follows it, any tool can implement support.

## 2. A project at a glance

Here is a complete, valid PREP project:

```
Sunday Sourdough/
├── PREP.md
├── LOG.md
└── memory/
    └── 2026-07-14-session.md
```

**PREP.md** — the entry point. The first file any AI reads.

```markdown
> This project follows the PREP standard v0.3 — https://prep.md

# Sunday Sourdough

## ABOUT
A small weekend home-bakery side project: sell sourdough loaves to
neighbours. Owner: Rafael. Goal for now — a steady 10 loaves every Sunday
with repeat customers.

## STATUS
Updated: 2026-07-14
State: Recipe is stable; testing a longer cold ferment for flavour.
Next action: Decide on final pricing before telling the WhatsApp list.
Latest: memory/2026-07-14-session.md

## MAP
- LOG.md — dated history; read for how we got here.
- memory/ — full session notes; read the latest for current detail.
- knowledge/recipe.md — the working recipe (read when baking or tweaking).

## RULES
- Keep advice practical and low-cost; this is a side project, not a bakery.
```

**LOG.md** — append-only history. One dated entry per session or event.

```markdown
# Log — Sunday Sourdough

## 2026-07-14
Decided to test a 24h cold ferment. Set first neighbour price at £5/loaf,
pending final check. Next: confirm pricing.

## 2026-07-07
First 10 loaves sold out. Two neighbours asked for a standing order.
```

**memory/2026-07-14-session.md** — the full snapshot of one session.

```markdown
# Session — 2026-07-14

## Context
Working on Sunday Sourdough. Focus today: flavour and pricing.

## What happened
Compared same-day bake vs 24h cold ferment. Cold ferment tasted better
and fit the Saturday-night / Sunday-morning routine.

## Decisions
- Adopt 24h cold ferment as the default method.
- Target price £5/loaf; still need to check ingredient cost per loaf.

## Current state
Recipe stable. Pricing not yet announced.

## Next steps
1. Work out cost per loaf.
2. Confirm £5 or adjust.
3. Message the WhatsApp list with the offer.

## Open questions
- Do neighbours want a weekly standing order? Two already asked.
```

That is the whole idea. Everything below is precision.

## 3. The required core

A PREP project MUST contain:

1. **`PREP.md`** — the entry point (Section 4).
2. **`LOG.md`** — an append-only history (Section 5).
3. **`memory/`** — a directory of per-session snapshots (Section 6).

Nothing else is required. A project MAY add optional components
(Section 7), but a reader MUST NOT depend on any of them existing.

File and section names (`PREP`, `ABOUT`, `STATUS`, `MAP`, `RULES`, `LOG`,
`memory`) MUST be in English for universal compatibility. The **content**
SHOULD be in the user's own language.

Files MUST be plain text (Markdown recommended) so they survive any tool
and any future model.

## 4. PREP.md — the entry point

`PREP.md` MUST begin with a single identification line so that any reader
knows the convention in play and where to learn it:

```
> This project follows the PREP standard v0.3 — https://prep.md
```

It then contains these sections, in this order:

- **ABOUT** (MUST) — what the project is and who it is for, in a few
  lines. Stable; rarely changes.
- **STATUS** (MUST) — where the project stands *now*: an `Updated:` date,
  the current state, the next action, and a pointer to the latest
  `memory/` file. This is the only section that changes every session,
  and it MUST stay short.
- **MAP** (MUST) — an index of what exists in the folder and *when* to
  read each part (e.g. "read `knowledge/recipe.md` only when baking").
  The MAP is what lets a reader load lightly instead of scanning
  everything.
- **RULES** (MAY) — project-specific instructions for the AI: tone,
  prohibitions, sources of truth, a role to adopt.

The `STATUS` section MUST carry an `Updated:` date so staleness is
visible at a glance.

## 5. LOG.md — append-only history

`LOG.md` is the scannable timeline. Each entry is dated and short (one to
five lines): what happened, decisions made, the next step. Detail belongs
in `memory/`; the log is the index to it.

`LOG.md` MUST be append-only. A writer MUST NOT edit or delete existing
entries. History is never rewritten.

## 6. memory/ — session snapshots

`memory/` holds one file per session, named `YYYY-MM-DD-session.md`
(append `-2`, `-3` for multiple sessions on the same day).

Each file is a **continuation block**: goal/context, what happened,
decisions, current state, next steps, and open questions — enough for a
fresh AI, on any platform, to resume without the original conversation.

A writer MUST NOT overwrite a previous session file. The full history is
preserved.

## 7. Optional components

A project MAY include, when it needs them, using these standard names so
any reader recognises them. When present, they MUST be listed in the MAP.

- `knowledge/` — reference material the project draws on.
- `documents/` — work products the project produces.
- `TASKS.md` — a living task list.
- `DECISIONS.md` — a structured decision record, when `LOG.md` is not
  enough.
- `TOOLS.md` — a catalogue of the tools, APIs, MCP servers and
  integrations available to agents working on this project.
- `data/`, `assets/`, `code/` — as the project requires.

## 8. The root folder and the root index

All of a user's PREP projects SHOULD live inside one **root folder**,
whose default name is **`PREP/`**. This is how a person finds their work
again without remembering where anything is — and a folder named `PREP`
is recognisable at a glance among ordinary cloud-drive folders.

The root MAY carry any name the user prefers. A reader MUST identify the
root by the `PREP.md` inside it, never by the folder name alone. (The
default avoids a common collision: many people already keep a folder
called `Projects`.)

The root folder is itself a PREP project. Its `PREP.md` describes the
collection, and its **MAP is the catalogue**: one line per project —
name, topic in a few words, status, last updated.

```markdown
## MAP
- Sunday Sourdough — weekend bread side project — active — 2026-07-14
- Chihuahua — researching care for a new dog — active — 2026-07-13
- Kitchen Rota — staff scheduling notes — perennial — 2026-07-12
```

Whenever a project is saved, its line in the root MAP MUST also be
updated (and the write verified). This keeps the catalogue true.

## 9. Behaviour for implementers

An implementation of PREP (a prompt, a tool, an app) SHOULD follow these
flows. This is what turns the file convention into a usable experience.

### 9.0 Saving and opening

The two flows a user needs are **save** (write the current conversation
into the project) and **open** (pick the project back up in any AI).

**Saving** is best handled by a tool that can write to the drive reliably.
The reference implementation is **[PREP Save](https://save.prep.md)**: the
user pastes a conversation's summary, and it writes a verified snapshot
into the project folder in the user's own Google Drive, following Section
9.2. A chat assistant with file-write access MAY save directly instead —
but many cannot write reliably, so a dedicated tool is the dependable path.

**Opening** needs no tool at all — only a plain instruction any AI with
read access to the folder can follow. The canonical open instruction is:

```
In my Google Drive, open the «project» folder inside PREP
and read PREP.md.
```

The AI reads the standard from the folder itself and continues from
Section 9.1. This natural-language line is the standard's one required
piece of user-facing syntax; everything else the AI learns from `PREP.md`.

No special command language is required. An implementation SHOULD accept
plain phrasing for the operations below ("save this", "what do I have?",
"open my dog project") — the standard is driven in ordinary words, not a
syntax the user has to memorise.

### 9.1 Open

To open a project: read `PREP.md`, then the latest `memory/` file, then
**only** the files the MAP indicates for the task at hand. A reader MUST
NOT scan the whole folder on open — the MAP exists to prevent that.
Confirm in one line where things stand, then work.

A user MUST be able to return three ways: by name ("open Chihuahua"), by
listing ("what do I have?" → read the root MAP), or by topic (search the
root folder's contents).

### 9.2 Save

Saving is always the user's call. An implementation **MUST NOT offer to
save** during a conversation: people talk freely, and a tool that keeps
asking "shall I save this?" is a tool people stop using. The one
exception: when a conversation has grown long enough to risk losing
context, it MAY offer once.

Saving MUST NOT interrogate. The implementation writes the summary
itself, from the conversation; it MUST NOT ask the user to write it. The
only question allowed is the project **name**, and only when a project is
first created (9.3).

To save: write a new `memory/` session file; append one entry to
`LOG.md`; update only the `STATUS` section of `PREP.md`; promote durable
facts (9.4); update the project's line in the root MAP. Then **verify
every write and report where things were saved, in plain words** — in a
line or two, and get out of the way.

An implementation MUST NOT report a save as done without verifying it. If
a write fails or the tool has no file access, it MUST output the file
contents in the conversation for manual saving — work is never lost
silently.

Some platforms can create files but not edit them in place. There, an
update leaves the previous version beside the new one: the newest file
with a given name is the live one. An implementation MUST say so when it
happens and SHOULD offer to clean up outdated duplicates during check.

### 9.3 Naming and no duplicates

A new project MUST be given a name before it is saved; an implementation
SHOULD propose a short name from the topic and let the user confirm or
change it. Before creating a project, an implementation MUST check the
root MAP and, if a same or similar project exists, offer to open it
rather than create a duplicate.

### 9.4 Promotion of durable facts

Lasting preferences, standing decisions, and permanent learnings SHOULD
be promoted into `PREP.md` (ABOUT/RULES) or `DECISIONS.md` at save time,
not left buried inside an old session file where a light boot would miss
them.

### 9.5 Check and archive

An implementation SHOULD offer a **check** (verify the MAP's files exist
and the root catalogue matches reality; report inconsistencies, fix only
with permission) and an **archive** (move a finished project into
`archive/` inside the root and update the catalogue; nothing is deleted).

## 10. Security

PREP folders are plain text and are read into the conversation on every
open — their contents pass through the AI provider's servers and may
appear in chat logs and session files.

Therefore an implementation MUST NOT write secrets into PREP files:
passwords, recovery codes, private keys, authentication tokens, or full
payment card numbers. If a user provides one, it MUST refuse and offer to
store a **reference** instead — which account, which email, and *where*
the secret lives (a dedicated password manager) — never the secret
itself.

PREP is not encryption and not a vault. The privacy of a project equals
the security of the cloud account that holds it; users SHOULD enable
two-factor authentication on that account. An implementation MUST NOT
quietly support insecure use: what the standard does not protect, it says
so plainly.

## 11. Out of scope (by design)

The following are deliberately excluded from v0.3 to keep the standard
understandable in five minutes. They are recorded here so their absence
reads as a choice, not an oversight.

- **Concurrency / locking** across simultaneous sessions. PREP uses
  last-write-wins; the append-only `LOG.md` limits the damage. Formal
  multi-writer coordination is out of scope.
- **A formal component lifecycle** (specified → active, etc.). `STATUS`
  in free text is enough.
- **Roles or agents as a schema.** A project that wants the AI to adopt a
  role states it in `RULES`.
- **A global knowledge base** across projects.
- **A formal upgrade system.** The specification is versioned; migration
  guidance travels with the version line.
- **Per-file metadata headers.** The MAP is the single source of
  location and purpose.

PREP standardises project *memory*; the tools built on top of it are not
part of the specification. [PREP Save](https://save.prep.md) is the
reference implementation of the save flow (Section 9), and anyone may
build others — the folder is the contract.

## 12. Versioning

This is PREP v0.3. The version appears in every project's identification
line. Changes are recorded in the changelog below. Backwards-incompatible
changes MUST increment the version.

## Changelog

- **v0.3 — 2026-07-14.** Default root folder renamed to `PREP/` (avoids
  colliding with the `Projects` folder many people already have, and is
  recognisable at a glance); the root may still carry any name and is
  identified by its PREP.md. Added the `prep` command set (`save`,
  `open`, `list`, `new`, `check`, `archive`). Saving is now strictly
  user-initiated: implementations must not offer to save during a
  conversation, and must write the summary themselves rather than ask
  for one. *Amended 2026-07-23:* Section 9 now leads with saving via a
  dedicated tool ([PREP Save](https://save.prep.md), the reference
  implementation) and a single canonical open instruction. The `prep`
  command syntax was dropped in favour of plain phrasing; the standard is
  driven in ordinary words. The folder format is unchanged.
- **v0.2 — 2026-07-14.** Established the standard's own home at
  https://prep.md (canonical URL in every identification line). Added
  `TOOLS.md` as an optional component — a catalogue of tools, APIs and
  MCP servers for agents working on the project. English is now the
  single reference language; translations are welcome via pull request.
- **v0.1 — 2026-07-14.** First public draft. Required core (PREP.md,
  LOG.md, memory/), root folder and recursive root index, open/save/check/
  archive behaviour, promotion of durable facts, anti-duplication,
  security by reference, and the out-of-scope record. Amended the same
  day, after the standard's first real-world run: create-only platform
  behaviour (the newest same-name file is the live one; disclose
  leftover copies; clean up during check).

---

PREP is an open standard by Rafael Carrer, a kitchen manager in London who
builds his own tools. It is part of [AMETI](https://ameti.app). Licensed
under [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) — use,
adapt, and build on it freely, with attribution.
