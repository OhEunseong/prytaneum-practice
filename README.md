# Prytaneum Practice Wall

A safe sandbox for practising the Prytaneum team workflow with Claude Code:
**branch → pull request → preview → review → merge.**

Every teammate adds one button with their own name to a shared page. Each person adds a
*different* file (`src/members/<github-username>.json`), so twelve people can work at the
same time, in any order, without merge conflicts.

## What is in here

| Path | What it is | Who changes it |
| --- | --- | --- |
| `src/members/*.json` | One file per teammate; each becomes a button | You (your own file only) |
| `src/main.js`, `index.html`, `src/style.css` | The page that reads every member file | Nobody during practice |
| `scripts/check-members.mjs` | Checks member files (`npm test`) | Owner only |
| `scripts/check-own-file.mjs` | Practice lane check: a pull request may change only one member file | Owner only |
| `.github/workflows/practice-checks.yml` | Runs both checks and a build on every pull request | Owner only |
| `AGENTS.md` | Rules every AI agent follows | Owner only |

## Quick start for teammates

Follow the **Practice Guide** your Reviewer shared. In short:

1. In the Claude app's Code tab, start a cloud session on `OhEunseong/prytaneum-practice`, branch `main`.
2. Paste the prompt from the guide with your name, GitHub username, emoji, colour and message.
3. Open the pull request Claude creates, check the green **practice-checks** and click the Vercel **Visit Preview** link.
4. Wait for the Reviewer to merge, then see your button on the live page.

## Run it locally (optional)

```bash
npm install
npm run dev     # open the printed address
npm test        # check member files
```
