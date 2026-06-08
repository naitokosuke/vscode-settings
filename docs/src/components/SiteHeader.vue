<script setup lang="ts">
import { icons } from "../icons.ts";
import ThemeToggle from "./ThemeToggle.vue";

defineProps<{ navOpen: boolean }>();
const emit = defineEmits<{ "toggle-nav": [] }>();

const repoUrl = "https://github.com/naitokosuke/vscode-settings";
</script>

<template>
  <header class="site-header">
    <button
      class="nav-toggle"
      type="button"
      :aria-expanded="navOpen"
      aria-controls="site-nav"
      aria-label="Toggle navigation"
      @click="emit('toggle-nav')"
    >
      <span v-html="navOpen ? icons.close({ size: 20 }) : icons.menu({ size: 20 })" />
    </button>

    <a class="wordmark" href="#top" aria-label="vscode-settings — home">
      <span class="wordmark-mark" v-html="icons.sliders({ size: 20 })" />
      <span class="wordmark-text"><b>vscode</b>-settings</span>
    </a>

    <div class="spacer" />

    <nav class="header-actions" aria-label="site">
      <a class="ghost-link" :href="repoUrl" target="_blank" rel="noopener">
        <span v-html="icons.github({ size: 17 })" />
        <span class="hide-narrow">GitHub</span>
      </a>
      <ThemeToggle />
    </nav>
  </header>
</template>

<style scoped>
@import "../breakpoints.css";

.site-header {
  position: sticky;
  top: 0;
  z-index: 30;
  height: var(--header-h);
  display: flex;
  align-items: center;
  gap: 10px;
  padding-inline: clamp(14px, 3vw, 28px);
  background: light-dark(rgba(252, 252, 253, 0.82), rgba(14, 17, 22, 0.82));
  backdrop-filter: blur(12px) saturate(140%);
  border-bottom: 1px solid var(--border);
}

.nav-toggle {
  display: none;
  place-items: center;
  width: 34px;
  height: 34px;
  border-radius: var(--radius-sm);
  color: var(--fg-muted);

  &:hover {
    color: var(--fg-strong);
    background: var(--surface-2);
  }
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--fg-strong);
  font-size: 15px;
  letter-spacing: -0.01em;

  &:hover {
    text-decoration: none;
  }

  .wordmark-mark {
    display: inline-flex;
    color: var(--accent);
  }

  .wordmark-text b {
    font-weight: 700;
  }
}

.spacer {
  flex: 1 1 auto;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 8px;

  .ghost-link {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    height: 32px;
    padding: 0 11px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--border);
    background: var(--surface);
    color: var(--fg-muted);
    font-size: 13px;
    transition:
      color 160ms var(--easing),
      border-color 160ms var(--easing),
      background 160ms var(--easing);

    span {
      display: inline-flex;
    }

    &:hover {
      color: var(--fg-strong);
      border-color: var(--border-strong);
      background: var(--surface-2);
      text-decoration: none;
    }
  }
}

@media (--tablet) {
  .nav-toggle {
    display: grid;
  }
}

@media (--phone) {
  .hide-narrow {
    display: none;
  }
}
</style>
