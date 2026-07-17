# Troubleshooting & FAQ

Connecting an AI to a folder in your cloud drive is new territory, and the
tools are still rough at the edges. Below are real issues people hit — with
the fix for each. This page grows one question at a time as we learn more.

None of these are problems with your PREP folder or the standard itself.
They are quirks of how a given AI's file connector behaves. PREP is designed
to degrade gracefully around them: worst case, you still have plain markdown
a human can read.

---

## "My AI says it can't access Google Drive this turn — but Drive is connected."

Being connected in **settings** is not the same as being active in **this
conversation**. The connection can silently drop for a single message even
though your account still shows Google Drive as linked.

**Fix (ChatGPT):** click the **+** in the message box and add Google Drive
to the conversation again. It usually comes back immediately. If not, send
your request again in the next message, or start a fresh chat.

This is the most common hiccup, and it is momentary — the same request often
works on the very next try.

---

## "The AI lists my folder but won't open a file inside a subfolder."

Some connectors can list a folder and even show you a file's ID, but can't
open a file addressed by its path (like `company/PREP.md`). They find files
by **name search**, not by navigating the tree.

**Fix:** ask for the file by its exact name — for example, *"read
DECISIONS.md"*. Give your files distinctive names so a search lands on the
right one. And put the folder's share link directly in your root `PREP.md`
MAP, so the AI can jump straight to it:

```
## MAP
- company/ — the project.
  Folder link: https://drive.google.com/drive/folders/XXXX
```

When the AI creates a project for you, have it record that link in the MAP
automatically. The folder then knows where its own contents live.

---

## "The AI only reads one file per reply, then stops."

A connector may allow just one file read per message. The mistake is for the
AI to read one file and then wait, leaving you to guess what to ask next.

**Fix:** a good PREP prompt tells the AI to *lead the sequence* — read the
most useful file, summarize it, and end its reply by telling you the exact
next thing to say (*"Now say: read DECISIONS.md"*). You just repeat what it
asks for, one file per reply, until the project is loaded. You should never
have to figure out the order yourself.

---

## "I have two files with the same name. Which one counts?"

Some AI connectors can create files but not edit them, so an update is saved
as a **new** file with the same name, leaving the old one behind.

**Rule:** the **newest** file wins. That is the "create-only" rule in the
spec. Every so often, move the older duplicates to the trash to keep the
folder tidy — but nothing breaks if you don't; the AI reads the latest.

---

## "My AI reads my folder but can't save changes to it."

Some file connectors are read-only. They can open your PREP folder and
read every file, but they can't write a snapshot or update the log. Today
ChatGPT's Google Drive connector is one of these; Claude's can write.

**Fix:** when the AI can't save, have it hand you the snapshot as text and
save the file yourself. Ask it to *"write the session snapshot as
markdown"*, then create a file in your `memory/` folder named like
`2026-07-17-topic.md` and paste it in. It's one extra step, and it keeps
the promise intact: the memory ends up in the folder, not trapped in the
AI. On a platform that can write, the same `prep save` does it for you.

---

## "The AI said it couldn't read a file instead of just answering."

That is the standard working as intended. A PREP-aware AI must not invent or
summarize a file it could not actually open — it tells you it couldn't read
it and asks you to try again. In a tool whose whole purpose is trustworthy
project memory, *"I didn't read it"* is the most important thing an AI can
say honestly.

---

## Still stuck?

Open a discussion on [GitHub](https://github.com/RafaelCarrer/prep.md) or
email [hello@prep.md](mailto:hello@prep.md). Every new question that reaches
us tends to end up on this page, so you are helping the next person too.
