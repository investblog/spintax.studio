# Controlled variation, not opaque paraphrasing

Most AI content tooling runs a paraphrase loop: every text costs a model call,
no two runs agree, and nothing can be reproduced or audited. Spintax Studio is
built on the opposite idea.

> The model writes a **template**, once. The engine — not the model's
> self-report — decides whether it is valid. After that, every variant is free:
> deterministic, offline, and reproducible from a seed.

## How the loop works in Spintax Studio

Paste the text you already have — a product page, a letter, a description — or
write a short brief, and **Generate** turns it into a spintax template. The
draft is not taken on trust: it arrives checked by the same engine that renders
your preview, and it lands in the answer box, **never in your document**.
Applying it with Insert or Replace is your own act, and Insert respects your
selection. When the engine finds problems, **Fix** sends your document together with the
engine's diagnostics — line and column — back to the model for repair; the
[privacy policy](/privacy.html) states exactly what travels.

The connection is yours: your provider, your account, and your key when the
endpoint needs one. There is no key or server of ours, and the feature is off
until you turn it on. Prefer no connection at all? **Copy prompt** gives you the
same prepared prompt to paste into any model by hand; what you paste back is
judged by the engine like anything else in the answer box — validated and
rendered, though without the live loop's automatic repair round.

## What you get after the one model call

- **Volume without further cost.** The variants panel tells you how many
  variants the template can produce; generating them is local arithmetic, not
  API calls.
- **Reproducibility.** A seed regenerates the exact variant — an audit trail
  paraphrasing cannot offer.
- **A verdict you can trust.** Valid means the engine said so, with diagnostics
  at source positions when it did not.
- **Portability.** The template keeps its meaning and validity behind every
  door of the family; a seed reproduces a draw within an engine, not across —
  see [the ecosystem](/ecosystem.html).

## The same ground truth, for agents

AI agents get the identical referee: the family's MCP server at spintax.net
exposes validate, render and analyze tools backed by the reference engine, so an
agent drafting spintax can check its work the way Studio checks a draft — see
[the ecosystem page](/ecosystem.html).

## Reporting and privacy

Found an AI draft inappropriate? Write to **support@301.st** — the address is
shown in the application's About window. What the AI connection sends, where it
goes and what is stored is written down precisely in the
[privacy policy](/privacy.html).
