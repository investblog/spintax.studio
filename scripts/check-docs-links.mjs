// Every relative Markdown link in the repo's tracked docs must resolve to a
// real file. Fenced and inline code are stripped first, so a doc SHOWING a
// link as an example is not checked against the filesystem.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
// .agents/.claude and the charter files are untracked local state: absent in
// CI, so a link check over them would pass locally and mean nothing there.
const SKIP = new Set(['.git', 'node_modules', 'dist', '.astro', '.wrangler', '.vscode', '.agents', '.claude']);
const SKIP_FILES = new Set(['AGENTS.md', 'CLAUDE.md']);

function walk(dir, out = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (SKIP.has(entry.name)) continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (entry.name.endsWith('.md') && !SKIP_FILES.has(entry.name)) out.push(full);
  }
  return out;
}

const problems = [];

for (const file of walk(ROOT)) {
  const body = fs
    .readFileSync(file, 'utf8')
    // Fenced and inline code first: a rule that documents the link syntax as
    // `[text](path.md)` is showing an example, not making a link.
    .replace(/^```[\s\S]*?^```/gm, '')
    .replace(/`[^`\n]*`/g, '');

  for (const m of body.matchAll(/\]\(([^)\s#]+)(?:#[^)\s]*)?\)/g)) {
    const target = m[1];
    // Only local relative targets. Absolute URLs, mailto and site-absolute
    // paths (which resolve against the deployed site, not the repo) are out.
    if (/^[a-z]+:/i.test(target) || target.startsWith('/')) continue;

    const resolved = path.resolve(path.dirname(file), decodeURI(target));
    if (!fs.existsSync(resolved)) {
      problems.push(`${path.relative(ROOT, file).replace(/\\/g, '/')} -> ${target}`);
    }
  }
}

if (problems.length > 0) {
  console.error(`[docs-links] ${problems.length} broken link(s):`);
  for (const p of problems) console.error(`  - ${p}`);
  process.exit(1);
}

console.log('[docs-links] every relative link resolves');
