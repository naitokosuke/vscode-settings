<script setup lang="ts">
import { Link } from "@void/vue";
import { configDocs } from "../reference.ts";
</script>

<template>
  <section class="hero">
    <p>Configuration reference</p>
    <h1><b>vscode</b>-settings</h1>
    <p>
      A personal Visual Studio Code, documented. Every setting, keybinding, and recommended
      extension in this repo — explained in plain language, each linked to the authoritative source
      it comes from. The files are read straight from the repository, so these pages never drift
      from the real config.
    </p>

    <nav aria-label="configuration files">
      <Link v-for="doc in configDocs" :key="doc.id" :href="`/${doc.id}`" view-transition>
        <span>{{ doc.path }}</span>
        <span>{{ doc.title }}</span>
        <span>{{ doc.tagline }}</span>
      </Link>
    </nav>
  </section>
</template>

<style scoped>
.hero {
  padding-block: clamp(40px, 6vw, 88px) clamp(20px, 3vw, 36px);

  /* Eyebrow. */
  > p:first-child {
    margin: 0 0 16px;
    font-family: var(--font-serif);
    font-style: italic;
    font-size: 15px;
    color: var(--fg-muted);
  }

  h1 {
    margin: 0;
    font-family: var(--font-serif);
    font-size: clamp(44px, 8vw, 88px);
    line-height: 1;
    letter-spacing: -0.01em;
    font-weight: 600;
    color: var(--fg-strong);

    b {
      font-weight: 700;
    }
  }

  /* Lede. */
  h1 + p {
    margin: 26px 0 0;
    max-width: 60ch;
    font-size: clamp(16px, 1.6vw, 19px);
    line-height: 1.7;
    color: var(--fg);
    text-wrap: pretty;
  }

  /* An index, not a card grid: hairline-ruled rows of files. */
  nav {
    margin-top: clamp(34px, 4.5vw, 52px);
    border-top: 1px solid var(--rule-strong);

    a {
      display: grid;
      gap: 3px;
      padding: 18px 0;
      border-bottom: 1px solid var(--rule);
      color: inherit;

      &:hover {
        text-decoration: none;

        span:nth-child(2) {
          color: var(--accent);
        }
      }

      /* Path. */
      span:nth-child(1) {
        font-family: var(--font-mono);
        font-size: 11.5px;
        color: var(--fg-faint);
      }
      /* Title. */
      span:nth-child(2) {
        font-family: var(--font-serif);
        font-size: 21px;
        color: var(--fg-strong);
        transition: color 140ms var(--easing);
      }
      /* Tagline. */
      span:nth-child(3) {
        font-size: 13.5px;
        line-height: 1.5;
        color: var(--fg-muted);
        text-wrap: pretty;
      }
    }
  }
}
</style>
