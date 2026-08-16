/** One place for every site-wide fact a template may state. */
export const ORIGIN = 'https://spintax.studio';
export const SITE_NAME = 'Spintax Studio';
export const STORE_URL = 'https://apps.microsoft.com/detail/9MW3CH7B530P';
export const PRODUCT_VERSION = '0.2.0.0';
export const CONTACT_URL = 'https://301.st/contact';
export const SOURCE_URL = 'https://github.com/investblog/spintax-studio';
export const ENGINE_URL = 'https://github.com/investblog/spintax-win';
export const CANON_URL = 'https://spintax.net';
export const OG_IMAGE = `${ORIGIN}/assets/og.png`;

export interface PageMeta {
  /** Path from site root, '' for the landing ('' -> /, 'ecosystem' -> /ecosystem.html). */
  slug: string;
  title: string;
  description: string;
  /** Nav item to mark with aria-current, if any. */
  nav?: 'product' | 'ecosystem' | 'ai' | 'privacy';
}

export const canonical = (slug: string): string =>
  slug === '' ? `${ORIGIN}/` : `${ORIGIN}/${slug}.html`;
