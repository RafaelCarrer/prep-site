# PREP vs AGENTS.md — when to use each

If you work with AI coding tools, you have probably seen `AGENTS.md`: a file
you drop in a code repository to tell an agent how to behave there — which
commands to run, how to test, what conventions to follow. It is genuinely
useful, and it is spreading fast.

People sometimes ask whether PREP competes with it. It doesn't. They solve
different problems, and they work well side by side. Here is the clean line
between them.

## AGENTS.md: how an agent should work *inside your code*

`AGENTS.md` lives in a repository and speaks to a coding agent. It answers
operational questions about that codebase:

- Run the tests with `npm test`.
- Use tabs, not spaces.
- Don't touch the generated files in `dist/`.
- The deploy command is `vercel --prod`.

It is instructions for an agent doing work in a repo. Its scope is that repo,
and its audience is a tool writing or running code.

## PREP: everything about your *project*, for any AI

PREP is broader in one direction and narrower in another. It is not about
code specifically, and it is not a set of behavior rules. It is a small
folder — `PREP.md`, `LOG.md`, and a `memory/` folder — that holds the
*context* of a project so that **any** AI can pick it up and continue:

- What this project is and what we're trying to do.
- Where everything lives (the MAP).
- What's been decided, and what's happening now (the STATUS and the LOG).
- The rules for this project specifically.

The project can be anything — a menu redesign, a family budget, a novel, a
research thread, or, yes, a piece of software. And the point is portability:
you can start with ChatGPT, continue with Claude, and hand it to Gemini
tomorrow, because the memory lives in the folder, not in any one AI.

## The one-line difference

> **AGENTS.md tells a coding agent how to work inside your repo. PREP tells
> any AI everything about your project.**

One is behavior in a codebase. The other is portable context for a project
of any kind.

## They compose

The best part is that you don't choose. A software project can have both: an
`AGENTS.md` at the repo root telling the coding agent how to build and test,
and a PREP folder holding the project's story, decisions, and history that
any AI — not just the coding agent — can read.

In fact, `AGENTS.md` is exactly the kind of file a PREP MAP would point to:

```
## MAP
- code/ — the repository. See its AGENTS.md for how to build and test.
- decisions/ — why we chose this architecture.
- LOG.md — what happened, in order.
```

## When to reach for which

- **Reach for AGENTS.md** when you want a coding agent to behave correctly
  inside a specific repository.
- **Reach for PREP** when you want the full context of a project to survive
  across sessions and across different AIs — code or not.

Use both when your project is code and you also want its story to be
portable. They were built for different jobs, and neither replaces the other.

Want the full picture of how PREP works? Read the
[specification](https://prep.md/spec), or
[download the starter folder](https://prep.md/download) and try it in a
minute.
