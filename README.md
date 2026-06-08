# vscode-settings

My personal, version-controlled VS Code configuration — settings, keybindings, and the
extension recommendation set. It's pure config (JSON + JSONC), with no build, test, or
lint step, and it's wired into my [`naitokosuke/dotfiles`](https://github.com/naitokosuke/dotfiles)
Nix environment so a fresh machine boots the same editor.

> [!TIP]
> Prefer reading over the raw JSON? There's an interactive, VS Code-flavoured walkthrough
> of this repo under [`docs/`](./docs) — built with Vue 3 + [Void](https://void.app) + Vite+.

## Layout

| Path | What it is |
| --- | --- |
| [`.vscode/settings.json`](./.vscode/settings.json) | The whole editor — visuals (Catppuccin, auto light/dark), editor, git, terminal (Nushell), ESLint, and file nesting. |
| [`.vscode/extensions.json`](./.vscode/extensions.json) | The curated extension recommendation set. |
| [`keybinding.jsonc`](./keybinding.jsonc) | Custom shortcuts, tuned around the Japanese IME and Claude Code. |
| [`.github/workflows/update-dotfiles.yml`](./.github/workflows/update-dotfiles.yml) | CI that pushes config changes back into the dotfiles flake. |
| [`CLAUDE.md`](./CLAUDE.md) | Repo guidance for Claude Code. |
| [`docs/`](./docs) | The interactive walkthrough web app. |

## How it syncs with dotfiles

This repo doesn't install anything itself. Instead, the dotfiles flake pins it as an
input and materialises `settings.json` / `keybindings.json` through `home/vscode.nix`.
When the config changes here, the [`update-dotfiles`](./.github/workflows/update-dotfiles.yml)
workflow runs `nix flake update vscode-settings` against the dotfiles repo and opens a PR,
so an edit here reaches the actual machine on the next `darwin-rebuild`.

## The walkthrough app

```sh
cd docs
vp install   # or: pnpm install
vp dev       # start the dev server
```

The app reads the real config files straight from this repo at build time
(`import.meta.glob`), so the walkthrough never drifts from the actual settings.
See [`docs/CLAUDE.md`](./docs/CLAUDE.md) for the Vite+ toolchain notes.
