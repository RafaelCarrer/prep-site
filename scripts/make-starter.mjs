// Builds public/prep-starter.zip: a ready-to-use "PREP/" root folder,
// with the exact canonical PREP prompt embedded as prep-prompt.md so the
// folder is self-installing — any AI that reads it learns how to run PREP.
import AdmZip from "adm-zip";
import { readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const today = new Date().toISOString().slice(0, 10);

// Exact canonical prompt (bundled copy inside this repo).
const promptSrc = join(root, "src", "content", "prep-prompt.md");
const prompt = readFileSync(promptSrc, "utf8").replace(/\r\n/g, "\n");

const idLine =
  "> This project follows the PREP standard v0.3 — https://prep.md";

const rootPrep = `${idLine}

# PREP root

## ABOUT
This is the root folder for all your PREP projects. It is itself a PREP
project: its MAP is the catalogue of everything inside. Any AI reads this
first to find a project, or to create a new one.

## STATUS
Updated: ${today}
State: Empty, no projects yet.
Next action: Talk to your AI about anything, and tell it to save when the
work is worth keeping.

## MAP
- prep-prompt.md, the operating instructions. Any AI should read this FIRST
  to learn how to run the PREP standard (how to save, how to open).
- (no projects yet. Each project you save will appear here as one line:
  name, topic, status, last updated)

## RULES
- Follow prep-prompt.md. To open a project, read that project's own PREP.md,
  not this one.
- Never offer to save. The user says so when they want it kept.

## HOW TO SAVE (exact procedure, do not improvise)
There is no tool called "save". Saving means creating files.
1. You only need to be able to CREATE files. If you can create a file,
   you can save.
2. Write the snapshot yourself: the decisions, the current state, and the
   next step. Less than one page.
3. Create ONE file, memory/YYYY-MM-DD-<topic>.md, inside the memory/
   folder of the project that is open. (In this starter that is this
   folder's own memory/.) Markdown preferred; a plain text file is fine.
4. Create a new LOG.md with a dated line for the session (same name; the
   newest file wins).
5. RE-READ what you created. Only then say "Saved" and list the files.
6. If creating a file is truly impossible, hand the user the snapshot as
   text and tell them the exact filename and where to paste it.
Never say "Saved" without verifying. Never say "I can't save" if you can
create a file.
`;

const rootLog = `# Log — PREP root

## ${today}
PREP root created from the starter kit (https://prep.md).
`;

const readme = `PREP, project memory for any AI
Prepare once. Continue anywhere.
https://prep.md

HOW TO USE THIS FOLDER
1. Move this "PREP" folder into your cloud drive
   (Google Drive, Dropbox, OneDrive, anywhere your AI can read files).
2. Open ChatGPT, Claude, Gemini, or any AI chat with access to that drive.
3. Say:  Read my PREP folder

That's it. The AI reads prep-prompt.md and learns the standard.

FROM THEN ON
Talk normally. There are no commands to memorise. Just say what you want:

  "save this"                keeps the conversation in the current project
  "open my dog project"      picks a project back up
  "what do I have?"          lists your projects

To reopen a project in a brand new chat, in any AI, say:

  In my Google Drive, open the <project folder> inside PREP
  and read PREP.md.

EASIER WAY TO SAVE
Many chats still cannot write files reliably. If yours struggles, use
PREP Save (https://save.prep.md): paste the conversation's summary and it
writes the whole project into your own Google Drive, verified.

The memory belongs to the project, not the AI.
`;

const zip = new AdmZip();
zip.addFile("PREP/PREP.md", Buffer.from(rootPrep, "utf8"));
zip.addFile("PREP/LOG.md", Buffer.from(rootLog, "utf8"));
zip.addFile("PREP/prep-prompt.md", Buffer.from(prompt, "utf8"));
zip.addFile("PREP/README.txt", Buffer.from(readme, "utf8"));
zip.addFile(
  "PREP/memory/.gitkeep",
  Buffer.from("Session snapshots are saved here.\n", "utf8")
);

const outDir = join(root, "public");
mkdirSync(outDir, { recursive: true });
zip.writeZip(join(outDir, "prep-starter.zip"));
console.log("make-starter: wrote public/prep-starter.zip");

// Raw markdown of the spec at a stable URL (/spec.md) — AI crawlers and
// developers prefer plain markdown to the rendered page.
const specSrc = readFileSync(join(root, "src", "content", "spec.md"), "utf8");
writeFileSync(join(outDir, "spec.md"), specSrc);
console.log("make-starter: wrote public/spec.md");
