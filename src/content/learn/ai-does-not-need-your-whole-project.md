---
title: Your AI does not need to read your whole project
description: Two weeks of history in my own project folder is 129 KB. A fresh chat reads 5.5 KB of it and carries on. The MAP is what makes that possible.
date: 2026-07-30
audience: builders
art: map
---
# Your AI does not need to read your whole project

The folder I run this company from has 22 files in it. Decisions, a log, team
notes, brand rules, the prompts that drive our video automation, and a
`memory/` directory with a snapshot of each working session. Two weeks of
work. About 129 KB of markdown.

Every morning I open a fresh chat and point an AI at that folder. If it read
all of it, that would be roughly 33,000 tokens spent before I have asked a
single question. Every session. Most of it about things that have nothing to
do with what I need today.

It does not read all of it. It reads about 5.5 KB, which is around 4 percent
of the folder, and then it knows where the project stands and what comes
next. The thing that makes that work is a section called MAP.

## Dumping the folder is the obvious idea and it is the wrong one

The first instinct when you want an AI to know a project is to give it
everything. It is easy to implement and it feels thorough.

It fails in three ways. Cost is the boring one. The second is latency, since
you wait while the model chews through the history of decisions you already
made. The third is the one that actually hurts: the answer gets worse. When
you hand a model 33,000 tokens where 1,400 were relevant, the signal is
sitting in a pile of noise, and it will sometimes reach for a decision you
reversed a week ago because that text is right there in front of it.

The other instinct is to keep a hand written summary and paste that in. That
works for about four days. Then the summary is out of date, and you now have
two versions of the truth with no way to tell which is which.

## The entry point carries an index, and the index carries timing

A PREP folder has one file that is always read first, `PREP.md`. It holds
what the project is, where it stands right now, and a MAP.

The MAP is not a file listing. A file listing is something the AI could get
by itself, and it would tell it nothing useful. The MAP says what each file
is for and **when it is worth opening**. Translated out of the Portuguese my
own folder is written in, part of it reads:

```
## MAP
- CONSELHO.md, weekly briefing for the adviser. Read it at the start.
- DECISIONS.md, decisions, append-only.
- tasks/, the operations room. Start at 00-LEIA-PRIMEIRO.md.
- INVENTARIO.md, the registry: id and parent folder of every live file.
- LOG.md, history. memory/, snapshots.
- lixeira/, DEAD VERSIONS. A file in here DOES NOT EXIST.
```

That last line is doing more work than it looks. It tells the AI to ignore a
whole directory. Without it, a model being helpful would read the dead
versions and cheerfully mix them into the answer.

So the open sequence is: read `PREP.md`, read the newest snapshot in
`memory/`, then read only what the MAP points at for the task in hand. In my
folder that is 3.6 KB plus 1.9 KB. If today's job touches decisions, it opens
`DECISIONS.md` too and pays 6 KB for it, deliberately, because it needs it.

The token counts above are estimates from byte size at roughly four
characters per token. The byte sizes are exact. Your model's tokeniser will
differ a little, and it does not change the shape of the result.

## Why this is a folder and not a feature

Every part of this is plain text in a directory you own. The MAP is a
markdown list. There is no index to rebuild, no embedding to refresh, no
service to be up. A different AI opens the same folder next month and gets
the same routing, because the routing is written down rather than inferred.

That is also why it survives model changes. The instruction to reopen a
project, in any AI with file access, is one sentence:

```
In my Google Drive, open the «project folder» inside PREP and read PREP.md.
```

## What this does not fix

The MAP controls what gets read. It does nothing about what gets written, and
right now that is the weak spot in my own folder.

Chat assistants on some platforms can create files but not update them in
place. So every time one saved a new version of a document, the old one
stayed. My folder has 22 live files and 31 stale copies of them, about 284 KB
of dead weight, which is more than double the live content. One prompt file
exists in eight versions.

The MAP keeps the AI from reading that pile, because the rule "same name
without a number means the newest wins" is written into the folder. But
writing a rule to work around a mess is not the same as not having the mess.
PREP Save updates files in place, so folders it manages do not grow this way.
Files written by a chat assistant do. I would rather say that plainly than
show you a tidy screenshot.

The `STATUS` block in that same `PREP.md` is three days stale as I write
this, for the same reason. The standard says to update it on every save. A
standard only helps if you run it.

## If you want to look at the mechanism

The MAP is section 4 of the specification, which is short and takes about
five minutes to read: [prep.md/spec](https://prep.md/spec/). It is CC BY, so
you can implement it or bend it into something better.

If you would rather see the folder before reading about it,
[PREP Save](https://save.prep.md) writes one into your own Google Drive and
then gets out of the way.
