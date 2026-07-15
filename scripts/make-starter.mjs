// Builds public/prep-starter.zip: a ready-to-use "PREP/" root folder,
// with the exact canonical PREP prompt embedded as prep-prompt.md so the
// folder is self-installing — any AI that reads it learns how to run PREP.
import AdmZip from "adm-zip";
import { readFileSync, mkdirSync } from "node:fs";
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
State: Empty — no projects yet.
Next action: Talk to your AI about anything; type "prep save" when it's worth keeping.

## MAP
- prep-prompt.md — operating instructions. Any AI should read this FIRST to
  learn how to run the PREP standard (commands, open, save).
- (no projects yet — each project you save will appear here as one line:
  name, topic, status, last updated)

## RULES
- Follow prep-prompt.md. To open a project, read that project's own PREP.md,
  not this one.
- Never offer to save. The user saves with "prep save" when they want to.
`;

const rootLog = `# Log — PREP root

## ${today}
PREP root created from the starter kit (https://prep.md).
`;

const readme = `PREP — project memory for any AI
Prepare once. Continue anywhere.
https://prep.md

HOW TO USE THIS FOLDER
1. Move this "PREP" folder into your cloud drive
   (Google Drive, Dropbox, OneDrive — anywhere your AI can read files).
2. Open ChatGPT, Claude, Gemini, or any AI chat with access to that drive.
3. Say:  Read my PREP folder

That's it. The AI reads prep-prompt.md and learns the standard.

FROM THEN ON
Talk normally. When a conversation is worth keeping, type:

  prep save

Other commands:
  prep open <name>      open a project and continue it
  prep list             list every project you have
  prep new <name>       start a new project deliberately
  prep check            verify a folder against its map
  prep archive <name>   file a finished project away

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
