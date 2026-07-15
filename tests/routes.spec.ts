import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync, existsSync, statSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import AdmZip from "adm-zip";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const out = join(root, "out");

// --- Canonical PREP prompt parity (bundled copy) ---
function canonicalPrompt(): string {
  let s = readFileSync(
    join(root, "src", "content", "prep-prompt.md"),
    "utf8"
  ).replace(/\r\n/g, "\n");
  s = s.replace(/^<!--[\s\S]*?-->\n\n/, "").replace(/\n+$/, "");
  return s;
}

function storedPrompt(): string {
  const ts = readFileSync(
    join(root, "src", "content", "prep-prompt.ts"),
    "utf8"
  );
  const m = ts.match(/PREP_PROMPT = (".*");/);
  assert.ok(m, "PREP_PROMPT literal not found");
  return JSON.parse(m![1]);
}

test("prompt integrity: embedded prompt matches canonical", () => {
  const c = canonicalPrompt();
  const s = storedPrompt();
  assert.equal(s, c);
  assert.ok(s.startsWith("# PREP v0.3"));
  assert.ok(s.includes("https://prep.md"));
  assert.ok(!s.includes("ameti.app/prep"));
  // v0.3: commands exist and the no-nagging rule is present
  assert.ok(s.includes("prep save"));
  assert.ok(s.includes("Never offer to save"));
  assert.ok(s.includes("default name `PREP/`"));
});

// --- Built static output ---
const pages = [
  { file: "index.html", must: ["The memory belongs to the project, not the AI.", "Download the starter folder", "Read my PREP folder", "prep-starter.zip", "prep save"] },
  { file: "spec/index.html", must: ["PREP — Specification v0.3", "TOOLS.md", "Security"] },
  { file: "about/index.html", must: ["kitchen manager in London", "hello@prep.md", "AGENTS.md"] },
];

for (const p of pages) {
  test(`route built: ${p.file}`, () => {
    const fp = join(out, p.file);
    assert.ok(existsSync(fp), `${p.file} not built`);
    const html = readFileSync(fp, "utf8");
    for (const needle of p.must) {
      assert.ok(html.includes(needle), `${p.file} missing: ${needle}`);
    }
  });
}

test("SEO title present", () => {
  assert.ok(
    readFileSync(join(out, "index.html"), "utf8").includes(
      "PREP — An Open Standard for AI-Readable Project Folders"
    )
  );
});

test("no forbidden routes and no Digita on the PREP site", () => {
  for (const bad of ["login", "dashboard", "digita"]) {
    assert.ok(!existsSync(join(out, bad)), `unexpected route: ${bad}`);
  }
  for (const f of ["index.html", "about/index.html", "spec/index.html"]) {
    const html = readFileSync(join(out, f), "utf8").toLowerCase();
    assert.ok(!html.includes("digita"), `Digita mentioned in ${f}`);
  }
});

test("starter zip built, well-formed, prompt exact", () => {
  const zipPath = join(out, "prep-starter.zip");
  assert.ok(existsSync(zipPath), "prep-starter.zip not built");
  const zip = new AdmZip(zipPath);
  const names = zip.getEntries().map((e) => e.entryName);
  for (const need of [
    "PREP/PREP.md",
    "PREP/LOG.md",
    "PREP/prep-prompt.md",
    "PREP/README.txt",
  ]) {
    assert.ok(names.includes(need), `zip missing ${need}`);
  }
  const embedded = zip
    .readAsText("PREP/prep-prompt.md")
    .replace(/\r\n/g, "\n")
    .replace(/^<!--[\s\S]*?-->\n\n/, "")
    .replace(/\n+$/, "");
  assert.equal(embedded, canonicalPrompt());
});

test("optimized slide assets exist and are light", () => {
  for (const n of ["slide-1.webp", "slide-2.webp", "slide-3.webp"]) {
    const fp = join(out, "slides", n);
    assert.ok(existsSync(fp), `${n} missing`);
    const kb = statSync(fp).size / 1024;
    assert.ok(kb < 400, `${n} too large: ${Math.round(kb)}KB`);
  }
  assert.ok(existsSync(join(out, "slides", "slide-1.jpg")), "OG jpg missing");
});
