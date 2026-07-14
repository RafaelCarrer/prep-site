# PREP — Specification v0.2

> An open standard for AI-readable project folders.
> Prep your project once; any AI picks up exactly where you left off.

**Status:** Draft v0.2 · **Author:** Rafael Carrer ([AMETI](https://ameti.app)) · **License:** CC BY 4.0
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
> This project follows the PREP standard v0.2 — https://prep.md

# Sunday Sourdough

## ABOUT
A small weekend home-bakery side project: sell sourdough loaves to
neighbours. Owner: Rafael. Goal for now — a steady 10 loaves every Sunday
with repeat customers.

## STATUS
Updated: 2026-07-14
State: Recipe is stable; testing a longer cold ferment for flavour.
Next action: Decide on final pricing before telling the WhatsApp list.
Last session: memory/2026-07-14-session.md

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
> This project follows the PREP standard v0.2 — https://prep.md
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

All of a user's PREP projects SHOULD live inside one **root folder**
(default name: `Projects/`). This is how a person finds their work again
without remembering where anything is.

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

### 9.1 Open

To open a project: read `PREP.md`, then the latest `memory/` file, then
**only** the files the MAP indicates for the task at hand. A reader MUST
NOT scan the whole folder on open — the MAP exists to prevent that.
Confirm in one line where things stand, then work.

A user MUST be able to return three ways: by name ("open Chihuahua"), by
listing ("what do I have?" → read the root MAP), or by topic (search the
root folder's contents).

### 9.2 Save

To save: write a new `memory/` session file; append one entry to
`LOG.md`; update only the `STATUS` section of `PREP.md`; promote durable
facts (9.4); update the project's line in the root MAP. Then **verify
every write and report where things were saved, in plain words.**

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

The following are deliberately excluded from v0.2 to keep the standard
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
- **App or automation creation.** PREP standardises project *memory*;
  building tools on top of it is a separate concern for a later version.

## 12. Versioning

This is PREP v0.2. The version appears in every project's identification
line. Changes are recorded in the changelog below. Backwards-incompatible
changes MUST increment the version.

## Changelog

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
