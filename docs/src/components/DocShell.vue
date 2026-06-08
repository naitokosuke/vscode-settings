<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from "vue";
import SideNav from "./SideNav.vue";
import SiteHeader from "./SiteHeader.vue";

const navOpen = ref(false);
const closeNav = (): void => {
  navOpen.value = false;
};
const toggleNav = (): void => {
  navOpen.value = !navOpen.value;
};

function onKey(e: KeyboardEvent): void {
  if (e.key === "Escape" && navOpen.value) closeNav();
}
onMounted(() => document.addEventListener("keydown", onKey));
onBeforeUnmount(() => document.removeEventListener("keydown", onKey));
</script>

<template>
  <div class="doc-shell">
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
      <main>
        <slot />
        <footer>
          <p>
            Documentation for
            <a href="https://github.com/naitokosuke/vscode-settings" target="_blank" rel="noopener"
              >naitokosuke/vscode-settings</a
            >.
          </p>
          <p>Built with Vue, Void, and Vite+.</p>
        </footer>
      </main>
    </div>
  </div>
</template>

<style scoped>
@import "../breakpoints.css";

.doc-shell {
  min-height: 100dvh;
}

.body {
  display: grid;
  grid-template-columns: minmax(0, 300px) minmax(0, 1fr);
  grid-template-areas: "nav content";
  align-items: start;
  max-width: 1400px;
  margin: 0 auto;

  main {
    grid-area: content;
    width: 100%;
    max-width: 860px;
    min-width: 0;
    margin-inline: auto;
    padding-inline: clamp(18px, 4vw, 56px);
    padding-bottom: 64px;
  }

  footer {
    margin-top: 24px;
    padding-top: 30px;
    border-top: 1px solid var(--rule);
    font-size: 14px;
    color: var(--fg-muted);

    p {
      margin: 0 0 6px;
      max-width: 68ch;
    }
    /* Build credit. */
    p:last-child {
      margin-top: 10px;
      font-family: var(--font-serif);
      font-style: italic;
      font-size: 13px;
      color: var(--fg-faint);
    }
  }

  /* Drawer backdrop — only present once the nav becomes an overlay. */
  .nav-backdrop {
    display: none;
  }

  @media (--tablet) {
    grid-template-columns: minmax(0, 1fr);
    grid-template-areas: "content";

    .nav-backdrop {
      position: fixed;
      inset: var(--header-h) 0 0 0;
      z-index: 24;
      border: 0;
      background: light-dark(rgba(20, 19, 15, 0.28), rgba(0, 0, 0, 0.5));
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
}
</style>
