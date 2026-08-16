// Sitemap over the built pages: URL list owned here, lastmod asked of git —
// the last commit that touched each page's SOURCES, so a rebuild without a
// content change does not move the date. The xml-stylesheet PI renders the
// file readably in a browser via /sitemap.xsl (ported from the sibling blog).
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const ORIGIN = 'https://spintax.studio';

// url path -> the sources whose history dates it
const PAGES = [
  ['/', ['src/templates/index.ts', 'src/templates/layout.ts', 'src/meta.ts']],
  ['/privacy.html', ['privacy.html']],
  ['/ecosystem.html', ['content/ecosystem.md', 'src/templates/prose.ts', 'src/templates/layout.ts', 'src/md.ts', 'src/meta.ts']],
  ['/ai.html', ['content/ai.md', 'src/templates/prose.ts', 'src/templates/layout.ts', 'src/md.ts', 'src/meta.ts']],
];

function lastmod(sources) {
  try {
    const out = execFileSync('git', ['log', '-1', '--format=%cs', '--', ...sources], {
      encoding: 'utf8',
    }).trim();
    return out || new Date().toISOString().slice(0, 10);
  } catch {
    return new Date().toISOString().slice(0, 10);
  }
}

const urls = PAGES.map(
  ([path, sources]) =>
    `  <url>\n    <loc>${ORIGIN}${path}</loc>\n    <lastmod>${lastmod(sources)}</lastmod>\n  </url>`,
).join('\n');

writeFileSync(
  'dist/sitemap.xml',
  `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`sitemap: ${PAGES.length} urls`);
