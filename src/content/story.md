# PREP.md — a structured project folder any AI can pick up in seconds

I'm a kitchen manager in London, not a programmer — but I use AI every day,
and I kept hitting the same wall.

I'd spend two weeks building something in ChatGPT — a plan, a project, a
piece of writing. Then the conversation would grow long and heavy, and the
model would start forgetting the decisions I'd made on day one. Or a better
model came out, I'd switch to it, and I was back to explaining everything
from scratch.

The knowledge I'd built lived trapped inside one chat, in one product, and
vanished when the tab closed. I was spending my time being unpaid memory for
a machine.

The fix wasn't a smarter model. It was giving the project its own memory —
kept outside the chat, in a **structure** any AI can read quickly: what the
project is, where it stands, and only the part it needs to read next. That
last bit matters — the AI doesn't re-read everything, so it picks the project
up in seconds, not tokens.

## The whole idea: a folder, not a chat

PREP is a convention, not a product. A project is an ordinary folder in your
own cloud drive, arranged in a small, predictable way:

```
Sunday Sourdough/
├── PREP.md      ← what this is, where it stands, what to read
├── LOG.md       ← append-only history, one dated line per session
└── memory/      ← a dated snapshot of each session
```

That's the whole core. Three files with agreed names. `PREP.md` is the entry
point, and it carries a small **MAP** — it tells the AI what each file is and
*when* to read it. So the AI boots light: it reads the entry point and only
what the task needs, instead of scanning the whole history. Clear, structured,
and cheap on tokens — even years in.

`LOG.md` is the scannable timeline. `memory/` holds the full snapshots. Any AI
that can read the folder opens the project, sees exactly where things stand,
and continues — today in ChatGPT, tomorrow in Claude, without losing a thing.
The conversation becomes a temporary interface over a permanent project.

It's plain markdown. No app required, no account, no lock-in. If a folder
follows the convention, any tool can support it.

## Why not just paste the old chat?

A three-week conversation is mostly noise — jokes, dead ends, corrections,
things you tried and dropped. Pasting it asks the new model to pan for a few
grams of gold in all that gravel, and it will miss some (and pay tokens to
read the gravel). A snapshot is the gold, already separated: the decisions,
the current state, what comes next. Smaller than the work, on purpose.

## Two things you do: save and open

**Save.** When a session is worth keeping, you save it. Because chat
assistants can't reliably write files yet, I built a small tool — **PREP
Save** — that does it dependably. You paste the conversation's summary, and it
writes a verified snapshot into a project folder in your own Google Drive. It
reads the file back before it says "saved." It runs entirely in your browser,
requests only the `drive.file` scope (per-file access to what it creates — it
can't see the rest of your Drive), and keeps no copy of your content.

**Open.** To pick a project back up, you tell any AI, in plain words:

> In my Google Drive, open the «project» folder inside PREP and read PREP.md.

The AI reads the standard from the folder itself and continues. That one
sentence is the only syntax you ever need.

## The design choices (the opinionated part)

- **The memory belongs to the project, not the AI.** Switch models or devices
  freely; your work outlives any single vendor.
- **Boot light.** The MAP tells the AI what to read and when, so it never
  scans the whole folder — fast and token-cheap, even years in.
- **Verify before "saved."** A save counts only once the file is written and
  read back. You're never told it saved when it wasn't.
- **Secrets by reference.** PREP files are read into a chat, so they never
  store passwords — only *where* a secret lives.
- **Smaller than the work.** A snapshot is conclusions, not the full
  transcript. If it grows into another archive, it stops working.

## Try it

- **Save your first project** (about a minute): [save.prep.md](https://save.prep.md)
- **Read the spec** (five minutes, CC BY): [prep.md/spec](https://prep.md/spec)
- **Inspect it on GitHub**: [github.com/RafaelCarrer/prep.md](https://github.com/RafaelCarrer/prep.md)

## Honest status

This is day one in public, built by one person around a day job — so expect
rough edges, and tell me when you hit one.

On permissions: PREP Save asks Google for a single scope, `drive.file` —
per-file access to the files it creates. It cannot see the rest of your
Drive, and your content never touches a server of mine.

The folder format doesn't need the app at all. You can create the three files
by hand on any drive — Dropbox, OneDrive, Nextcloud, a local folder — and any
AI with access can read them. PREP Save just automates the Google Drive case
for now.

## What I'd like to know

In a kitchen, *prep* means everything in its place before service begins, so
the work can flow. PREP is that for a project: any AI opens the folder, and
service begins.

If the three-file core is missing something, or it breaks for the way you
work, I'd genuinely like to hear it.
