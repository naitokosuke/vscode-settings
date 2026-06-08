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
      type="button"
      :aria-expanded="navOpen"
      aria-controls="site-nav"
      aria-label="Toggle navigation"
      @click="emit('toggle-nav')"
    >
      <span v-html="navOpen ? icons.close({ size: 20 }) : icons.menu({ size: 20 })" />
    </button>

    <Link class="wordmark" href="/" view-transition aria-label="vscode-settings — home">
      <span v-html="icons.sliders({ size: 20 })" />
      <span><b>vscode</b>-settings</span>
    </Link>

    <nav aria-label="site">
      <a :href="repoUrl" target="_blank" rel="noopener">
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
  display: flex;
  align-items: center;
  gap: 14px;
  height: var(--header-h);
  padding-inline: clamp(16px, 3vw, 32px);
  background: var(--bg);
  border-bottom: 1px solid var(--rule);

  /* Mobile nav toggle — hidden until the sidebar becomes a drawer. */
  > button {
    display: none;
    place-items: center;
    width: 32px;
    height: 32px;
    color: var(--fg-muted);

    &:hover {
      color: var(--fg-strong);
    }

    @media (--tablet) {
      display: grid;
    }
  }

  .wordmark {
    display: inline-flex;
    align-items: center;
    gap: 9px;
    font-family: var(--font-mono);
    font-size: 14px;
    letter-spacing: -0.01em;
    color: var(--fg-strong);

    &:hover {
      text-decoration: none;
    }

    /* The sliders mark. */
    span:first-child {
      display: inline-flex;
      color: var(--fg-muted);
    }

    b {
      font-weight: 700;
    }
  }

  nav {
    display: flex;
    align-items: center;
    gap: 18px;
    margin-left: auto;

    a {
      display: inline-flex;
      align-items: center;
      gap: 7px;
      font-size: 14px;
      color: var(--fg-muted);
      transition: color 160ms var(--easing);

      span {
        display: inline-flex;
      }

      &:hover {
        text-decoration: none;
        color: var(--fg-strong);
      }
    }
  }
}

@media (--phone) {
  .hide-narrow {
    display: none;
  }
}
</style>
