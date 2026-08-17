# spintax.studio — backlog

Decisions live in [`decisions/`](decisions/).

## The 2026-08-16 revamp — SHIPPED, three releases the same day

- [x] Privacy republish — the site carries the 14-August policy that describes
      the optional AI connection (the Store's own privacy copy had carried it
      since the 0.2.0.0 submission; the site copy was the laggard).
- [x] tsx generator + build-layer port (docs and dist link checkers, textless
      og.png + favicon set, git-dated sitemap with XSL, llms.txt, IndexNow);
      `pages.yml` builds and deploys `dist/`. Two old defects died in passing:
      the theme choice is restored from localStorage, and 404 got the site
      chrome.
- [x] Landing rewritten for 0.2.0.0 — the "does not include generative AI"
      claim is gone; the AI section is worded from the proofread Store listing,
      with capture-kit screenshots as lossless WebP.
- [x] `ecosystem` + `ai` pages, rendered from `content/*.md`; the Markdown
      ships verbatim as agent-facing mirrors (llms.txt lists them, robots.txt
      disallows them — no X-Robots-Tag on Pages).

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
