<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import { configDocs } from "../reference.ts";
import ConfigArticle from "./ConfigArticle.vue";
import SideNav from "./SideNav.vue";
import SiteHeader from "./SiteHeader.vue";

const navOpen = ref(false);

function closeNav(): void {
  navOpen.value = false;
}
function toggleNav(): void {
  navOpen.value = !navOpen.value;
}

function onKey(e: KeyboardEvent): void {
  if (e.key === "Escape" && navOpen.value) closeNav();
}
onMounted(() => document.addEventListener("keydown", onKey));
onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
</script>

<template>
  <div class="doc-site">
    <SiteHeader :nav-open="navOpen" @toggle-nav="toggleNav" />

    <div class="body">
      <SideNav :open="navOpen" @navigate="closeNav" />
      <button
        class="nav-backdrop"
        :class="{ show: navOpen }"
        type="button"
        tabindex="-1"
        aria-label="Close navigation"
        @click="closeNav"
      />

      <main class="content">
        <section id="top" class="hero">
          <p class="hero-eyebrow">Configuration reference</p>
          <h1 class="hero-title"><b>vscode</b>-settings</h1>
          <p class="hero-lede">
            A personal Visual Studio Code, documented. Every setting, keybinding, and recommended
            extension in this repo — explained in plain language, each linked to the authoritative
            source it comes from. The files below are read straight from the repository, so this
            page never drifts from the real config.
          </p>
          <nav class="hero-jump" aria-label="config files">
            <a v-for="doc in configDocs" :key="doc.id" class="jump-card" :href="`#${doc.id}`">
              <span class="jump-path">{{ doc.path }}</span>
              <span class="jump-title">{{ doc.title }}</span>
              <span class="jump-tagline">{{ doc.tagline }}</span>
            </a>
          </nav>
        </section>

        <ConfigArticle v-for="doc in configDocs" :key="doc.id" :doc="doc" />

        <footer class="site-footer">
          <p>
            Documentation for
            <a href="https://github.com/naitokosuke/vscode-settings" target="_blank" rel="noopener"
              >naitokosuke/vscode-settings</a
            >. Companion to the
            <a href="https://github.com/naitokosuke/dotfiles" target="_blank" rel="noopener"
              >dotfiles</a
            >
            flake it syncs into.
          </p>
          <p class="footer-built">Built with Vue, Void, and Vite+.</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
@import "../breakpoints.css";

.doc-site {
  min-height: 100dvh;
}

.body {
  display: grid;
  grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
  grid-template-areas: "nav content";
  align-items: start;
  max-width: 1400px;
  margin: 0 auto;
}

.content {
  grid-area: content;
  width: 100%;
  max-width: 860px;
  margin-inline: auto;
  padding-inline: clamp(18px, 4vw, 48px);
  padding-bottom: 80px;
  min-width: 0;
}

.hero {
  padding-block: clamp(44px, 7vw, 88px) clamp(20px, 3vw, 36px);
}

.hero-eyebrow {
  margin: 0 0 12px;
  font-size: 12px;
  font-weight: 650;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--accent);
}

.hero-title {
  margin: 0;
  font-size: clamp(38px, 7vw, 68px);
  line-height: 1.02;
  letter-spacing: -0.035em;
  font-weight: 700;
  color: var(--fg-strong);

  b {
    font-weight: 800;
  }
}

.hero-lede {
  margin: 20px 0 0;
  max-width: 64ch;
  font-size: clamp(16px, 1.7vw, 19px);
  line-height: 1.65;
  color: var(--fg-muted);
  text-wrap: pretty;
}

.hero-jump {
  margin-top: clamp(28px, 4vw, 40px);
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
}

.jump-card {
  display: grid;
  gap: 4px;
  padding: 15px 16px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  background: var(--surface);
  transition:
    border-color 180ms var(--easing),
    background 180ms var(--easing),
    translate 180ms var(--easing);

  &:hover {
    text-decoration: none;
    border-color: var(--accent-line);
    background: var(--accent-soft);
    translate: 0 -2px;
  }

  .jump-path {
    font-family: var(--font-mono);
    font-size: 11.5px;
    color: var(--fg-faint);
  }
  .jump-title {
    font-size: 15px;
    font-weight: 650;
    color: var(--fg-strong);
  }
  .jump-tagline {
    font-size: 12.5px;
    line-height: 1.45;
    color: var(--fg-muted);
    text-wrap: pretty;
  }
}

.site-footer {
  margin-top: 48px;
  padding-top: 28px;
  border-top: 1px solid var(--border);
  font-size: 13.5px;
  color: var(--fg-muted);

  p {
    margin: 0 0 6px;
    max-width: 68ch;
  }
  .footer-built {
    color: var(--fg-faint);
    font-size: 12.5px;
  }
}

.nav-backdrop {
  display: none;
}

@media (--tablet) {
  .body {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "content";
  }

  .nav-backdrop {
    position: fixed;
    inset: var(--header-h) 0 0 0;
    z-index: 24;
    border: 0;
    background: light-dark(rgba(16, 24, 40, 0.3), rgba(0, 0, 0, 0.55));
    backdrop-filter: blur(2px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 200ms var(--easing);

    &.show {
      display: block;
      opacity: 1;
      pointer-events: auto;
    }
  }
}
</style>
