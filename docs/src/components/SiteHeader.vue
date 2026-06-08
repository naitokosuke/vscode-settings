<script setup lang="ts">
import { Link } from "@void/vue";
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

    <Link class="wordmark" href="/" view-transition aria-label="vscode-settings — home">
      <span class="wordmark-mark" v-html="icons.sliders({ size: 20 })" />
      <span class="wordmark-text"><b>vscode</b>-settings</span>
    </Link>

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
  gap: 14px;
  padding-inline: clamp(16px, 3vw, 32px);
  background: var(--bg);
  border-bottom: 1px solid var(--rule);
}

.nav-toggle {
  display: none;
  place-items: center;
  width: 32px;
  height: 32px;
  color: var(--fg-muted);

  &:hover {
    color: var(--fg-strong);
  }
}

.wordmark {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: var(--fg-strong);
  font-family: var(--font-mono);
  font-size: 14px;
  letter-spacing: -0.01em;

  &:hover {
    text-decoration: none;
  }

  .wordmark-mark {
    display: inline-flex;
    color: var(--fg-muted);
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
  gap: 18px;

  .ghost-link {
    display: inline-flex;
    align-items: center;
    gap: 7px;
    color: var(--fg-muted);
    font-size: 14px;
    transition: color 160ms var(--easing);

    span {
      display: inline-flex;
    }

    &:hover {
      color: var(--fg-strong);
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
