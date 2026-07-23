# Why AI forgets your project (and how to fix it)

At 9:12 on Monday morning, you ask an AI to continue the itinerary for a
trip you planned on Friday. The travel dates were settled. You had chosen
the neighbourhood for the hotel. Someone still needed to check whether the
airport train would be running when your flight arrived.

The AI replies: "Of course. Where are you travelling?"

Nothing has been deleted. Friday's conversation is still in your account.
The problem is simpler: the information exists, but the AI you are speaking
to cannot see it. Your itinerary has an address inside one conversation,
and you have opened another door.

So you explain the trip again. Ten minutes later, the AI recommends the
hotel you rejected because it was too far from the station. Twenty minutes
later, it builds a museum day for a date when the museum is closed. By
lunchtime, you are no longer planning a holiday. You are working as unpaid
memory for a machine.

## Why AI forgets your project

An AI conversation is good at holding the work happening inside that
conversation. It is a poor place for the durable state of a project.

A chat contains useful decisions, but it also contains abandoned ideas,
corrections, jokes, repeated explanations and questions that stopped
mattering. When the conversation ends, the important parts remain buried
inside the transcript. A new chat may not receive them. A different AI
almost certainly will not.

Built-in memory can help an assistant remember things about you, such as
your preferences or how you like answers written. That is useful, but
project memory is a different job. A travel project needs to remember the
dates, budget, confirmed bookings, rejected options, accessibility needs
and what must be checked next.

Those facts need a stable address.

The same problem appears when you change models during the planning.
Perhaps ChatGPT was useful for comparing destinations, Claude is better at
reading the long terms of a rail pass and another assistant is translating
messages from the hotel. Each one receives a different slice of the trip.
Unless the important state lives somewhere they can all read, the traveller
becomes the integration layer.

That arrangement works until the traveller forgets one sentence.

## A transcript is not a project memory

The obvious fix is to paste the old conversation into the new one. It
helps, but it also asks the new AI to search a haystack you already
searched once.

A long planning transcript may contain dozens of hotel links, several
versions of the itinerary and prices that were correct only on the day they
were checked. Somewhere inside it is the message where you chose the morning
flight. Elsewhere is the correction that replaced it with an evening
arrival. The AI must determine which statement is current, which was
speculation and which decision was later reversed.

A useful project memory should do the opposite. It should remove expired
context and preserve the small amount of information required to continue.

For most projects, that means answering four questions:

1. What is this project?
2. What is true now?
3. What has already been decided or completed?
4. What happens next?

If the answers exist only in a chat, the chat owns the project. If they
exist in ordinary files, the project owns its memory.

## Give the project a folder

PREP is an open working protocol built around that idea. Its core is
deliberately small:

- `PREP.md` explains the project, its current status, its map and its
  standing rules.
- `LOG.md` records what happened, in order.
- `memory/` contains short, dated snapshots from important sessions.

The files live in a folder you control. They are plain text, so they can be
read by a person or by any AI with access to the folder. The protocol does
not depend on one model remembering what another model said.

The entry point is `PREP.md`. For a trip, it might hold the destination,
dates, travellers, budget, important constraints and a map of the booking
documents. The log provides history without requiring the assistant to read
every old conversation. The latest snapshot carries the state from the most
recent useful planning session.

This is enough to make a chat disposable without making the itinerary
disposable.

## What the handover looks like

Imagine you are planning a week in Rome in ChatGPT. During the session, you
choose the evening flight, reject two hotels, reserve one near Termini
station and decide that Tuesday will stay free because one traveller needs a
slower day.

When the work is worth keeping, you save it with
[PREP Save](https://save.prep.md). You paste the conversation's summary,
and PREP Save writes a short snapshot such as
`memory/2026-07-18-rome-itinerary.md` straight into your project folder in
your own Google Drive. It records the confirmed decisions, the current
itinerary and the next action: check the last airport train and book it if
the arrival time works. It adds a dated entry to `LOG.md` and updates the
status in `PREP.md`. Your files never leave your Drive.

The next morning, you open another AI and tell it where to look:

> In my Google Drive, open the **Rome** folder inside PREP and read
> PREP.md.

The new assistant reads the entry point, the relevant history and the latest
snapshot. It sees the evening arrival, the hotel near Termini, the slow
Tuesday and the unresolved train question. You can begin by checking the
timetable instead of explaining the holiday again.

The handover is short because the folder contains conclusions, not the full
archaeology of how you reached them.

## What if the AI cannot read the folder?

Saving is the easy half: PREP Save writes the snapshot into your Drive and
verifies it, so you never depend on a chat's shaky file access to keep your
memory safe.

Reading varies more. Most assistants with a Google Drive connector can open
the folder directly when you name it. If one cannot, the folder still works:
because it is plain text, you can open `PREP.md` yourself and paste it in.
The assistant reads the same conclusions and continues normally. A better
connector makes this faster, but it is never required for the project to
remain understandable.

That is the point of keeping the memory in ordinary files. It does not
depend on any single integration working perfectly — it stays readable by a
person or by any AI, on any day.

## Keep the memory smaller than the work

A project folder should not become another transcript archive. Saving
everything recreates the original problem in a different location.

A useful session snapshot is usually less than one page. It records
decisions, current state, next steps and unresolved questions. Durable rules
belong in `PREP.md`. Completed events belong in `LOG.md`. Passport numbers,
payment details and other secret values do not belong in any of them; the
folder should record only where sensitive information is stored.

This small amount of discipline changes the relationship with AI. You stop
asking the model to remember the trip by itself. You give every model the
same place to begin.

The chat is temporary. The project is permanent.

[Save your first project with PREP Save →](https://save.prep.md) — or read
the [PREP specification](https://prep.md/spec) to see how the folder works
underneath.
