// Post-build gate: every SITE-LOCAL href/src in the built HTML must resolve to
// a file in dist/. External URLs, mailto: and fragments are out of scope. Runs
// after the build because the build is what creates the targets.
import { existsSync, readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const dist = 'dist';
const failures = [];

function* htmlFiles(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) yield* htmlFiles(p);
    else if (name.endsWith('.html')) yield p;
  }
}

for (const file of htmlFiles(dist)) {
  const html = readFileSync(file, 'utf8');
  for (const m of html.matchAll(/(?:href|src|srcset)="([^"]+)"/g)) {
    const raw = m[1].split(' ')[0]; // srcset "url w" pairs: first token
    if (/^(https?:|mailto:|#|data:)/.test(raw)) continue;
    const path = raw.split('#')[0].split('?')[0];
    if (path === '' || path === './' || path === '/') continue;
    const target = path.startsWith('/') ? join(dist, path) : join(file, '..', path);
    const resolved = existsSync(target)
      ? target
      : existsSync(join(target, 'index.html'))
        ? join(target, 'index.html')
        : null;
    if (!resolved) failures.push(`${file}: ${raw}`);
  }
}

if (failures.length) {
  console.error('dist link check FAILED:');
  for (const f of failures) console.error('  ' + f);
  process.exit(1);
}
console.log('dist link check: ok');
