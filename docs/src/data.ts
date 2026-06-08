import type { Lang, RawFile } from "./types.ts";

const rawModules = {
  ...import.meta.glob("../../README.md", { eager: true, query: "?raw", import: "default" }),
  ...import.meta.glob("../../CLAUDE.md", { eager: true, query: "?raw", import: "default" }),
  ...import.meta.glob("../../keybinding.jsonc", { eager: true, query: "?raw", import: "default" }),
  ...import.meta.glob("../../.vscode/*.json", { eager: true, query: "?raw", import: "default" }),
  ...import.meta.glob("../../.github/workflows/*.yml", {
    eager: true,
    query: "?raw",
    import: "default",
  }),
} as Record<string, string>;

const langByExt: Readonly<Record<string, Lang>> = {
  ".md": "md",
  ".ts": "ts",
  ".json": "json",
  ".jsonc": "jsonc",
  ".yml": "yaml",
  ".yaml": "yaml",
};

function langFromName(name: string): Lang {
  const dot = name.lastIndexOf(".");
  if (dot === -1) return "text";
  return langByExt[name.slice(dot).toLowerCase()] ?? "text";
}

function toRepoPath(viteKey: string): string {
  return viteKey.startsWith("../../") ? viteKey.slice("../../".length) : viteKey;
}

export const rawFiles: ReadonlyMap<string, RawFile> = new Map(
  Object.entries(rawModules).map(([key, content]) => {
    const path = toRepoPath(key);
    const name = path.split("/").pop() ?? path;
    return [
      path,
      {
        path,
        lang: langFromName(name),
        content,
        lineCount: content.split("\n").length,
      },
    ] as const;
  }),
);

export function rawFile(path: string): RawFile | undefined {
  return rawFiles.get(path);
}
