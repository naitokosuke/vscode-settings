import type { Walkthrough } from "./types.ts";

interface Explanation {
  readonly about: string;
  readonly tags?: readonly string[];
  readonly walkthrough?: Walkthrough;
}

export const explanations: Readonly<Record<string, Explanation>> = {
  "README.md": {
    about: "Top-level README — what this repo is, the file map, and how it syncs into dotfiles.",
    tags: ["docs", "entry"],
    walkthrough: {
      intro:
        "The README is the front door: the single page that says what this repo is (a personal, version-controlled VS Code configuration), how it's laid out, and how it plugs into the wider [`naitokosuke/dotfiles`](https://github.com/naitokosuke/dotfiles) Nix environment. It also points at the interactive walkthrough you're reading right now.",
      sections: [
        {
          title: "What it is",
          prose:
            "A config-only repository — `settings.json`, `keybinding.jsonc`, and `extensions.json`, no build step. The README states that up front so a newcomer knows there's nothing to install or compile.",
        },
        {
          title: "Sync with dotfiles",
          prose:
            "The README documents the round-trip: the dotfiles flake pins this repo and renders the files via `home/vscode.nix`, while `.github/workflows/update-dotfiles.yml` pushes changes back. Editing settings here eventually reaches the real machine.",
        },
      ],
    },
  },

  "CLAUDE.md": {
    about: "Repo guidance for Claude Code — structure, conventions, and what not to break.",
    tags: ["docs", "ai"],
    walkthrough: {
      intro:
        "`CLAUDE.md` is the brief Claude Code reads before touching this repo. It states the one fact that changes everything downstream: this is a *pure configuration* repository — there is no build, test, or lint step, just JSON and JSONC. From there it lays out the file map, the macOS- and IME-specific gotchas, and the house rules: preserve the section comments, keep the organised structure, and never break Japanese IME compatibility when editing keybindings.",
      sections: [
        {
          title: "No build system",
          prose:
            "The most load-bearing line in the file. Because the repo is config-only, the usual `install → build → test` loop doesn't exist — the way to validate a change is to reason about VS Code's settings schema, not to run a command. That single constraint is why the rest of the guidance leans so hard on convention and review.",
        },
        {
          title: "House rules",
          prose:
            "Preserve existing formatting and the `// ====` section banners, keep `settings.json` organised by section, check keybindings for conflicts, and weigh Japanese IME compatibility on anything keyboard-related. These are the conventions every other file in the repo already follows.",
        },
      ],
    },
  },

  ".vscode/settings.json": {
    about:
      "The whole editor in one file — visuals, editor, git, terminal, ESLint, and file nesting.",
    tags: ["settings", "core", "entry"],
    walkthrough: {
      intro:
        "This is the heart of the repo: a single, heavily-sectioned `settings.json` that declares the entire VS Code experience. It's organised into labelled blocks — Visuals, Editor, Git, Terminal, Search, extension configs, and File Nesting — each fenced by a `// ==========` banner so the file stays navigable as it grows. Everything here is opinionated toward a quiet, minimal, keyboard-first editor that matches the surrounding Nix/Nushell environment.",
      sections: [
        {
          title: "Visuals — Catppuccin, auto light/dark",
          prose:
            "`window.autoDetectColorScheme` follows the OS appearance and swaps between **Catppuccin Macchiato** (dark) and **Catppuccin Latte** (light) automatically. The matching `catppuccin-macchiato` icon theme and the `Input Mono` editor font round out the look. Chrome is stripped back — the command center, layout control, and tips are all off.",
          lines: [8, 30],
        },
        {
          title: "Right sidebar, left tab actions",
          prose:
            "`workbench.sideBar.location` moves the Explorer to the right edge — the same layout the companion docs site mirrors. Tab close buttons go on the left (`tabActionLocation`), the tree indent is tightened to 10px, and open editors are capped at 5 per group so tab strips never sprawl.",
          lines: [20, 23],
        },
        {
          title: "Editor — tabs, auto-close, ESLint on save",
          prose:
            "Two-space tabs, `ctrlCmd` multi-cursor, and `recentlyUsedByPrefix` suggestions. Linked editing plus `html.autoClosingTags` / `js/ts.autoClosingTags` give auto-rename-tag behaviour. On save, only ESLint's fixer runs (`source.fixAll.eslint: explicit`) — the blanket `source.fixAll` and `organizeImports` are deliberately left `never` so saves stay predictable.",
          lines: [47, 56],
        },
        {
          title: "Terminal — Nushell from the Nix store",
          prose:
            "The default macOS terminal profile is `nu`, pointed straight at the Nushell binary that home-manager installs at `/etc/profiles/per-user/naitokosuke/bin/nu`. That hard path is the seam where this repo meets the dotfiles flake — the same Nushell that's the interactive shell everywhere else.",
          lines: [73, 84],
        },
        {
          title: "Custom tab labels for Vue/Nuxt",
          prose:
            "A nest of `index.vue` / `index.ts` files all read 'index' in the tab strip otherwise. `workbench.editor.customLabels.patterns` rewrites them to show the parent directory instead — `${dirname} .../${dirname(1)}` — so a dozen open `index.vue` tabs become legible at a glance.",
          lines: [92, 97],
        },
        {
          title: "ESLint — quiet IDE, still auto-fixes",
          prose:
            "The philosophy here is 'don't nag, but still fix'. `eslint.quiet` hides warnings from the editor, and `rules.customizations` switches every stylistic / formatting rule (`*-indent`, `*quotes`, `*semi`, …) to `off` for *display* — yet they're still applied by the on-save fixer. You get clean code without a wall of squiggles.",
          lines: [153, 166],
        },
        {
          title: "File nesting — antfu's config + colocated memos",
          prose:
            'Built on [antfu\'s vscode-file-nesting-config](https://github.com/antfu/vscode-file-nesting-config), this collapses lockfiles, configs, and siblings under their parent. The personal twist is the `"*": "$(capture).naito.md, $(capture).*.naito.md"` rule, which tucks colocated `.naito.md` memo files directly under the source file they annotate.',
          lines: [291, 291],
        },
      ],
    },
  },

  ".vscode/extensions.json": {
    about: "The curated set of recommended extensions for this workspace.",
    tags: ["extensions", "recommendations"],
    walkthrough: {
      intro:
        "`extensions.json` is the workspace's recommendation list — open the repo and VS Code offers to install exactly this set. It's a tight, intentional toolbelt rather than a kitchen sink: inline diagnostics, spell-checking, Git insight, the Catppuccin theme + icons, and a clearly-fenced 'Now I'm Trying' block at the bottom for extensions on probation. The comments carry the intent (Japanese-compatibility caveats, what's experimental).",
      sections: [
        {
          title: "The daily drivers",
          prose:
            "`errorlens` surfaces diagnostics inline, `code-spell-checker` catches typos, `gitlens` adds blame and history, and the two `Catppuccin` entries supply the theme and icon set wired up in `settings.json`. `anthropic.claude-code` ties the editor to Claude Code.",
        },
        {
          title: "On probation — 'Now I'm Trying'",
          prose:
            "The trailing block is honest about what's still being evaluated — IntelliCode, `turbo-console-log`, `version-lens`, `unsaved-files`. Keeping it fenced off makes it easy to promote a keeper or drop an extension that didn't earn its place.",
        },
      ],
    },
  },

  "keybinding.jsonc": {
    about: "Custom keyboard shortcuts — IME-aware navigation and Claude Code chords.",
    tags: ["keybindings", "ime", "claude"],
    walkthrough: {
      intro:
        "A small, deliberate set of keybinding overrides. The theme is staying out of the way of the Japanese IME and the terminal: every binding here was chosen so it doesn't collide with input-source switching or with Nushell / Claude Code running in the integrated terminal. The file is JSONC so each chord can carry a comment explaining when it applies.",
      sections: [
        {
          title: "Window & Emmet",
          prose:
            "`ctrl+w` is remapped to `quickSwitchWindow` (cycling windows, not closing tabs), and `alt+a` wraps the selection with an Emmet abbreviation — handy in markup-heavy Vue files.",
          lines: [2, 9],
        },
        {
          title: "Find inside explorers",
          prose:
            "`alt+cmd+f` triggers `list.find` so the type-to-filter search works while a tree view (Explorer, search results) has focus, instead of only in the editor.",
          lines: [11, 15],
        },
        {
          title: "Claude Code chords",
          prose:
            "Two bindings wire the keyboard to Claude Code. `shift+enter` sends the raw escape sequence `\\u001b\\r` to the terminal — the chord Claude reads as a soft newline — but only `when: terminalFocus`, so it never hijacks Enter elsewhere. `ctrl+escape` opens the Claude terminal panel directly.",
          lines: [16, 30],
        },
      ],
    },
  },

  ".github/workflows/update-dotfiles.yml": {
    about: "CI bridge — pushes settings changes back into the dotfiles Nix flake.",
    tags: ["ci", "dotfiles", "sync"],
    walkthrough: {
      intro:
        "This workflow is the reciprocal half of the link between this repo and [`naitokosuke/dotfiles`](https://github.com/naitokosuke/dotfiles). The dotfiles flake pins this repo as an input and materialises `settings.json` / `keybindings.json` through `home/vscode.nix`. When the config changes here, this job pokes the flake to pull the new revision — so a settings tweak propagates to the actual machine on the next `darwin-rebuild`.",
      sections: [
        {
          title: "Trigger",
          prose:
            "It runs on push to `main`, but only when `.vscode/**` or `keybinding.jsonc` actually changed — a docs-only or README commit won't churn the flake.",
          lines: [3, 8],
        },
        {
          title: "Update the flake input",
          prose:
            "The job checks out the *dotfiles* repo (with a PAT), installs Nix, and runs `nix flake update vscode-settings` to bump just this input's locked revision in `flake.lock`.",
          lines: [10, 27],
        },
        {
          title: "Open a PR",
          prose:
            "`peter-evans/create-pull-request` opens a PR against dotfiles with the refreshed lock on a `update-vscode-settings-flake` branch, `delete-branch: true` so it self-cleans after merge. The dotfiles side reviews and merges to take the change.",
          lines: [29, 41],
        },
      ],
    },
  },

  "docs/AGENTS.md": {
    about: "Agent operating guide for this Vite+ web app.",
    tags: ["docs", "web"],
    walkthrough: {
      intro:
        "This file is read by automated agents (Claude Code and friends) when they touch the web app you're looking at. It points at the Vite+ docs and enumerates the validation flow — `vp install` → `vp check` → `vp test` — that every change to `docs/` should pass through. The site itself is built by that same `vp` toolchain.",
    },
  },
};
