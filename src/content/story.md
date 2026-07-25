# PREP.md — project memory in a folder any AI can read

You spend two weeks building something with an AI — a business plan, a
codebase, a research project. The conversation gets long and heavy, and the
model starts forgetting the decisions you made on day one. Or a better model
comes out, you switch, and you're back to explaining everything from scratch.

The knowledge you built lives trapped inside one chat, in one product, and it
vanishes when the tab closes.

The fix isn't a smarter model. It's giving the project its own memory —
outside the chat.

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
point — it tells any AI what the project is, where it stands now, and which
files to read. `LOG.md` is the scannable timeline. `memory/` holds the full
snapshots.

Any AI that can read the folder opens the project, sees exactly where things
stand, and continues — today in ChatGPT, tomorrow in Claude, without losing a
thing. The conversation becomes a temporary interface over a permanent
project.

It's plain markdown. No app required, no account, no lock-in. If a folder
follows the convention, any tool can support it.

## Why not just paste the old chat?

A three-week conversation is mostly noise — jokes, dead ends, corrections,
things you tried and dropped. Pasting it asks the new model to pan for a few
grams of gold in all that gravel, and it will miss some. A snapshot is the
gold, already separated: the decisions, the current state, what comes next.
Smaller than the work, on purpose.

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
- **Boot light.** `PREP.md` carries a MAP that tells the AI what to read and
  when, so it never scans the whole folder — fast, even years in.
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

This is day one in public. Google's OAuth verification for the Drive scope is
still in review, so when you sign in you'll see the "Google hasn't verified
this app" screen, and there's a 100-user cap until it clears. The folder
format doesn't need the app at all — you can create the files by hand on any
drive (Dropbox, OneDrive, Nextcloud); PREP Save just automates the Google
Drive case for now.

## Why I built it

I'm a kitchen manager in London, not a programmer. In a kitchen, *prep* means
everything ready before service begins — everything in its place, so the work
can flow. I kept losing that with AI: knowing it could help, but losing
everything the moment a chat grew heavy or I switched models. So I gave my
projects their own mise en place. This is it.

If the three-file core is missing something, or it breaks for the way you
work, I'd genuinely like to know.
