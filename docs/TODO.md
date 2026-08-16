# spintax.studio — backlog

Decisions live in [`decisions/`](decisions/).

## In flight (the revamp plan, 2026-08-16)

- [x] Privacy republish — shipped 2026-08-16: the site now carries the
      14-August policy that describes the optional AI connection (the Store's
      own privacy copy had carried it since the 0.2.0.0 submission; the site
      copy was the laggard).
- [ ] tsx generator + 301.sh build-layer port (checkers, og.png, sitemap,
      llms.txt + md mirrors, IndexNow); `pages.yml` flips to `dist/`.
- [ ] Landing rewritten for 0.2.0.0 (the live page still claims "does not
      include generative AI in this release").
- [ ] `ecosystem` + `ai` pages.

## Later, deliberately not now

- [ ] **Pagefind search** — 301.sh runs it over `dist/`; pointless at 4-6 pages,
      revisit when the page count grows.
- [ ] **Localization** — EN-only by owner's decision 2026-08-16; the product
      ships 14 interface languages and 13 listing drafts exist as raw material
      if this ever flips.
- [ ] **OG cards with text** — build-og stays textless (librsvg font trap,
      documented in 301.sh); per-page text cards need the vendored-font
      approach from `build-og-cards.mjs` + `opentype.js`.
- [ ] **@spintax/mcp mention on the ecosystem page** — only after
      spintax-js#64 ships; a published claim needs a shipped thing.

## Hosting triggers (see decisions/0001)

The day the site needs real 301s, custom response headers, an endpoint, or
server-side logs — move to Cloudflare (two sibling sites already deploy each
pattern: Cloudflare Pages and Workers Static Assets).
