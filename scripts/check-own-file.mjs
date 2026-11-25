// The practice version of the team's lane check (scripts/check-lanes.sh).
// A pull request may add or change exactly ONE file: src/members/<your-github-username>.json
// Usage: node scripts/check-own-file.mjs <base-ref> [pr-author]

import { execSync } from 'node:child_process';

const base = process.argv[2] || 'origin/main';
const author = (process.argv[3] || '').toLowerCase();

const out = execSync(`git diff --name-status ${base}...HEAD`, { encoding: 'utf8' }).trim();
const changes = out ? out.split('\n').map((l) => l.split('\t')) : [];
const problems = [];

if (changes.length === 0) problems.push('this pull request changes no files.');
if (changes.length > 1) problems.push(`it changes ${changes.length} files; change only your own member file.`);

for (const [status, ...paths] of changes) {
  const path = paths.at(-1);
  if (!/^src\/members\/[a-z0-9-]+\.json$/.test(path)) {
    problems.push(`"${path}" is outside your lane. Only src/members/<your-github-username>.json may change.`);
  }
  if (status.startsWith('D')) problems.push(`"${path}" is deleted. Never delete a teammate's file.`);
  if (author && path.startsWith('src/members/') && path !== `src/members/${author}.json`) {
    console.warn(`! "${path}" does not match the pull request author "${author}". Check you edited your own file.`);
  }
}

if (problems.length) {
  console.error('✗ Lane check failed:');
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}
console.log('✓ Lane check passed: only your own member file changed.');
