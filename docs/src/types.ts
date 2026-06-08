export type Lang = "md" | "ts" | "json" | "jsonc" | "yaml" | "text";

/** An authoritative source backing a setting or a config file. */
export interface Reference {
  readonly label: string;
  readonly url: string;
}

/** One documented setting (or keybinding, or workflow step). */
export interface SettingDoc {
  /** The setting key / chord / step, rendered as a monospace token. */
  readonly key: string;
  /** The value this repo assigns it, if short enough to show inline. */
  readonly value?: string;
  /** Plain-language what-and-why. Supports inline `code`, **bold**, [links](url). */
  readonly summary: string;
  /** Authoritative references for this specific setting. */
  readonly refs?: readonly Reference[];
}

/** A titled group of related settings within a config file. */
export interface DocGroup {
  /** URL-fragment slug, unique within the file. */
  readonly id: string;
  readonly title: string;
  readonly intro?: string;
  readonly settings: readonly SettingDoc[];
}

/** A documented configuration file. */
export interface ConfigDoc {
  /** URL-fragment slug, unique across the site. */
  readonly id: string;
  /** Path of the real file in the repo (for the source view). */
  readonly path: string;
  readonly lang: Lang;
  readonly title: string;
  readonly tagline: string;
  /** Intro prose. Supports inline `code`, **bold**, [links](url). */
  readonly intro: string;
  /** The single most relevant reference for the whole file. */
  readonly primaryRef?: Reference;
  readonly groups: readonly DocGroup[];
}

/** Raw contents of a repo file, for the collapsible source view. */
export interface RawFile {
  readonly path: string;
  readonly lang: Lang;
  readonly content: string;
  readonly lineCount: number;
}
