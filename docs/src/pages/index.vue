<script setup lang="ts">
import { Link } from "@void/vue";
import { configDocs } from "../reference.ts";
</script>

<template>
  <section class="hero">
    <p class="hero-eyebrow">Configuration reference</p>
    <h1 class="hero-title"><b>vscode</b>-settings</h1>
    <p class="hero-lede">
      A personal Visual Studio Code, documented. Every setting, keybinding, and recommended
      extension in this repo — explained in plain language, each linked to the authoritative source
      it comes from. The files are read straight from the repository, so these pages never drift
      from the real config.
    </p>

    <nav class="index" aria-label="configuration files">
      <Link
        v-for="doc in configDocs"
        :key="doc.id"
        class="index-row"
        :href="`/${doc.id}`"
        view-transition
      >
        <span class="index-path">{{ doc.path }}</span>
        <span class="index-title">{{ doc.title }}</span>
        <span class="index-tagline">{{ doc.tagline }}</span>
      </Link>
    </nav>
  </section>
</template>

<style scoped>
@import "../breakpoints.css";

.hero {
  padding-block: clamp(40px, 6vw, 88px) clamp(20px, 3vw, 36px);
}

.hero-eyebrow {
  margin: 0 0 16px;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 15px;
  color: var(--fg-muted);
}

.hero-title {
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

.hero-lede {
  margin: 26px 0 0;
  max-width: 60ch;
  font-size: clamp(16px, 1.6vw, 19px);
  line-height: 1.7;
  color: var(--fg);
  text-wrap: pretty;
}

/* An index, not a card grid: hairline-ruled rows of files. */
.index {
  margin-top: clamp(34px, 4.5vw, 52px);
  border-top: 1px solid var(--rule-strong);
}

.index-row {
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: 3px;
  padding: 18px 0;
  border-bottom: 1px solid var(--rule);
  color: inherit;

  &:hover {
    text-decoration: none;

    .index-title {
      color: var(--accent);
    }
  }

  .index-path {
    font-family: var(--font-mono);
    font-size: 11.5px;
    color: var(--fg-faint);
  }
  .index-title {
    font-family: var(--font-serif);
    font-size: 21px;
    color: var(--fg-strong);
    transition: color 140ms var(--easing);
  }
  .index-tagline {
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--fg-muted);
    text-wrap: pretty;
  }
}
</style>
