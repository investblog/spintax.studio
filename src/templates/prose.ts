import { readFileSync } from 'node:fs';
import { PageMeta } from '../meta.js';
import { layout } from './layout.js';
import { mdToHtml } from '../md.js';

/** A prose page rendered from content/<slug>.md; the .md itself ships as the mirror. */
export function prosePage(meta: PageMeta): { html: string; md: string } {
  const md = readFileSync(`content/${meta.slug}.md`, 'utf8');
  const body = `    <section class="section section-product">
      <div class="shell prose-shell">
${mdToHtml(md)}
      </div>
    </section>`;
  return { html: layout(meta, body), md };
}
