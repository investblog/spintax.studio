# 0001 — Hosting stays on GitHub Pages; four named triggers move it to Cloudflare

Date: 2026-08-16 · Status: active · Owner's decision after comparing against a
sibling site (the 301.sh blog) deployed on Cloudflare Workers Static Assets.

## Decision

The site stays where it is: GitHub Pages, deployed by
`.github/workflows/pages.yml`, custom domain via `CNAME`. The revamp invests in
the **build layer** (the portable nine-tenths of 301.sh's quality: OG assets,
link/translation checkers, llms.txt + Markdown mirrors, sitemap, IndexNow) and
deliberately not in hosting.

## Why

"The 301.sh level" decomposes into two layers, measured by reading its scripts:

- **Build-time** — generator, OG cards, checkers, llms.txt/mirrors, sitemap
  logic. The scripts that carry it read `content/` or `dist/` and never import
  the site framework; all of it runs identically in a GitHub Actions workflow.
  Portable.
- **Edge-time** — `_headers` (CSP, `Content-Type: text/markdown` on mirrors,
  `X-Robots-Tag`, `Link:` discovery), `_redirects`, `Accept:` content
  negotiation, the `/mcp` worker, per-invocation logs. None of this exists on
  GitHub Pages, and none of it is needed by a 4-6 page product site. The one
  family MCP endpoint already lives on spintax.net.

What GitHub Pages costs us today, accepted with mitigations:

| Loss | Mitigation |
|---|---|
| No custom headers (CSP, Content-Type on `.md`) | `<meta http-equiv>` where expressible; mirrors served as text/plain still parse for agents |
| No `X-Robots-Tag` on mirrors | `robots.txt` `Disallow:` on the mirror paths |
| No `Link:` header discovery | HTML `<link rel="alternate">` elements |
| No real 301 redirects | none needed; if needed — that IS trigger #1 |
| No per-path Cache-Control | acceptable at this traffic |

## Triggers that reverse this decision

1. The site needs a real 301 (short links, moved URLs).
2. The site needs response headers it cannot fake in HTML (CSP with
   `frame-ancestors`, content-type on mirrors that matters in practice).
3. The site needs an endpoint on THIS domain (an API, an MCP server, a form).
4. The site needs server-side logs/observability.

Any one trigger → move to Cloudflare. The migration is cheap by construction:
the DNS zone is ALREADY on Cloudflare (`carlos/sara.ns.cloudflare.com`, measured
2026-08-16) and merely points at Pages IPs; `dist/` is portable as-is. Two
sibling sites already deploy each Cloudflare pattern (Pages, and Workers Static
Assets with the free-plan limits read live before choosing), so there is a
worked example to copy either way.

## Refused alternatives

- **Move now, ahead of need** — hosting work with no user-visible payoff while
  the live site publishes false product claims; the revamp's scarce resource is
  release order.
- **Split hosting** (site on Pages, an endpoint Worker on the same domain) —
  possible via Cloudflare routes because the zone is here, but it reintroduces
  the two-deploy-systems tax for a need that does not exist yet.
