// Tell IndexNow which URLs changed, after a deploy.
//
// One submission reaches every participating engine — Bing, Yandex, Seznam,
// Naver, Yep and Amazon — because they share what they receive. Google does not
// participate; for Google the sitemap in Search Console is still the channel.
//
// The hard part is not the request, it is deciding what to send. IndexNow's own
// guidance names "submitting unchanged URLs repeatedly" as a common mistake and
// warns it wastes crawl budget, so this never submits the whole site. It asks
// git what changed instead: publishing is a commit, so the last commit's content
// files are exactly the URLs worth announcing.
//
// Usage:
//   node scripts/indexnow.mjs                 # URLs from the last commit
//   node scripts/indexnow.mjs --since <ref>   # everything since <ref>
//   node scripts/indexnow.mjs <url> [url...]  # exactly these
//   node scripts/indexnow.mjs --dry-run       # print, do not submit
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const ROOT = process.cwd();
const SITE = 'https://spintax.studio';
const ENDPOINT = 'https://api.indexnow.org/indexnow';

/** The key is public by design: the engines fetch it to prove the site is ours. */
function findKey() {
  const files = fs
    .readdirSync(path.join(ROOT, 'static'))
    .filter((f) => /^[0-9a-f]{8,128}\.txt$/i.test(f));
  if (files.length !== 1) {
    throw new Error(
      `expected exactly one IndexNow key file in static/, found ${files.length}. ` +
        'The file name is the key and its contents must be the same string.',
    );
  }
  const key = path.basename(files[0], '.txt');
  const body = fs.readFileSync(path.join(ROOT, 'static', files[0]), 'utf8').trim();
  if (body !== key) throw new Error(`${files[0]} does not contain its own name as the key`);
  return key;
}

/** Page sources -> the URL each one publishes. */
function toUrl(file) {
  // Page sources on this site: templates and the passthrough legal page.
  if (file === 'privacy.html') return `${SITE}/privacy.html`;
  if (file === 'src/meta.ts') return `${SITE}/`; // shared metadata surfaces on the landing
  const page = file.match(/^src\/templates\/([^/]+)\.ts$/);
  if (page) {
    if (page[1] === 'notfound') return null;
    // layout and index both surface as the homepage; per-page templates as pages
    if (page[1] === 'layout' || page[1] === 'index') return `${SITE}/`;
    return `${SITE}/${page[1]}.html`;
  }
  const md = file.match(/^content\/([^/]+)\.md$/);
  if (md) return `${SITE}/${md[1]}.html`;
  return null;
}

function changedSince(ref) {
  const out = execFileSync('git', ['diff', '--name-only', `${ref}..HEAD`], {
    cwd: ROOT,
    encoding: 'utf8',
  });
  return out
    .split(/\r?\n/)
    .map((f) => f.trim())
    .filter(Boolean);
}

const args = process.argv.slice(2);
const dryRun = args.includes('--dry-run');
const sinceIndex = args.indexOf('--since');
const since = sinceIndex !== -1 ? args[sinceIndex + 1] : 'HEAD~1';
const explicit = args.filter((a) => a.startsWith('http'));

let urls;
if (explicit.length > 0) {
  urls = explicit;
} else {
  const files = changedSince(since);
  // The Set dedups `${SITE}/` when index.ts itself changed — the homepage is
  // announced alongside any page change and must not be submitted twice.
  const pages = [...new Set(files.map(toUrl).filter(Boolean))];
  urls = pages.length > 0 ? [...new Set([`${SITE}/`, ...pages])] : [];
}

if (urls.length === 0) {
  console.log(`[indexnow] no article changed since ${since} — nothing to submit`);
  process.exit(0);
}

const key = findKey();
const payload = {
  host: new URL(SITE).host,
  key,
  keyLocation: `${SITE}/${key}.txt`,
  urlList: urls,
};

console.log(`[indexnow] ${urls.length} url(s):`);
for (const u of urls) console.log(`  ${u}`);

if (dryRun) {
  console.log('[indexnow] --dry-run, not submitted');
  process.exit(0);
}

const response = await fetch(ENDPOINT, {
  method: 'POST',
  headers: { 'content-type': 'application/json; charset=utf-8' },
  body: JSON.stringify(payload),
});

// 200 and 202 both mean accepted; 202 means the key is still being validated.
if (response.status !== 200 && response.status !== 202) {
  console.error(`[indexnow] ${response.status} ${await response.text()}`);
  process.exit(1);
}
console.log(`[indexnow] ${response.status} accepted`);
