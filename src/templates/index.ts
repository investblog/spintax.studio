import { CANON_URL, ENGINE_URL, PRODUCT_VERSION, PageMeta, STORE_URL } from '../meta.js';
import { layout } from './layout.js';

export const meta: PageMeta = {
  slug: '',
  title: 'Spintax Studio - Native Windows editor for spintax',
  description:
    'Spintax Studio is a native Windows editor for writing, validating, previewing and exporting spintax templates offline - with an optional, engine-verified AI draft.',
  nav: 'product',
};

/*
 * Every product claim on this page traces to the proofread Store listing or the
 * shipped help (spintax-studio/docs/store-listing.md, docs/help/). The two
 * standing land-mines are avoided by construction: engines are INDEPENDENT and
 * held by a shared corpus (never "the same engine everywhere"), and the AI is a
 * client to the user's endpoint (never "local AI" and never "includes a model").
 */
const body = `    <section class="hero">
      <div class="shell hero-inner">
        <p class="hero-badge"><span class="badge">Native Windows editor / ${PRODUCT_VERSION} in the Microsoft Store</span></p>
        <h1>Write one controlled template.</h1>
        <p class="hero-lede">Inspect what it means. Generate distinct variants locally.</p>
        <div class="hero-actions">
          <a class="button button-primary" href="${STORE_URL}" target="_blank" rel="noopener">Get it from Microsoft Store</a>
          <a class="button button-secondary" href="#product">Explore the workflow</a>
        </div>
        <ul class="facts" aria-label="Release facts">
          <li>Windows x64</li>
          <li>Works offline</li>
          <li>Optional AI draft - your provider, your key</li>
          <li>No account required</li>
        </ul>
      </div>
    </section>

    <section id="product" class="section section-product">
      <div class="shell">
        <div class="section-intro">
          <p class="eyebrow">A readable authoring loop</p>
          <h2>Everything stays visible.</h2>
          <p>Template, rendered result and diagnostics share one focused workspace.</p>
        </div>
        <figure class="product-shot product-shot-wide">
          <div class="shot-bar"><span></span><span></span><span></span><strong>Spintax Studio</strong></div>
          <picture>
            <source srcset="/assets/shots/editor.webp" type="image/webp">
            <img src="/assets/shots/editor.png" alt="Spintax Studio showing a template editor beside its rendered page preview" width="1500" height="890" loading="lazy">
          </picture>
          <figcaption>Template, live preview and engine diagnostics in one window.</figcaption>
        </figure>
      </div>
    </section>

    <section class="section section-light">
      <div class="shell">
        <div class="section-intro section-intro-left">
          <p class="eyebrow">The product</p>
          <h2>Every decision stays visible.</h2>
          <p>Spintax Studio is built around the moment an author changes a template and needs to know what happened next.</p>
        </div>
        <div class="feature-list">
          <article class="feature-row">
            <div class="feature-index">01</div>
            <div>
              <h3>Write with the language</h3>
              <p>Bracket matching, syntax colours and a fixed-pitch editor keep alternatives, variables, conditions and directives easy to scan.</p>
            </div>
          </article>
          <article class="feature-row">
            <div class="feature-index">02</div>
            <div>
              <h3>See the result immediately</h3>
              <p>The preview is rendered by a real engine of the Spintax family, not a second parser's approximation - and a shared test corpus holds the family's engines to one behaviour.</p>
            </div>
          </article>
          <article class="feature-row">
            <div class="feature-index">03</div>
            <div>
              <h3>Fix the cause, not the symptom</h3>
              <p>Diagnostics point to the source position, explain the rule and connect to built-in help with measured examples - in fourteen interface languages.</p>
            </div>
          </article>
          <article class="feature-row">
            <div class="feature-index">04</div>
            <div>
              <h3>Generate and export locally</h3>
              <p>Inspect variables and includes, edit groups, generate seeded variants and export the result without a runtime or network service.</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section id="ai-draft" class="section section-product">
      <div class="shell">
        <div class="section-intro">
          <p class="eyebrow">New in 0.2</p>
          <h2>From your text to a template.</h2>
          <p>Paste the text you already have - or describe what you want - and Generate turns it into a richly varied template.</p>
        </div>
        <figure class="product-shot product-shot-wide">
          <div class="shot-bar"><span></span><span></span><span></span><strong>AI draft</strong></div>
          <picture>
            <source srcset="/assets/shots/ai.webp" type="image/webp">
            <img src="/assets/shots/ai.png" alt="The AI draft panel: plain text in the brief, the generated template applied to the document, its render in the preview" width="1500" height="890" loading="lazy">
          </picture>
          <figcaption>The draft is checked by the same engine that renders your preview, and it lands in the answer box - never in your document. Applying it with Insert or Replace is your own act.</figcaption>
        </figure>
        <div class="section-intro">
          <p>Bring your own AI provider - and your own key, when the endpoint needs one. There is no key or server of ours, and the connection is off until you turn it on. Prefer to keep the network out of it entirely? Copy the prepared prompt to any model and paste the draft back: that path needs no key and no connection.</p>
        </div>
      </div>
    </section>

    <section id="workflow" class="section section-dark">
      <div class="shell workflow-grid">
        <div>
          <p class="eyebrow">The workflow</p>
          <h2>From source to a checked result.</h2>
        </div>
        <ol class="workflow-steps">
          <li><span>01</span><div><strong>Author</strong><p>Compose the choices and rules that define your content - by hand, or from an AI draft the engine has checked.</p></div></li>
          <li><span>02</span><div><strong>Validate</strong><p>Follow a diagnostic to the exact bracket, directive or definition.</p></div></li>
          <li><span>03</span><div><strong>Preview</strong><p>Read the rendered page or inspect the generated source.</p></div></li>
          <li><span>04</span><div><strong>Export</strong><p>Generate deterministic variants and take the files where they belong.</p></div></li>
        </ol>
      </div>
    </section>

    <section class="section section-accent">
      <div class="shell release-grid">
        <div>
          <p class="eyebrow">Local by design</p>
          <h2>Offline is the default.</h2>
        </div>
        <div class="release-copy">
          <p>Spintax Studio needs no account and sends nothing anywhere by itself. Editing, validation, preview, variants and export all work with the network unplugged. The optional AI connection talks only to the endpoint you configured, only when you press the button that sends - and the privacy policy says exactly what travels and to whom.</p>
          <a class="text-link" href="/privacy.html">Read the full privacy policy <span aria-hidden="true">-&gt;</span></a>
        </div>
      </div>
    </section>

    <section class="section section-light family-section">
      <div class="shell family-grid">
        <div>
          <p class="eyebrow">One language family</p>
          <h2>Held together by a shared corpus.</h2>
        </div>
        <div>
          <p>Spintax Studio runs on the family's open-source Object Pascal engine. The family's implementations - JavaScript, PHP, Python, Object Pascal - are independent engines held to one language behaviour by a shared test corpus, so a template you write here means the same thing wherever it goes next. The language and its docs live at <a href="${CANON_URL}" target="_blank" rel="noopener">spintax.net</a>.</p>
          <a class="text-link" href="${ENGINE_URL}" target="_blank" rel="noopener">See the engine on GitHub <span aria-hidden="true">-&gt;</span></a>
        </div>
      </div>
    </section>`;

export const html = (): string => layout(meta, body);
