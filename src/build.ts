/**
 * Static build: templates -> dist/, static/ copied through, privacy.html copied
 * VERBATIM from the repo root — it must stay byte-identical to the authoritative
 * copy in the product repo (spintax-studio/docs/publish/privacy.html), whose
 * suite gates its privacy copies against each other. robots.txt and llms.txt are
 * assembled here so the page list has one owner.
 */
import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { ORIGIN, PageMeta } from './meta.js';
import * as index from './templates/index.js';
import * as notfound from './templates/notfound.js';
import { prosePage } from './templates/prose.js';

/** The two prose pages: rendered from content/<slug>.md, mirrored verbatim. */
const PROSE: PageMeta[] = [
  {
    slug: 'ecosystem',
    title: 'The Spintax ecosystem - one language, three doors',
    description:
      'Independent open-source spintax engines held to one behaviour by a shared corpus - an editor for people, an n8n node for pipelines, an MCP server for agents.',
    nav: 'ecosystem',
  },
  {
    slug: 'ai',
    title: 'AI drafting in Spintax Studio - controlled variation, not paraphrasing',
    description:
      'The model writes a template once, the engine decides whether it is valid, and every variant after that is deterministic, offline and reproducible from a seed.',
    nav: 'ai',
  },
];

const dist = 'dist';
rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

// Templated pages; the nav (with active-page marking) lives in layout.ts.
const pages = [index, notfound];
for (const p of pages) {
  const file = p.meta.slug === '' ? 'index.html' : `${p.meta.slug}.html`;
  writeFileSync(`${dist}/${file}`, p.html());
}
for (const meta of PROSE) {
  const { html, md } = prosePage(meta);
  writeFileSync(`${dist}/${meta.slug}.html`, html);
  // The Markdown mirror, verbatim: GitHub Pages serves it as plain text, which
  // still parses for any agent that fetches it; robots.txt disallows it so the
  // mirror is not indexed as a duplicate (no X-Robots-Tag on Pages).
  writeFileSync(`${dist}/${meta.slug}.md`, md);
}

// Byte-exact passthroughs and static payload. privacy.html deliberately keeps
// its own standalone legal chrome (aside + back link) and does NOT get the
// shared nav: byte-parity with the product repo's authoritative copy outranks
// chrome uniformity, and that copy is gated against its siblings over there.
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
${PROSE.map(m => `Disallow: /${m.slug}.md`).join('\n')}

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
${PROSE.map(m => `- [${m.title}](${ORIGIN}/${m.slug}.md): ${m.description}`).join('\n')}
- [Privacy policy](${ORIGIN}/privacy.html): what the application sends, stores and never collects

## Ecosystem

- The spintax language, docs and playground: https://spintax.net/llms.txt
`,
);

console.log(`built ${pages.length} pages + passthroughs -> ${dist}/`);
