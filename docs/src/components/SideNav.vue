<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from "vue";
import { configDocs } from "../reference.ts";

defineProps<{ open: boolean }>();
const emit = defineEmits<{ navigate: [] }>();

const items = computed(() =>
  configDocs.map((doc) => ({
    id: doc.id,
    title: doc.title,
    path: doc.path,
    groups: doc.groups.map((g) => ({ id: `${doc.id}--${g.id}`, title: g.title })),
  })),
);

const activeId = ref<string>("");
let observer: IntersectionObserver | null = null;
const visible = new Map<string, number>();

function recompute(): void {
  let bestId = "";
  let bestTop = Number.POSITIVE_INFINITY;
  for (const [id, top] of visible) {
    if (top < bestTop) {
      bestTop = top;
      bestId = id;
    }
  }
  if (bestId) activeId.value = bestId;
}

onMounted(() => {
  const targets = Array.from(document.querySelectorAll<HTMLElement>("[data-spy-id]"));
  observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const id = (entry.target as HTMLElement).dataset.spyId ?? "";
        if (entry.isIntersecting) visible.set(id, entry.boundingClientRect.top);
        else visible.delete(id);
      }
      recompute();
    },
    { rootMargin: "-64px 0px -70% 0px", threshold: 0 },
  );
  for (const t of targets) observer.observe(t);
});

onBeforeUnmount(() => observer?.disconnect());
</script>

<template>
  <aside id="site-nav" class="side-nav" :class="{ open }" aria-label="Table of contents">
    <nav class="side-nav-scroll">
      <p class="side-nav-eyebrow">On this site</p>
      <ul class="toc">
        <li v-for="item in items" :key="item.id" class="toc-file">
          <a
            class="toc-file-link"
            :class="{ active: activeId === item.id }"
            :href="`#${item.id}`"
            @click="emit('navigate')"
          >
            {{ item.title }}
          </a>
          <ul v-if="item.groups.length" class="toc-groups">
            <li v-for="g in item.groups" :key="g.id">
              <a
                class="toc-group-link"
                :class="{ active: activeId === g.id }"
                :href="`#${g.id}`"
                @click="emit('navigate')"
              >
                {{ g.title }}
              </a>
            </li>
          </ul>
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
  border-right: 1px solid var(--border);
  background: var(--bg);
}

.side-nav-scroll {
  height: 100%;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 22px 18px 48px 0;
}

.side-nav-eyebrow {
  margin: 0 0 10px;
  padding-inline-start: 14px;
  font-size: 11px;
  font-weight: 650;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--fg-faint);
}

.toc {
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-file {
  margin-bottom: 4px;
}

.toc-file-link {
  display: block;
  padding: 6px 14px;
  border-radius: var(--radius-sm);
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 600;
  color: var(--fg-strong);
  border-left: 2px solid transparent;

  &:hover {
    background: var(--surface-2);
    text-decoration: none;
  }
  &.active {
    color: var(--accent-strong);
    border-left-color: var(--accent);
    background: var(--accent-soft);
  }
}

.toc-groups {
  list-style: none;
  margin: 2px 0 8px;
  padding: 0;

  a {
    display: block;
    padding: 4px 14px 4px 22px;
    font-size: 12.5px;
    color: var(--fg-muted);
    border-left: 2px solid transparent;

    &:hover {
      color: var(--fg-strong);
      text-decoration: none;
    }
    &.active {
      color: var(--accent-strong);
      border-left-color: var(--accent-line);
    }
  }
}

/* Drawer on narrow viewports. */
@media (--tablet) {
  .side-nav {
    position: fixed;
    inset: var(--header-h) auto 0 0;
    z-index: 25;
    width: min(82vw, 320px);
    box-shadow: var(--shadow);
    translate: -102% 0;
    transition: translate 240ms var(--easing);

    &.open {
      translate: 0 0;
    }
  }

  .side-nav-scroll {
    padding-right: 14px;
    padding-left: 4px;
    background: var(--bg);
  }
}
</style>
