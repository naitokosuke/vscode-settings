# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Repository Overview

This is a personal VSCode settings repository containing custom configurations, keybindings, and extension recommendations. The repository is purely configuration-based with no build, test, or lint commands.

## Repository Structure

```
/
├── .vscode/
│   ├── extensions.json     # VSCode extension recommendations
│   └── settings.json       # VSCode workspace settings  
└── keybinding.jsonc        # Custom keyboard shortcuts
```

## Key Files and Their Purpose

### keybinding.jsonc

Custom keyboard shortcuts including:
- `shift+space` for autocomplete (replaces default `ctrl+space` due to IME switching)
- `ctrl+w` for window switching
- `alt+a` for Emmet wrap
- Claude-specific bindings (`shift+enter` for multiline, `ctrl+escape` to run)

### .vscode/settings.json

Comprehensive VSCode configuration organized by sections:
- Visuals: Catppuccin themes, Input Mono font, UI customizations
- Editor: Tab size 2, auto-closing tags, ESLint integration
- Git: Auto-fetch, smart commit settings
- Terminal: Zsh shell, Menlo font
- Search: Exclusions for node_modules, lock files, build directories

### .vscode/extensions.json

Curated list of recommended extensions including development tools, UI improvements, and Claude Code extension.

## Important Context

1. Language: Configuration includes Japanese comments and IME-related settings
2. Platform: Some settings are macOS-specific (e.g., `window.nativeTabs`)
3. No build system: This is purely a configuration repository - no npm scripts, build tools, or tests
4. Active maintenance: Regularly updated based on recent commit history

## Working with This Repository

When modifying configurations:
- Preserve existing formatting and comment style
- Maintain the organized section structure in settings.json
- Test keybinding changes don't conflict with existing shortcuts
- Consider Japanese IME compatibility for any keyboard-related changes
