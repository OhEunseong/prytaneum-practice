// Validates every file in src/members/. Run with: npm test
// Rules match AGENTS.md. The same check runs on every pull request.

import { readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = 'src/members';
const allowed = ['name', 'github', 'emoji', 'color', 'message'];
let failures = 0;

const fail = (file, why) => {
  failures += 1;
  console.error(`✗ ${file}: ${why}`);
};

const files = readdirSync(dir);
for (const file of files) {
  const path = join(dir, file);
  if (!/^[a-z0-9-]+\.json$/.test(file)) {
    fail(path, 'file name must be your GitHub username in lowercase, ending in .json (e.g. oheunseong.json)');
    continue;
  }
  let data;
  try {
    data = JSON.parse(readFileSync(path, 'utf8'));
  } catch (e) {
    fail(path, `not valid JSON (${e.message})`);
    continue;
  }
  const keys = Object.keys(data);
  for (const k of allowed) if (!(k in data)) fail(path, `missing field "${k}"`);
  for (const k of keys) if (!allowed.includes(k)) fail(path, `unexpected field "${k}" (allowed: ${allowed.join(', ')})`);
  const str = (k, max) => {
    if (typeof data[k] !== 'string' || data[k].trim() === '') fail(path, `"${k}" must be non-empty text`);
    else if ([...data[k]].length > max) fail(path, `"${k}" must be at most ${max} characters`);
  };
  str('name', 40);
  str('github', 39);
  str('emoji', 4);
  str('message', 80);
  if (typeof data.github === 'string' && `${data.github.toLowerCase()}.json` !== file) {
    fail(path, `file name must be "${data.github.toLowerCase()}.json" to match "github"`);
  }
  if (typeof data.color !== 'string' || !/^#[0-9A-Fa-f]{6}$/.test(data.color)) {
    fail(path, '"color" must be a hex colour like "#1F6F6B"');
  }
}

if (failures) {
  console.error(`\n${failures} problem(s) found in ${dir}/.`);
  process.exit(1);
}
console.log(`✓ ${files.length} member file(s) are valid.`);
