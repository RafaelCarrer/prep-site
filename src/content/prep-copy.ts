export const GITHUB_REPO = "https://github.com/RafaelCarrer/prep.md";
export const GITHUB_DISCUSSIONS =
  "https://github.com/RafaelCarrer/prep.md/discussions";
export const GITHUB_FOUNDER = "https://github.com/RafaelCarrer";
export const AMETI = "https://ameti.app";
export const EMAIL = "hello@prep.md";
export const STARTER_ZIP = "/prep-starter.zip";
export const READ_COMMAND = "Read my PREP folder";
export const APP_URL = "https://save.prep.md";

// The canonical open instruction — the one line a user gives any AI to pick
// a project back up. Saving is done by PREP Save (the app); opening needs no
// tool, only this plain sentence. Keep it in sync with spec.md §9.0.
export const OPEN_INSTRUCTION =
  "In your Google Drive, open the «project» folder inside PREP and read PREP.md.";

// The app-first home: a short explainer that warms a cold visitor before
// the high-trust "sign in with Google" ask, then sends them to the app.
export const appHome = {
  hero: {
    eyebrow: "PREP Save",
    headline: "Continue your projects in any AI.",
    body: "Save a conversation once — into your own Google Drive — and any AI picks it up exactly where you left off. ChatGPT, Claude, Gemini.",
    cta: "Save your first project",
  },
  stepsHeading: "How it works",
  steps: [
    {
      n: "1",
      heading: "Talk to any AI",
      body: "Work on your project in ChatGPT, Claude, or Gemini — exactly as you already do.",
    },
    {
      n: "2",
      heading: "Save it to your Drive",
      body: "Paste the conversation's summary into PREP Save. It writes a clean, verified snapshot into a project folder in your own Google Drive.",
    },
    {
      n: "3",
      heading: "Open it in any AI",
      body: "Next time, just tell any AI to open your project folder. It reads the memory and continues — no re-explaining.",
    },
  ],
  safetyHeading: "Your memory, your Drive",
  safety: [
    "Your files stay in your Google Drive. We never store your content.",
    "Plain markdown you can read, edit, and back up yourself.",
    "Built on an open standard — no lock-in, no account with us.",
  ],
  standardHeading: "An open standard underneath",
  standardBody:
    "PREP Save is the easy way to use PREP — an open standard for AI-readable project folders. Prefer to set it up by hand, or build your own tool on it? The spec is short and free.",
};

export const slides = [
  {
    src: "/slides/slide-1.webp",
    alt: "A chat window flowing into a PROJECTS recipe box — save in any AI.",
    caption: "Save in any AI",
  },
  {
    src: "/slides/slide-2.webp",
    alt: "An open folder holding three cards: PREP.md, LOG.md, memory/ — the folder is the memory.",
    caption: "The folder is the memory",
  },
  {
    src: "/slides/slide-3.webp",
    alt: "One folder feeding three different AI chat windows — open in any other AI.",
    caption: "Open in any other AI",
  },
];

export const home = {
  hero: {
    eyebrow: "The open standard for AI-readable project folders",
    headline: "The memory belongs to the project, not the AI.",
    body: "Your projects, readable by any AI or agent — context in seconds. Set up in one minute:",
  },
  steps: [
    {
      n: "1",
      heading: "Download the starter folder",
      body: "A ready-made Projects folder with the standard and the operating instructions already inside.",
    },
    {
      n: "2",
      heading: "Drop it into your cloud drive",
      body: "Unzip it and move the PREP folder to Google Drive, Dropbox, OneDrive — anywhere your AI can read files.",
    },
    {
      n: "3",
      heading: "Tell your AI to read it",
      body: "In ChatGPT, Claude, Gemini — any chat with file access — say the line below. The AI reads the folder, learns the standard from it, and you're set.",
    },
  ],
  commandsHeading: "Then talk normally — and save when you want to",
  commandsIntro:
    "PREP never nags you to save. You have the conversation you want; when it's worth keeping, you say so:",
  commands: `prep save             save this conversation into the current project
prep open <name>      open a project and continue where it left off
prep list             list every project you have
prep new <name>       start a new project deliberately
prep check            verify a folder against its map
prep archive <name>   file a finished project away`,
  valueHeading: "What you just set up",
  values: [
    "Switch chats — or switch AIs entirely — and the work continues.",
    "The memory belongs to the project, not the AI.",
    "Plain text and folders. Nothing locked inside one app.",
  ],
  treeHeading: "A project at a glance",
  tree: `PREP/                        ← all your projects live here
└── Sunday Sourdough/
    ├── PREP.md      ← what this is, where it stands, what to read
    ├── LOG.md       ← append-only history, one dated line per session
    └── memory/      ← a full snapshot of each session`,
  treeNote:
    "PREP.md is the entry point. Its MAP tells the AI what to read and when, so it boots light instead of scanning everything. Optional files like knowledge/, TOOLS.md and DECISIONS.md join only when a project needs them.",
  useCasesHeading: "One standard, three kinds of project",
  useCases: [
    {
      heading: "Personal work",
      body: "Your dog's health notes, a weekend side project, what you're studying — a life kept in folders any AI can pick up, for years.",
    },
    {
      heading: "Team work",
      body: "A shared project a colleague can open with a different AI and continue instantly. The context isn't trapped in one person's chat history.",
    },
    {
      heading: "AI agents",
      body: "An agent with no context guesses. PREP is its onboarding in seconds: goal, state, history, decisions — and, with TOOLS.md, which tools it may use.",
    },
  ],
  promptHeading: "Prefer to start from a prompt?",
  promptBody:
    "The starter folder includes the prompt, so most people never need this. But if you'd rather set things up by hand, copy the PREP prompt and paste it into a Project's instructions in ChatGPT or Claude.",
  specHeading: "Read the standard",
  specBody:
    "PREP is a short, open specification — small enough to read in five minutes. It's free to use, adapt and build on, with attribution.",
};

export const about = {
  hero: {
    eyebrow: "About PREP",
    headline: "Mise en place for AI projects.",
    body: "In a kitchen, prep means everything ready before service begins. PREP is prep for your projects: any AI opens the folder, and service begins.",
  },
  founder: {
    heading: "Built by someone who needed it.",
    body: "PREP is an open standard by Rafael Carrer, a kitchen manager in London who builds his own tools for the recurring problems he meets in real work. It came from a simple frustration: knowing an AI could help, but losing everything the moment a chat grew heavy or he switched models. The fix wasn't a smarter AI — it was giving the project its own memory.",
    linkLabel: "Rafael's work on GitHub",
  },
  what: {
    heading: "A convention, not a product.",
    body: "PREP is a handful of plain files with agreed names. If a folder follows the standard, any tool — ChatGPT, Claude, Gemini, an agent, an editor — can support it. There's no app, no account, no backend. It's designed to outlive any single AI model.",
  },
  lane: {
    heading: "Where it fits.",
    body: "AGENTS.md tells agents how to work in your code. PREP tells them everything about your project — the goal, the state, the history, the decisions. And where MCP connects an AI to your tools, PREP connects an AI to your project: one is how an AI acts, the other is how a project remembers.",
  },
  contact: {
    heading: "Contact & contribute",
    body: "Questions, ideas, or a translation? The best place is GitHub Discussions — public, so answers help the next person too. For anything else, email works.",
  },
  ameti: {
    heading: "Part of AMETI",
    body: "PREP is the foundation of AMETI — small tools that guide you through one job at a time, over the AI models you already use.",
  },
};
