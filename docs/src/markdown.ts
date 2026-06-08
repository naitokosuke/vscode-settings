import { escapeHtml } from "./syntax.ts";

/**
 * Inline-only Markdown for short prose: `code`, **bold**, and
 * [text](url). Block structure is the caller's job. Links open in a
 * new tab. Everything else is HTML-escaped first, so the input is
 * never trusted as raw HTML.
 */
export function renderInline(text: string): string {
  return escapeHtml(text)
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(
      /\[([^\]]+)\]\(([^)]+)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>',
    );
}

/** Like {@link renderInline}, but splits blank-line-separated paragraphs. */
export function renderProse(text: string): string {
  return text
    .trim()
    .split(/\n\s*\n/)
    .map((p) => `<p>${renderInline(p.replace(/\s+/g, " "))}</p>`)
    .join("");
}
