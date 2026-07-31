---
title: Is project memory in ChatGPT and Claude enough?
description: For a quick question, yes. For anything you will come back to, the limit is not how much it remembers. It is that the memory cannot leave.
date: 2026-07-31
audience: everyday
art: compare
by: Rafael Carrer
with: Claude Opus 5
---
# Is project memory in ChatGPT and Claude enough?

Most of the time, yes. If you use one assistant and intend to keep using it,
the project feature it already has will do. Nothing to install, nothing to
learn, nothing to change.

The answer changes in one specific case, and that case is what this piece is
about: the day a second thing needs to read the same work.

## What they do, and do well

ChatGPT and Claude both let you gather the conversations about one subject in
a single place, with instructions that apply to all of them and files that
stay available to every new chat inside that project.

That solves the most irritating part of daily use: opening a new conversation
and not having to repeat who you are, what you are building, and how you like
things done.

It works. Saying so is not politeness, it is the honest starting point.

## When the built-in memory is all you need

Worth being direct here, because comparison pieces usually skip this part.

For anything temporary, use theirs. A question you want answered now. A doubt
you will not come back to. A one-off task. Setting up a folder for that would
be work with no return.

The line is not size, and it is not how technical the work is. It is whether
you will come back.

Anything that is part of your week, anything where decisions get made and
have to hold, anything you want to explain once and never again: that earns a
project folder. And that is most of what people actually do with an
assistant. Not the quick question, but the thing that keeps coming back.

## Why a folder and not just a notes file

The obvious version of this is to keep a file with notes and paste it in.
That is better than nothing, and it is where most people land.

The problem is that an assistant reading a file somebody invented on the spot
has to guess: what here is current, what is old, what matters for today, what
is background. It guesses well sometimes.

A file written to a known shape does not need guessing. It says what the
project is, where it stands right now, and which of the other files are worth
opening for the task in hand. Any assistant that has seen that shape once
reads it correctly the next time, and so does the next assistant, and the one
after that.

The difference is not the notes. It is that the notes have a shape everything
can rely on.

## The payoff arrives with the second reader

It is not a question of time. It is a question of how many things need to
read the same project.

With one reader, the built-in feature is fine. From the second onwards,
memory that cannot leave its box gets in the way every single day. And the
second reader shows up sooner than people expect, in three ways.

**Another assistant.** Anyone running two, each better at something, does not
explain anything to the second one. They point it at the folder. It reads the
current state and carries on from where the other stopped.

**Another person.** The folder is shared, and they open it and continue. No
need for anyone's chat history, and no need for the owner of the project to
be available to explain.

**An agent.** One folder holds the decisions about how an account posts on a
social network. One assistant writes those decisions into it. A different
assistant reads that folder before publishing, so nobody has to repeat the
rules each time. One AI writing for another AI to read later, with no human
in between.

The folder behind this site is two weeks old and already pays for itself,
because it had more than one reader from the first day.

## What that costs when you have nothing

You switch assistants because the other one got better, or cheaper, or
because the work changed. Then you find that carrying on where you stopped
means starting the explaining again.

The usual answer is to paste a summary into the new conversation. That works
for about four days. Then the summary is out of date and there are two
versions of the truth with no way to tell which one is current.

Run two at once, which is common now, and each of them ends up knowing a
different part of the same project. That is worse than forgetting. That is
memory that disagrees with itself.

## The alternative, concretely

Take the memory out of the assistant and put it inside the project.

In practice it is an ordinary folder in your own cloud drive holding three
things: a file saying what the project is and where it stands, a history of
what happened, and a directory with one record per session.

No assistant owns it. Anything that can read a file can open it and carry on.
The whole instruction that reopens a project, in any AI, is one sentence:

```
In my Google Drive, open the «project folder» inside PREP and read PREP.md.
```

This is not an app competing with their feature. It is where the information
lives. You can keep using ChatGPT Projects exactly as you do now and still
have the folder.

## The honest limit

Someone has to write the state down at the end of a session. If nobody does,
the folder goes stale and becomes worse than nothing: it looks organised and
it lies.

The other limit is plumbing, and the format already accounts for it. When an
AI reaches the folder through a cloud connector, some can create a file but
not update one, so every correction leaves an old copy behind. Here that went
as far as more dead copies than live content before anyone noticed.

The standard has a rule for exactly this: when two files share a name, the
newest one is the live one, and the folder says so out loud. So it still
reads correctly, even in a mess.

PREP Save was built around that problem. It updates files in place, so the
folders it writes do not grow that way. That covers what the tool does, not
what you do next: the moment an assistant starts writing into the folder
through a connector of its own, the copies come back, whatever created it.

Syncing the folder to disk removes it for good. The folder stops being a
cloud API and becomes an ordinary directory, the assistant edits the file
instead of creating another copy, and the duplicates never appear.

## If you want to look before deciding

The format is short and free, about five minutes to read:
[prep.md/spec](https://prep.md/spec/). It is CC BY, so you can copy it, adapt
it, or build something better on top of it.

If you would rather see the folder before reading about it,
[PREP Save](https://save.prep.md) writes one into your own Google Drive and
then gets out of the way.
