/**
 * A deliberately small Markdown renderer for the two prose pages. It covers
 * exactly what content/*.md uses — h1-h3, paragraphs, unordered lists, links,
 * bold, emphasis, inline code, blockquotes — and throws on a fence, because a
 * code block appearing in these files would deserve a real pipeline, not a
 * silent misrender. The .md source is ALSO published verbatim as the page's
 * agent-facing mirror, which is why the source of truth is Markdown and the
 * HTML is derived, never the other way around.
 */

function inline(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text, href) => {
      const ext = /^https?:/.test(href) && !href.startsWith('https://spintax.studio');
      return `<a href="${href}"${ext ? ' target="_blank" rel="noopener"' : ''}>${text}</a>`;
    });
}

export function mdToHtml(md: string): string {
  if (md.includes('```')) throw new Error('md.ts has no fence support on purpose — add it consciously');
  const out: string[] = [];
  const lines = md.split(/\r?\n/);
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (line.trim() === '') { i++; continue; }
    const h = line.match(/^(#{1,3}) (.*)$/);
    if (h) {
      const level = h[1].length;
      out.push(`<h${level}>${inline(h[2])}</h${level}>`);
      i++;
      continue;
    }
    if (line.startsWith('- ')) {
      const items: string[] = [];
      while (i < lines.length && lines[i].startsWith('- ')) {
        let item = lines[i].slice(2);
        // hanging indent continuation lines belong to the same item
        while (i + 1 < lines.length && /^  \S/.test(lines[i + 1])) { item += ' ' + lines[++i].trim(); }
        items.push(`<li>${inline(item)}</li>`);
        i++;
      }
      out.push(`<ul>\n${items.join('\n')}\n</ul>`);
      continue;
    }
    if (line.startsWith('> ')) {
      const quote: string[] = [];
      while (i < lines.length && lines[i].startsWith('> ')) quote.push(lines[i++].slice(2));
      out.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`);
      continue;
    }
    // paragraph: consume until blank line
    const para: string[] = [line];
    while (i + 1 < lines.length && lines[i + 1].trim() !== '' && !/^(#|- |> )/.test(lines[i + 1])) {
      para.push(lines[++i]);
    }
    out.push(`<p>${inline(para.join(' '))}</p>`);
    i++;
  }
  return out.join('\n');
}
