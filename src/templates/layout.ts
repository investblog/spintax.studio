import { CANON_URL, CONTACT_URL, OG_IMAGE, PageMeta, SITE_NAME, SOURCE_URL, canonical } from '../meta.js';

/**
 * The shared chrome. The theme is decided BEFORE first paint by the inline
 * script: stored choice, else the OS preference, else dark — the pre-revamp
 * site wrote the choice to localStorage but never read it back, so a chosen
 * light theme lasted exactly one page view.
 */
const THEME_BOOT = `(function(){try{var t=localStorage.getItem('spintax-theme');` +
  `if(t!=='light'&&t!=='dark'){t=matchMedia('(prefers-color-scheme: light)').matches?'light':'dark';}` +
  `document.documentElement.dataset.theme=t;}catch(e){}})();`;

export function layout(meta: PageMeta, body: string, extraNav = ''): string {
  const url = canonical(meta.slug);
  const cur = (k: string) => (meta.nav === k ? ' aria-current="page"' : '');
  return `<!doctype html>
<html lang="en" data-theme="dark">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="description" content="${meta.description}">
  <meta property="og:site_name" content="${SITE_NAME}">
  <meta property="og:title" content="${meta.title}">
  <meta property="og:description" content="${meta.description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${OG_IMAGE}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="theme-color" content="#141414">
  <link rel="canonical" href="${url}">
  <title>${meta.title}</title>
  <link rel="icon" href="/assets/spintax-mark.svg" type="image/svg+xml">
  <link rel="icon" href="/assets/favicon.ico" sizes="32x32">
  <link rel="apple-touch-icon" href="/assets/apple-touch-icon.png">
  <link rel="stylesheet" href="/styles.css">
  <script>${THEME_BOOT}</script>
</head>
<body>
  <a class="skip-link" href="#main">Skip to content</a>
  <header class="site-header">
    <div class="shell nav-wrap">
      <a class="brand" href="/" aria-label="Spintax Studio home">
        <img src="/assets/spintax-mark.svg" alt="" width="34" height="34">
        <span>Spintax Studio</span>
      </a>
      <nav id="site-nav" aria-label="Primary navigation">
        <a href="/#product"${cur('product')}>Product</a>
        <a href="/#workflow">How it works</a>${extraNav}
        <a href="/privacy.html"${cur('privacy')}>Privacy</a>
      </nav>
      <button class="icon-button mobile-toggle" id="mobile-toggle" type="button" aria-label="Open menu" aria-expanded="false" aria-controls="site-nav">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg>
      </button>
    </div>
  </header>

  <main id="main">
${body}
  </main>

  <footer class="site-footer">
    <div class="shell footer-wrap">
      <div class="brand footer-brand"><img src="/assets/spintax-mark.svg" alt="" width="28" height="28"><span>Spintax Studio</span></div>
      <p>Native Windows editor for spintax templates.</p>
      <div class="footer-links"><a href="/privacy.html">Privacy policy</a><a href="${CONTACT_URL}" target="_blank" rel="noopener">Contact</a><a href="${SOURCE_URL}" target="_blank" rel="noopener">Source</a><a href="${CANON_URL}" target="_blank" rel="noopener">spintax.net</a></div>
    </div>
  </footer>
  <script src="/site.js" defer></script>
</body>
</html>
`;
}
