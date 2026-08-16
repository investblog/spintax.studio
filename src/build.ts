/**
 * Static build: templates -> dist/, static/ copied through, privacy.html copied
 * VERBATIM from the repo root — it must stay byte-identical to the authoritative
 * copy in the product repo (spintax-studio/docs/publish/privacy.html), whose
 * suite gates its privacy copies against each other. robots.txt and llms.txt are
 * assembled here so the page list has one owner.
 */
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { ORIGIN } from './meta.js';
import * as index from './templates/index.js';
import * as notfound from './templates/notfound.js';

const dist = 'dist';
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// Templated pages.
const pages = [index, notfound];
for (const p of pages) {
  const file = p.meta.slug === '' ? 'index.html' : `${p.meta.slug}.html`;
  writeFileSync(`${dist}/${file}`, p.html());
}

// Byte-exact passthroughs and static payload.
writeFileSync(`${dist}/privacy.html`, readFileSync('privacy.html'));
cpSync('static', dist, { recursive: true });
writeFileSync(`${dist}/CNAME`, 'spintax.studio\n');

// robots.txt — Content-Signal declares intent for search and AI use; mirrors
// (when content pages gain them) are disallowed here because GitHub Pages
// cannot send X-Robots-Tag.
writeFileSync(
  `${dist}/robots.txt`,
  `# Content-Signal: search=yes, ai-input=yes, ai-train=yes
User-agent: *
Allow: /

Sitemap: ${ORIGIN}/sitemap.xml
`,
);

// llms.txt — the agent-facing index. Grows with the content pages.
writeFileSync(
  `${dist}/llms.txt`,
  `# Spintax Studio

> Native Windows editor for spintax templates: write, validate, preview, export —
> with an optional AI draft: a finished draft arrives checked by the real engine.

## Pages

- [Spintax Studio](${ORIGIN}/): product overview
- [Privacy policy](${ORIGIN}/privacy.html): what the application sends, stores and never collects

## Ecosystem

- The spintax language, docs and playground: https://spintax.net/llms.txt
`,
);

console.log(`built ${pages.length} pages + passthroughs -> ${dist}/`);
