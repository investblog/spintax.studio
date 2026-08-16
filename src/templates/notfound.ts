import { PageMeta } from '../meta.js';
import { layout } from './layout.js';

export const meta: PageMeta = {
  slug: '404',
  title: 'Page not found - Spintax Studio',
  description: 'That page does not exist.',
};

const body = `    <section class="hero">
      <div class="shell hero-inner">
        <p class="hero-badge"><span class="badge">404</span></p>
        <h1>That page does not exist.</h1>
        <div class="hero-actions">
          <a class="button button-primary" href="/">Return to Spintax Studio</a>
        </div>
      </div>
    </section>`;

export const html = (): string => layout(meta, body);
