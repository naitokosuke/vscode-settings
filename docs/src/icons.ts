interface IconAttrs {
  readonly size?: number;
}

function svg(path: string, { size = 16 }: IconAttrs = {}): string {
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${path}</svg>`;
}

export const icons = {
  /** A static sliders glyph — the wordmark. No animation. */
  sliders: (a?: IconAttrs) =>
    svg(
      '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="17" x2="20" y2="17"/><circle cx="9" cy="7" r="2.4" fill="currentColor" stroke="none"/><circle cx="15" cy="17" r="2.4" fill="currentColor" stroke="none"/>',
      a,
    ),
  externalLink: (a?: IconAttrs) => svg('<path d="M7 17 17 7M9 7h8v8"/>', a),
  github: (a?: IconAttrs) =>
    svg(
      '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5a4.5 4.5 0 0 0-1.3-3.1c.4-1.1.4-2.3-.1-3.4 0 0-1.1-.3-3.5 1.3a12 12 0 0 0-6.2 0C6.5 2.2 5.5 2.5 5.5 2.5c-.5 1.1-.5 2.3-.1 3.4A4.5 4.5 0 0 0 4 9c0 3.5 3 5.5 6 5.5a4.8 4.8 0 0 0-1 3.5v4"/><path d="M9 18c-4 1.5-5-2-7-2"/>',
      a,
    ),
  sun: (a?: IconAttrs) =>
    svg(
      '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
      a,
    ),
  moon: (a?: IconAttrs) => svg('<path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/>', a),
  link: (a?: IconAttrs) =>
    svg(
      '<path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1.5 1.5"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1.5-1.5"/>',
      a,
    ),
  menu: (a?: IconAttrs) =>
    svg(
      '<line x1="4" y1="7" x2="20" y2="7"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="17" x2="20" y2="17"/>',
      a,
    ),
  close: (a?: IconAttrs) => svg('<path d="M18 6 6 18M6 6l12 12"/>', a),
  chevronDown: (a?: IconAttrs) => svg('<path d="m6 9 6 6 6-6"/>', a),
};
