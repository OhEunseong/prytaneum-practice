# Rules for every AI agent in this repository

This is a practice copy of the Prytaneum team workflow. The task is always the same:
add ONE button for ONE teammate.

## Your lane

- You may create or edit exactly one file: `src/members/<github-username>.json`,
  where `<github-username>` is the teammate's GitHub username in lowercase.
- Never edit, rename or delete any other file. That includes `src/main.js`, `index.html`,
  `src/style.css`, `scripts/`, `.github/`, `package.json` and other teammates' member files.
  If the task seems to need another file, stop and say so in the pull request as `needs-owner`.

## The member file

Exactly these five fields, nothing else:

```json
{
  "name": "First Last",
  "github": "GitHubUsername",
  "emoji": "🌱",
  "color": "#1F6F6B",
  "message": "One short sentence, at most 80 characters."
}
```

- `name`: at most 40 characters. `emoji`: one emoji. `color`: a hex colour like `#1F6F6B`.
- The file name must equal `github` in lowercase plus `.json`.
- No personal data beyond a name. No links, phone numbers or email addresses.

## Workflow

1. Work on a branch named `claude/<github-username>-button`, created from `main`. Never push to `main`.
2. Add the member file. Run `npm install` once, then `npm test` and `npm run build`; both must pass.
3. Commit, push the branch, and open a pull request to `main` titled `Add <name>'s button`.
4. In the pull request description, write what changed in one sentence and paste the `npm test` result.
5. Stop. Only the Reviewer merges.
