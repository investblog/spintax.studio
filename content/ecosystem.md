# One language, three doors

Spintax Studio is one door into a larger family. The spintax language — choices,
shuffles, variables, conditions, directives — has a canonical home at
[spintax.net](https://spintax.net), and a set of **independent, open-source
engines** that implement it: JavaScript
([@spintax/core](https://www.npmjs.com/package/@spintax/core) on npm), PHP
(Packagist), Python (PyPI) and Object Pascal
([spintax-win](https://github.com/investblog/spintax-win) — the engine this
editor runs on). They are not one codebase compiled four ways: they are separate
implementations **held to one language behaviour by a shared test corpus**, so a
template you write behind any door means the same thing behind every other.

One honest limit of that promise: a random seed reproduces a result *within* an
engine, not across engines. Validity and meaning travel; exact draws do not.

## For people: Spintax Studio

A native Windows editor —
[live in the Microsoft Store](https://apps.microsoft.com/detail/9MW3CH7B530P).
Write a template, watch the engine render it beside your cursor, follow
diagnostics to the exact bracket, generate seeded variants and export them. It
works offline, and its optional [AI draft](/ai.html)
arrives checked by the engine.

## For pipelines: the n8n node

[n8n-nodes-spintax](https://www.npmjs.com/package/n8n-nodes-spintax) is a
community node for the n8n automation platform: render variants, lint a
template's output pool and measure its uniqueness — inside the same workflows
that already move your content around. It runs the JavaScript engine of the
family, held by the same corpus.

## For agents: the MCP server

[spintax.net/mcp](https://spintax.net/docs/) is a remote MCP server in the
official Model Context Protocol registry. It gives any MCP-capable agent three
tools — validate, render, analyze — backed by the reference engine. An agent
drafting spintax can check its work against the real engine instead of its own
self-report, which is the family's whole doctrine in one sentence. The
machine-readable index of the language docs lives at
[spintax.net/llms.txt](https://spintax.net/llms.txt).

## Why it is built this way

A template is a product: written once, verified by an engine, and then able to
generate controlled variation forever — deterministically, reproducibly, and
offline wherever the engine runs on your own machine (the remote MCP door is,
by its nature, the one that needs a connection). Every door above is a different audience reaching the same
guarantee. The language, the docs and the playground live at
[spintax.net](https://spintax.net); this site is the home of the Windows editor.
