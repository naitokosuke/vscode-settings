<script setup lang="ts">
import { Link, useRouter } from "@void/vue";
import { computed } from "vue";
import { configDocs } from "../reference.ts";

defineProps<{ open: boolean }>();
const emit = defineEmits<{ navigate: [] }>();

const router = useRouter();
const current = computed(() => router.path.replace(/\/+$/, "") || "/");

const items = computed(() =>
  configDocs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    href: `/${doc.id}`,
    active: current.value === `/${doc.id}`,
  })),
);
</script>

<template>
  <aside id="site-nav" class="side-nav" :class="{ open }" aria-label="Configuration files">
    <nav class="side-nav-scroll">
      <p class="side-nav-eyebrow">Configuration files</p>
      <ul class="toc">
        <li v-for="item in items" :key="item.id">
          <Link
            class="toc-link"
            :class="{ active: item.active }"
            :href="item.href"
            view-transition
            :aria-current="item.active ? 'page' : undefined"
            @click="emit('navigate')"
          >
            {{ item.title }}
          </Link>
        </li>
      </ul>
    </nav>
  </aside>
</template>

<style scoped>
@import "../breakpoints.css";

.side-nav {
  grid-area: nav;
  position: sticky;
  top: var(--header-h);
  align-self: start;
  height: calc(100dvh - var(--header-h));
  border-right: 1px solid var(--rule);
  background: var(--bg);
}

.side-nav-scroll {
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 26px 20px 48px 2px;
}

.side-nav-eyebrow {
  margin: 0 0 16px;
  padding-inline-start: 15px;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: 13px;
  color: var(--fg-faint);
}

.toc {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-link {
  display: block;
  padding: 7px 0 7px 15px;
  border-left: 1px solid var(--rule);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 500;
  color: var(--fg-muted);

  &:hover {
    text-decoration: none;
    color: var(--accent);
    border-left-color: var(--rule-strong);
  }
  /* Active page: bold ink + a solid hairline marker, no fill. */
  &.active {
    color: var(--fg-strong);
    font-weight: 700;
    border-left-color: var(--fg-strong);
  }
}

/* Drawer on narrow viewports. */
@media (--tablet) {
  .side-nav {
    position: fixed;
    inset: var(--header-h) auto 0 0;
    z-index: 25;
    width: min(82vw, 320px);
    border-right: 1px solid var(--rule-strong);
    translate: -102% 0;
    transition: translate 240ms var(--easing);

    &.open {
      translate: 0 0;
    }
  }

  .side-nav-scroll {
    padding-right: 16px;
    padding-left: 6px;
    background: var(--bg);
  }
}
</style>
