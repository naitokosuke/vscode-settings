<script setup lang="ts">
import { Link } from "@void/vue";
import Card from "../../primitives/Card.vue";
import DotGrid from "../../primitives/DotGrid.vue";
import Logo from "../../primitives/Logo.vue";

interface Entry {
  readonly label: string;
  readonly path: string;
  readonly blurb: string;
}

const entries: ReadonlyArray<Entry> = [
  {
    label: ".vscode/settings.json",
    path: ".vscode/settings.json",
    blurb: "The whole editor — visuals, editor, git, terminal, ESLint, file nesting.",
  },
  {
    label: "keybinding.jsonc",
    path: "keybinding.jsonc",
    blurb: "Custom shortcuts, tuned around the IME and Claude Code.",
  },
  {
    label: ".vscode/extensions.json",
    path: ".vscode/extensions.json",
    blurb: "The curated extension recommendation set.",
  },
];
</script>

<template>
  <div class="welcome-stage">
    <div class="welcome-bg" aria-hidden="true">
      <DotGrid />
      <Logo class="welcome-logo" variant="gear" />
    </div>
    <div class="welcome-inner">
      <h1><span class="user">naitokosuke</span><span class="slash">/</span>vscode-settings</h1>
      <p class="lede">
        A personal <strong>VS Code</strong>, declared as plain JSON. Settings, keybindings, and
        extension recommendations — version-controlled and synced into a
        <strong>Nix</strong> dotfiles flake, so a fresh machine boots the same editor. Every file
        below is read straight from the repo, so this walkthrough never drifts from the real
        <code>settings.json</code>.
      </p>
      <nav class="entry-row" aria-label="entry points">
        <Link
          v-for="entry in entries"
          :key="entry.path"
          class="entry-link"
          :href="`/file/${entry.path}`"
        >
          <Card interactive>
            <span class="entry-label">{{ entry.label }}</span>
            <span class="entry-blurb">{{ entry.blurb }}</span>
          </Card>
        </Link>
      </nav>
      <p class="attribution">
        Companion to
        <a href="https://github.com/naitokosuke/dotfiles" target="_blank" rel="noopener noreferrer"
          >naitokosuke/dotfiles</a
        >
        · synced via Nix
      </p>
    </div>
  </div>
</template>

<style scoped>
@import "../../breakpoints.css";

.welcome-stage {
  position: relative;
  overflow: hidden;
  isolation: isolate;
  min-width: 0;
  min-height: 0;
  height: 100%;

  .welcome-bg {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
  }

  /* Welcome-side framing for the gear primitive: pin it to the
     bottom-right corner so only the inner quadrant is visible, tint
     it via `color` (the primitive fills its shapes with `currentColor`),
     and rotate the inner `.rotor` group slowly. */
  .welcome-logo {
    --gear-size: clamp(560px, 92dvw, 1120px);
    position: absolute;
    width: var(--gear-size);
    aspect-ratio: 1;
    right: calc(var(--gear-size) * -0.5);
    bottom: calc(var(--gear-size) * -0.5);
    color: light-dark(rgba(0, 0, 0, 0.085), rgba(255, 255, 255, 0.075));
    filter: blur(0.4px);

    :deep(.rotor) {
      animation: welcome-logo-spin 240s linear infinite;
    }
  }

  .welcome-inner {
    position: relative;
    z-index: 1;
    padding-block: clamp(36px, 6cqi, 80px);
    padding-inline: clamp(20px, 5.5cqi, 56px);
    overflow-y: auto;
    overflow-x: hidden;
    max-width: 1040px;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: safe center;
    gap: clamp(18px, 2.6cqi, 32px);
    box-sizing: border-box;
    overscroll-behavior: contain;

    h1 {
      margin: 0;
      font-size: clamp(22px, 8.2vw, 84px);
      line-height: 1;
      font-weight: 600;
      letter-spacing: -0.045em;
      white-space: nowrap;
      color: var(--fg-strong);

      .slash {
        color: var(--fg-subtle);
        margin-inline: 0.04em;
        font-weight: 200;
      }

      .user {
        font-weight: 300;
        color: var(--fg-muted);
      }
    }

    .lede {
      margin: 0;
      font-size: clamp(15px, 1.4vw, 18px);
      line-height: 1.7;
      color: var(--fg);
      max-width: 62ch;
      text-wrap: pretty;

      strong {
        color: var(--fg-strong);
        font-weight: 600;
      }

      code {
        font-family: var(--font-mono);
        font-size: 0.86em;
        padding: 1px 6px;
        border: 1px solid var(--border-1);
        border-radius: 4px;
        background: light-dark(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.03));
        color: var(--fg-strong);
        overflow-wrap: anywhere;
        word-break: break-word;
      }
    }

    .entry-row {
      display: grid;
      grid-template-columns: repeat(3, minmax(0, 1fr));
      grid-auto-rows: 1fr;
      gap: 8px;
      margin-top: 4px;

      .entry-link {
        display: grid;
        height: 100%;
        text-decoration: none;
        color: inherit;
      }

      /* Stretch the card primitive to fill the row so every card in the
         row shares the tallest card's height regardless of blurb length. */
      :deep(.card) {
        height: 100%;
        align-content: start;
      }

      .entry-label {
        font-family: var(--font-mono);
        font-size: 14px;
        font-weight: 600;
        letter-spacing: -0.01em;
        color: var(--fg-strong);
      }

      .entry-blurb {
        font-size: 12.5px;
        line-height: 1.55;
        color: var(--fg-muted);
        text-wrap: pretty;
      }
    }

    .attribution {
      margin: 36px 0 0;
      font-family: var(--font-mono);
      font-size: 10.5px;
      letter-spacing: 0.04em;
      color: var(--fg-subtle);

      a {
        color: var(--fg-muted);
        border-bottom: 1px solid transparent;
        transition:
          color 180ms var(--easing),
          border-color 180ms var(--easing);

        &:hover {
          color: var(--fg-strong);
          border-bottom-color: currentColor;
        }
      }
    }
  }

  @media (--tablet) {
    .welcome-inner .entry-row {
      grid-template-columns: 1fr;
    }
  }

  @media (--phone) {
    .welcome-inner {
      padding: 28px 22px 24px;
      justify-content: flex-start;
      gap: 24px;

      .lede {
        font-size: 14px;
      }
    }
  }
}

@keyframes welcome-logo-spin {
  to {
    rotate: 360deg;
  }
}
</style>
