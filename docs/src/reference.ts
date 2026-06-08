import type { ConfigDoc } from "./types.ts";

/**
 * The documentation content. Every setting links to an authoritative
 * source: official VS Code docs, the Marketplace item page (whose
 * `itemName` matches the id in extensions.json), or the tool's own
 * site. Setting summaries describe the value this repo actually uses.
 */

const VSCODE_SETTINGS = "https://code.visualstudio.com/docs/configure/settings";
const VSCODE_DEFAULT_SETTINGS = "https://code.visualstudio.com/docs/reference/default-settings";
const VSCODE_KEYBINDINGS = "https://code.visualstudio.com/docs/configure/keybindings";
const VSCODE_THEMES = "https://code.visualstudio.com/docs/getstarted/themes";
const VSCODE_USERINTERFACE = "https://code.visualstudio.com/docs/getstarted/userinterface";
const VSCODE_CODEBASICS = "https://code.visualstudio.com/docs/editing/codebasics";
const VSCODE_TERMINAL_PROFILES = "https://code.visualstudio.com/docs/terminal/profiles";
const VSCODE_TERMINAL_ADVANCED = "https://code.visualstudio.com/docs/terminal/advanced";
const VSCODE_EMMET = "https://code.visualstudio.com/docs/editor/emmet";
const VSCODE_INTELLISENSE = "https://code.visualstudio.com/docs/editing/intellisense";

const mkt = (id: string): string => `https://marketplace.visualstudio.com/items?itemName=${id}`;

export const configDocs: readonly ConfigDoc[] = [
  // ────────────────────────────────────────────────────────────────
  {
    id: "settings",
    path: ".vscode/settings.json",
    lang: "json",
    title: "settings.json",
    tagline: "The whole editor, declared in one place.",
    intro:
      "This is the heart of the repo. It's a single, heavily-sectioned `settings.json` organised by `// ====` banners — Visuals, Editor, Git, Terminal, Search, extension configs, and File Nesting. The whole thing leans toward a quiet, minimal, keyboard-first editor that matches the surrounding Nix/Nushell environment. As a *workspace* settings file it applies to anyone who opens the repo; a few keys are flagged as belonging in User settings.",
    primaryRef: { label: "VS Code · Settings", url: VSCODE_SETTINGS },
    groups: [
      {
        id: "visuals",
        title: "Visuals & theme",
        intro: "Colour theme that follows the OS, a monospace UI, and stripped-back chrome.",
        settings: [
          {
            key: "window.autoDetectColorScheme",
            value: "true",
            summary:
              "Switches between a light and dark theme automatically as macOS flips appearance, using the `preferredLight`/`preferredDarkColorTheme` pair below.",
            refs: [{ label: "VS Code · Color themes", url: VSCODE_THEMES }],
          },
          {
            key: "workbench.preferredDark/LightColorTheme",
            value: "Catppuccin Macchiato / Latte",
            summary:
              "The two themes auto-detect picks from — **Catppuccin Macchiato** in the dark, **Latte** in the light. The matching `workbench.iconTheme` is `catppuccin-macchiato`.",
            refs: [
              { label: "Catppuccin for VS Code", url: mkt("Catppuccin.catppuccin-vsc") },
              { label: "Catppuccin Icons", url: mkt("Catppuccin.catppuccin-vsc-icons") },
            ],
          },
          {
            key: "editor.fontFamily",
            value: "Input Mono",
            summary:
              "The editor font is **Input Mono**, David Jonathan Ross's monospace family designed for code.",
            refs: [{ label: "Input typeface", url: "https://input.djr.com/" }],
          },
          {
            key: "window.commandCenter · workbench.layoutControl.enabled · workbench.tips.enabled",
            value: "false",
            summary:
              "Chrome removed: no command center in the title bar, no layout-control dropdown, no startup tips. The window stays calm.",
            refs: [{ label: "VS Code · Custom layout", url: VSCODE_USERINTERFACE }],
          },
          {
            key: "editor.cursorSmoothCaretAnimation · editor.smoothScrolling · workbench.list.smoothScrolling",
            value: "on / true",
            summary:
              "Smooth caret and smooth scrolling in the editor and lists, plus `workbench.fontAliasing: antialiased` — small motion-quality touches.",
            refs: [{ label: "VS Code · Settings", url: VSCODE_SETTINGS }],
          },
        ],
      },
      {
        id: "layout",
        title: "Workbench layout",
        intro: "Sidebar on the right, tab actions on the left, a tight tree, capped tab groups.",
        settings: [
          {
            key: "workbench.sideBar.location",
            value: "right",
            summary:
              "Moves the Explorer/SCM sidebar to the right edge, so the code column doesn't shift horizontally when the sidebar toggles.",
            refs: [{ label: "VS Code · User interface", url: VSCODE_USERINTERFACE }],
          },
          {
            key: "workbench.editor.tabActionLocation",
            value: "left",
            summary: "Puts the tab close button on the left of each tab rather than the right.",
            refs: [{ label: "VS Code · Settings", url: VSCODE_SETTINGS }],
          },
          {
            key: "workbench.tree.indent · workbench.tree.expandMode",
            value: "10 · singleClick",
            summary:
              "Tightens tree indentation to 10px and expands folders on a single click. `editor.lineNumbers: interval` numbers every tenth line.",
            refs: [{ label: "VS Code · Settings", url: VSCODE_SETTINGS }],
          },
          {
            key: "workbench.editor.limit.*",
            value: "enabled, 5 per group",
            summary:
              "Caps open editors at 5 per group and closes the least-recently-used when you exceed it, so tab strips never sprawl. `enablePreview` is off, so every open is a real tab.",
            refs: [{ label: "VS Code · Settings", url: VSCODE_SETTINGS }],
          },
          {
            key: "workbench.startupEditor",
            value: "newUntitledFile",
            summary: "Opens a fresh untitled file on startup instead of the Welcome page.",
            refs: [{ label: "VS Code · Settings", url: VSCODE_SETTINGS }],
          },
        ],
      },
      {
        id: "editor",
        title: "Editor behaviour",
        intro: "Two-space tabs, auto-close tags, predictable save actions.",
        settings: [
          {
            key: "editor.tabSize · files.eol · files.insertFinalNewline",
            value: "2 · \\n · true",
            summary:
              "Two-space indentation, Unix line endings, and a trailing newline on every file — the baseline this repo's projects assume.",
            refs: [{ label: "VS Code · Settings", url: VSCODE_SETTINGS }],
          },
          {
            key: "editor.linkedEditing · html.autoClosingTags · js/ts.autoClosingTags.enabled",
            value: "true",
            summary:
              "Auto-rename-tag behaviour: editing an opening tag updates its closing tag, and tags auto-close in HTML and JS/TS — handy in Vue files.",
            refs: [
              { label: "VS Code · HTML", url: "https://code.visualstudio.com/docs/languages/html" },
            ],
          },
          {
            key: "editor.codeActionsOnSave",
            value: "{ source.fixAll.eslint: explicit, … : never }",
            summary:
              "On save, only ESLint's fixer runs. The blanket `source.fixAll` and `source.organizeImports` are deliberately set to `never`, so saving never reorders imports or applies surprise fixes.",
            refs: [
              { label: "ESLint extension", url: mkt("dbaeumer.vscode-eslint") },
              { label: "VS Code · Settings", url: VSCODE_SETTINGS },
            ],
          },
          {
            key: "editor.multiCursorModifier",
            value: "ctrlCmd",
            summary:
              "Adds cursors with ⌘/Ctrl-click, freeing Alt-click for word selection and column selection.",
            refs: [
              {
                label: "VS Code · Multi-cursor",
                url: "https://code.visualstudio.com/docs/editing/codebasics#_multiple-selections-multicursor",
              },
            ],
          },
          {
            key: "editor.suggestSelection · editor.inlineSuggest.enabled",
            value: "recentlyUsedByPrefix · true",
            summary:
              "IntelliSense pre-selects the suggestion you last used for a given prefix, and inline (ghost-text) suggestions are enabled.",
            refs: [{ label: "VS Code · IntelliSense", url: VSCODE_INTELLISENSE }],
          },
          {
            key: "editor.unicodeHighlight.invisibleCharacters · ambiguousCharacters",
            value: "true",
            summary:
              "Flags invisible and look-alike Unicode characters in the editor — useful when copy-pasting and when working across Japanese/English text.",
            refs: [
              {
                label: "VS Code · Unicode highlighting",
                url: "https://code.visualstudio.com/updates/v1_63#_unicode-highlighting",
              },
            ],
          },
          {
            key: "editor.minimap.enabled · editor.showFoldingControls · editor.foldingImportsByDefault",
            value: "false · always · true",
            summary:
              "Minimap off, folding controls always visible, and import blocks folded by default to keep the top of files compact.",
            refs: [{ label: "VS Code · Folding", url: VSCODE_CODEBASICS }],
          },
        ],
      },
      {
        id: "explorer-git",
        title: "Explorer & Git",
        intro: "Fewer confirmation dialogs, and Git tuned for a fast solo workflow.",
        settings: [
          {
            key: "explorer.confirmDelete · confirmDragAndDrop",
            value: "false",
            summary:
              "Drops the 'are you sure?' prompts on delete and drag — paired with `compactFolders: false` so single-child folders still render on their own row.",
            refs: [{ label: "VS Code · Settings", url: VSCODE_SETTINGS }],
          },
          {
            key: "git.autofetch · git.enableSmartCommit · git.confirmSync",
            value: "true · true · false",
            summary:
              "Auto-fetches from the remote, lets you commit with nothing staged (commits all changes), and syncs without a confirmation dialog.",
            refs: [
              {
                label: "VS Code · Version control",
                url: "https://code.visualstudio.com/docs/sourcecontrol/overview",
              },
            ],
          },
          {
            key: "git.untrackedChanges",
            value: "separate",
            summary: "Lists untracked files in their own group in the Source Control view.",
            refs: [
              {
                label: "VS Code · Version control",
                url: "https://code.visualstudio.com/docs/sourcecontrol/overview",
              },
            ],
          },
        ],
      },
      {
        id: "terminal",
        title: "Integrated terminal",
        intro: "Nushell as the default shell, sourced from the Nix store.",
        settings: [
          {
            key: "terminal.integrated.defaultProfile.osx · profiles.osx",
            value: "nu → /etc/profiles/per-user/naitokosuke/bin/nu",
            summary:
              "The default macOS terminal profile is **Nushell**, pointed straight at the binary home-manager installs in the Nix per-user profile. That hard path is the seam where this repo meets the dotfiles flake.",
            refs: [
              { label: "VS Code · Terminal profiles", url: VSCODE_TERMINAL_PROFILES },
              { label: "Nushell", url: "https://www.nushell.sh/" },
            ],
          },
          {
            key: "terminal.integrated.fontFamily · cursorStyle · cursorBlinking",
            value: "Menlo · line · true",
            summary:
              "A blinking line cursor and Menlo at weight 300 in the terminal. `persistentSessionReviveProcess: never` means closed terminals don't resurrect their process on reload.",
            refs: [
              {
                label: "VS Code · Terminal",
                url: "https://code.visualstudio.com/docs/terminal/basics",
              },
            ],
          },
        ],
      },
      {
        id: "labels-search",
        title: "Editor labels & search",
        intro: "Disambiguated tab labels for Vue/Nuxt, and a curated search-exclude set.",
        settings: [
          {
            key: "workbench.editor.customLabels.patterns",
            value: "**/index.vue → ${dirname} …",
            summary:
              "A nest of `index.vue` / `index.ts` files all read 'index' in the tab strip otherwise. These glob→template rules rewrite the label to show the parent directory instead, so many open `index.vue` tabs stay legible.",
            refs: [
              {
                label: "VS Code · Customize tab labels",
                url: "https://code.visualstudio.com/docs/getstarted/userinterface#_customize-tab-labels",
              },
            ],
          },
          {
            key: "search.exclude",
            value: "node_modules, lockfiles, .pnpm, …",
            summary:
              "Keeps search results signal-heavy by excluding `node_modules`, lockfiles, `.git`, build caches, SVGs, `CHANGELOG`/`LICENSE`, and the personal `___naito___/` notes dir. `search.showLineNumbers` is on.",
            refs: [
              {
                label: "VS Code · Search",
                url: "https://code.visualstudio.com/docs/editing/codebasics#_search-across-files",
              },
            ],
          },
        ],
      },
      {
        id: "window-macos",
        title: "Window (macOS, User-level)",
        intro: "A few keys flagged as belonging in User settings rather than the workspace.",
        settings: [
          {
            key: "window.nativeTabs",
            value: "true",
            summary:
              "Opts into macOS native window tabs — a macOS-only setting, flagged in the file as one to keep in User settings.",
            refs: [{ label: "VS Code · Default settings reference", url: VSCODE_DEFAULT_SETTINGS }],
          },
          {
            key: "window.title · window.dialogStyle · window.newWindowDimensions",
            value: "${rootName} · custom · inherit",
            summary:
              "The title bar shows just the workspace root name, dialogs use VS Code's custom (non-native) style, and new windows inherit the current window's size.",
            refs: [
              {
                label: "VS Code · Variables reference",
                url: "https://code.visualstudio.com/docs/reference/variables-reference",
              },
            ],
          },
        ],
      },
      {
        id: "extension-configs",
        title: "Extension configuration",
        intro:
          "Per-extension settings. Each recommended extension is catalogued in extensions.json below; these are how they're tuned.",
        settings: [
          {
            key: "errorLens.*",
            value: "warning + error only",
            summary:
              "**Error Lens** inlines diagnostics next to the code. It's limited to warnings and errors, and excludes the `cSpell`, `Grammarly`, and `eslint` sources so it doesn't double up with their own UI.",
            refs: [{ label: "Error Lens", url: mkt("usernamehw.errorlens") }],
          },
          {
            key: "eslint.quiet · eslint.rules.customizations",
            value: "true · style/format → off",
            summary:
              "'Don't nag, but still fix.' `eslint.quiet` hides warnings in the editor, and the customizations switch every stylistic/formatting rule (`*-indent`, `*quotes`, `*semi`, …) to `off` for *display* — yet they're still applied by the on-save fixer.",
            refs: [{ label: "ESLint extension", url: mkt("dbaeumer.vscode-eslint") }],
          },
          {
            key: "cSpell.*",
            value: "allowCompoundWords, en+en-US",
            summary:
              "**Code Spell Checker** allows compound words and checks against both `en` and `en-US`.",
            refs: [
              { label: "Code Spell Checker", url: mkt("streetsidesoftware.code-spell-checker") },
            ],
          },
          {
            key: "gitlens.*",
            value: "codeLens off, curated menus",
            summary:
              "**GitLens** with CodeLens disabled (Error Lens covers inline annotations) and a hand-picked set of context-menu groups across editor, tabs, explorer, and SCM.",
            refs: [{ label: "GitLens", url: mkt("eamodio.gitlens") }],
          },
          {
            key: "claudeCode.preferredLocation · useTerminal · inlineChat.affordance",
            value: "panel · true · off",
            summary:
              "**Claude Code** opens in the panel and runs in a terminal. `inlineChat.affordance: off` hides the 'Ask for Edits' inline hint (see commit `#93`).",
            refs: [
              { label: "Claude Code extension", url: mkt("anthropic.claude-code") },
              { label: "Claude Code docs", url: "https://code.claude.com/docs/en/vs-code" },
              {
                label: "VS Code · Inline chat affordance",
                url: "https://code.visualstudio.com/docs/copilot/chat/inline-chat",
              },
            ],
          },
          {
            key: "iconify.* · svg.preview.mode · prettier.enable",
            value: "inplace · svg · false",
            summary:
              "**Iconify** previews icons inline, **jock.svg** renders SVGs as images, and the **Prettier** extension is disabled globally (ESLint owns formatting; Oxc formats Markdown).",
            refs: [
              { label: "Iconify IntelliSense", url: mkt("antfu.iconify") },
              { label: "SVG", url: mkt("jock.svg") },
              { label: "Prettier", url: mkt("esbenp.prettier-vscode") },
            ],
          },
          {
            key: "[markdown].editor.defaultFormatter",
            value: "oxc.oxc-vscode",
            summary: "Markdown files are formatted by the **Oxc** extension.",
            refs: [{ label: "Oxc VS Code", url: mkt("oxc.oxc-vscode") }],
          },
          {
            key: "hediet.vscode-drawio.*",
            value: "appearance: light",
            summary: "**Draw.io Integration** pinned to a light appearance for embedded diagrams.",
            refs: [{ label: "Draw.io Integration", url: mkt("hediet.vscode-drawio") }],
          },
        ],
      },
      {
        id: "file-nesting",
        title: "File nesting",
        intro: "antfu's community config, plus a personal colocated-memo rule.",
        settings: [
          {
            key: "explorer.fileNesting.enabled · expand · patterns",
            value: "true · false",
            summary:
              "Native VS Code file nesting collapses related files under a parent (lockfiles under `package.json`, `flake.lock` under `flake.nix`, and so on). The bulk of `patterns` is sourced from **antfu/vscode-file-nesting-config**.",
            refs: [
              {
                label: "VS Code 1.67 · File nesting",
                url: "https://code.visualstudio.com/updates/v1_67#_explorer-file-nesting",
              },
              {
                label: "antfu/vscode-file-nesting-config",
                url: "https://github.com/antfu/vscode-file-nesting-config",
              },
            ],
          },
          {
            key: '"*": "$(capture).naito.md, $(capture).*.naito.md"',
            summary:
              "The personal twist on top of antfu's set: any file nests its colocated `.naito.md` memo directly underneath it (see commit `#95`).",
            refs: [
              {
                label: "VS Code 1.67 · File nesting",
                url: "https://code.visualstudio.com/updates/v1_67#_explorer-file-nesting",
              },
            ],
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "keybindings",
    path: "keybinding.jsonc",
    lang: "jsonc",
    title: "keybinding.jsonc",
    tagline: "A handful of overrides, chosen to dodge the IME and the terminal.",
    intro:
      "A small, deliberate set of keybinding overrides. The theme is staying out of the way of the Japanese IME and the integrated terminal: every binding here was chosen so it doesn't collide with macOS input-source switching or with Nushell / Claude Code running in the terminal. It's JSONC, so each chord can carry a `//` comment.",
    primaryRef: { label: "VS Code · Key bindings", url: VSCODE_KEYBINDINGS },
    groups: [
      {
        id: "navigation",
        title: "Navigation & editing",
        settings: [
          {
            key: "ctrl+w → workbench.action.quickSwitchWindow",
            summary: "Reclaims ⌃W for cycling between windows instead of closing the active tab.",
            refs: [{ label: "VS Code · Key bindings", url: VSCODE_KEYBINDINGS }],
          },
          {
            key: "alt+a → editor.emmet.action.wrapWithAbbreviation",
            summary: "Wraps the current selection with an Emmet abbreviation — handy in markup.",
            refs: [{ label: "VS Code · Emmet", url: VSCODE_EMMET }],
          },
          {
            key: "alt+cmd+f → list.find",
            value: "when: list/tree focus",
            summary:
              "Enables type-to-find inside tree views (Explorer, search results) while they have focus, rather than only in the editor.",
            refs: [{ label: "VS Code · Key bindings", url: VSCODE_KEYBINDINGS }],
          },
        ],
      },
      {
        id: "claude",
        title: "Claude Code chords",
        settings: [
          {
            key: "shift+enter → terminal.sendSequence",
            value: "\\u001b\\r, when: terminalFocus",
            summary:
              "Sends the raw escape sequence `ESC` + `CR` to the terminal — the chord Claude Code reads as a soft newline. Scoped to `terminalFocus` so it never hijacks Enter elsewhere.",
            refs: [{ label: "VS Code · Terminal: sendSequence", url: VSCODE_TERMINAL_ADVANCED }],
          },
          {
            key: "ctrl+escape → claude-vscode.terminal.open",
            summary: "Opens the Claude Code terminal panel directly.",
            refs: [{ label: "Claude Code extension", url: mkt("anthropic.claude-code") }],
          },
        ],
      },
    ],
  },

  // ────────────────────────────────────────────────────────────────
  {
    id: "extensions",
    path: ".vscode/extensions.json",
    lang: "json",
    title: "extensions.json",
    tagline: "The curated recommendation set VS Code offers on open.",
    intro:
      "Open the repo and VS Code offers to install exactly this set. It's a tight, intentional toolbelt — inline diagnostics, spell-checking, Git insight, the Catppuccin theme + icons — with a fenced-off 'Now I'm Trying' block for extensions still on probation. Each link goes to the extension's Marketplace page.",
    primaryRef: {
      label: "VS Code · Workspace recommended extensions",
      url: "https://code.visualstudio.com/docs/editor/extension-marketplace#_workspace-recommended-extensions",
    },
    groups: [
      {
        id: "daily",
        title: "Daily drivers",
        settings: [
          {
            key: "usernamehw.errorlens",
            summary: "Inlines diagnostics next to the offending line.",
            refs: [{ label: "Marketplace", url: mkt("usernamehw.errorlens") }],
          },
          {
            key: "streetsidesoftware.code-spell-checker",
            summary: "Spell-checks code and comments.",
            refs: [{ label: "Marketplace", url: mkt("streetsidesoftware.code-spell-checker") }],
          },
          {
            key: "eamodio.gitlens",
            summary: "Blame, history, and rich Git context in the editor.",
            refs: [{ label: "Marketplace", url: mkt("eamodio.gitlens") }],
          },
          {
            key: "naumovs.color-highlight",
            summary: "Renders colour values with a swatch in place.",
            refs: [{ label: "Marketplace", url: mkt("naumovs.color-highlight") }],
          },
          {
            key: "mpontus.tab-cycle",
            summary: "Cycle through open tabs most-recently-used.",
            refs: [{ label: "Marketplace", url: mkt("mpontus.tab-cycle") }],
          },
          {
            key: "artdiniz.quitcontrol-vscode",
            summary: "Guards against accidental quit/close-window.",
            refs: [{ label: "Marketplace", url: mkt("artdiniz.quitcontrol-vscode") }],
          },
          {
            key: "jock.svg",
            summary: "SVG preview and tooling (drives `svg.preview.mode`).",
            refs: [{ label: "Marketplace", url: mkt("jock.svg") }],
          },
          {
            key: "iconify.iconify",
            summary:
              "Inline previews and IntelliSense for Iconify icons. **Heads-up:** this id 404s on the Marketplace — the currently published extension is `antfu.iconify`, so the recommendation looks stale.",
            refs: [{ label: "Marketplace (antfu.iconify)", url: mkt("antfu.iconify") }],
          },
          {
            key: "vsls-contrib.codetour",
            summary: "Recordable, replayable guided tours of a codebase.",
            refs: [{ label: "Marketplace", url: mkt("vsls-contrib.codetour") }],
          },
          {
            key: "anthropic.claude-code",
            summary: "Claude Code, wired to the panel and terminal.",
            refs: [{ label: "Marketplace", url: mkt("anthropic.claude-code") }],
          },
        ],
      },
      {
        id: "themes",
        title: "Themes",
        settings: [
          {
            key: "Catppuccin.catppuccin-vsc",
            summary: "The Catppuccin colour themes (Macchiato + Latte here).",
            refs: [{ label: "Marketplace", url: mkt("Catppuccin.catppuccin-vsc") }],
          },
          {
            key: "Catppuccin.catppuccin-vsc-icons",
            summary: "Matching Catppuccin file-icon theme.",
            refs: [{ label: "Marketplace", url: mkt("Catppuccin.catppuccin-vsc-icons") }],
          },
        ],
      },
      {
        id: "trying",
        title: "On probation — “Now I'm Trying”",
        intro: "Fenced off in the file so a keeper is easy to promote and a dud easy to drop.",
        settings: [
          {
            key: "yoavbls.pretty-ts-errors",
            summary: "Readable TypeScript error formatting (commented as unsure about Japanese).",
            refs: [{ label: "Marketplace", url: mkt("yoavbls.pretty-ts-errors") }],
          },
          {
            key: "VisualStudioExptTeam.vscodeintellicode",
            summary: "AI-assisted IntelliSense ranking.",
            refs: [{ label: "Marketplace", url: mkt("VisualStudioExptTeam.vscodeintellicode") }],
          },
          {
            key: "ChakrounAnas.turbo-console-log",
            summary: "Insert/remove `console.log` statements quickly.",
            refs: [{ label: "Marketplace", url: mkt("ChakrounAnas.turbo-console-log") }],
          },
          {
            key: "pflannery.vscode-versionlens",
            summary: "Shows latest versions inline in manifest files.",
            refs: [{ label: "Marketplace", url: mkt("pflannery.vscode-versionlens") }],
          },
          {
            key: "wraith13.unsaved-files-vscode",
            summary: "Surfaces and navigates unsaved files.",
            refs: [{ label: "Marketplace", url: mkt("wraith13.unsaved-files-vscode") }],
          },
        ],
      },
    ],
  },
];

export function docById(id: string): ConfigDoc | undefined {
  return configDocs.find((doc) => doc.id === id);
}
