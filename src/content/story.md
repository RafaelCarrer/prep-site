# PREP.md: switch AI models and continue your project without explaining it again

I'm a kitchen manager in London, not a programmer, but I use AI every day and
I kept hitting the same wall.

I'd spend a lot of time building something in ChatGPT. A plan, a project, a
piece of writing. Sometimes that's weeks of work. With code it can happen in a
single day, because all the copying and pasting makes one conversation heavy
enough to slow down and start forgetting the decisions I made at the start. Or
I simply want to use another company's AI to carry on with the project.

Either way the knowledge I built stays trapped inside one chat, in one
product, and it disappears when the tab closes. And when I tried to rescue it
by copying text into notes as I went, I just made a mess. No structure, no
method, nothing another AI could pick up cleanly.

The fix was giving the project its own memory. Kept outside the chat, in a
structure any AI can read quickly: what the project is, where it stands, and
only the part it needs to read next. That last part matters. The AI doesn't
re-read everything, so it picks the project up in seconds, and it doesn't burn
tokens doing it.

## The whole idea: a folder, not a chat

PREP is a convention, not a product. A project is an ordinary folder in your
own cloud drive, arranged in a small, predictable way:

```
Your Project/
├── PREP.md      ← what this is, where it stands, what to read
├── LOG.md       ← append-only history, one dated line per session
└── memory/      ← a dated snapshot of each session
```

That's the whole core. Three files with agreed names. `PREP.md` is the entry
point, and it carries a small MAP that tells the AI what each file is and when
to read it. So the AI boots light: it reads the entry point and only what the
task needs, instead of scanning the whole history. Clear, structured, and
cheap on tokens, even years in.

`LOG.md` is the scannable timeline. `memory/` holds the full snapshots. Any AI
that can read the folder opens the project, sees exactly where things stand,
and continues. Today in ChatGPT, tomorrow in Claude, without losing a thing.
The conversation becomes a temporary interface over a permanent project.

It's plain markdown. No app required, no account, no lock-in. If a folder
follows the convention, any tool can support it.

## Why not just paste the old chat?

A long conversation is mostly noise. Jokes, dead ends, corrections, things you
tried and dropped. Pasting it asks the new model to sift through all of that
and work out for itself what still counts, and it will get some of it wrong,
while paying tokens to read the parts that stopped mattering weeks ago. A
snapshot is what matters, already separated: the decisions, the current state,
what comes next. Smaller than the work, on purpose.

## Two things you do: save and open

**Save.** When a session is worth keeping, you save it. Because chat
assistants still can't write files reliably, I built a small tool for it,
called PREP Save. You paste the conversation's summary and it builds the whole
project for you in your own Google Drive: the folder, `PREP.md`, `LOG.md` and
`memory/`, already filled in correctly and following the standard. Next time,
it adds the new snapshot and updates the status. It runs entirely in your
browser, asks Google for a single scope (`drive.file`, per-file access to what
it creates, so it can't see the rest of your Drive), and keeps no copy of your
content.

**Open.** To continue the project in a fresh tab of any AI model, or to get an
agent up to speed on it, you say this in plain words:

> In my Google Drive, open the «project folder» inside PREP and read PREP.md.

The AI reads the standard from the folder itself and continues from where you
stopped. That one sentence is the only syntax you ever need.

## The design choices (the opinionated part)

- **The memory belongs to the project, not the AI.** Switch models or devices
  freely. Your work outlives any single vendor.
- **Boot light.** The MAP tells the AI what to read and when, so it never
  scans the whole folder. Fast and cheap on tokens, even years in.
- **No secrets, ever.** PREP files get read into a chat, so they never store
  passwords or keys.
- **Smaller than the work.** A snapshot is conclusions, not the full
  transcript. If it grows into another archive, it stops working.

## Honest status

This is day one in public, built by one person around a day job, so expect
rough edges and tell me when you hit one.

The folder format doesn't need the app at all. You can create the three files
by hand on any drive (Dropbox, OneDrive, Nextcloud, even a local folder) and
any AI with access can read them. If you'd rather start that way, there's a
[starter folder as a zip](https://prep.md/prep-starter.zip) with the three
files ready to fill in. PREP Save just automates the Google Drive case for
now.

## What I'd like to know

In a kitchen, *prep* means everything in its place before service begins, so
the work can flow. PREP is that for a project: any AI opens the folder, and
service begins.

**If the three-file core is missing something, or it breaks for the way you
work, I'd genuinely like to hear it.**

## Try it

- **Save your first project** (about a minute): [save.prep.md](https://save.prep.md)
- **Read the spec** (five minutes, CC BY): [prep.md/spec](https://prep.md/spec)
- **Inspect it on GitHub**: [github.com/RafaelCarrer/prep.md](https://github.com/RafaelCarrer/prep.md)
