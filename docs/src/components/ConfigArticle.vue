<script setup lang="ts">
import { computed } from "vue";
import { icons } from "../icons.ts";
import { renderProse } from "../markdown.ts";
import type { ConfigDoc } from "../types.ts";
import SettingRow from "./SettingRow.vue";
import SourceView from "./SourceView.vue";

const props = defineProps<{ doc: ConfigDoc }>();

const introHtml = computed(() => renderProse(props.doc.intro));
const extLink = icons.externalLink({ size: 13 });
</script>

<template>
  <article class="config-article">
    <header>
      <code>{{ doc.path }}</code>
      <h1>{{ doc.title }}</h1>
      <p>{{ doc.tagline }}</p>
      <div class="prose" v-html="introHtml" />
      <a v-if="doc.primaryRef" :href="doc.primaryRef.url" target="_blank" rel="noopener noreferrer">
        {{ doc.primaryRef.label }}<span v-html="extLink" />
      </a>
    </header>

    <section v-for="group in doc.groups" :key="group.id">
      <h2>{{ group.title }}</h2>
      <p v-if="group.intro">{{ group.intro }}</p>
      <SettingRow v-for="s in group.settings" :key="s.key" :setting="s" />
    </section>

    <SourceView :path="doc.path" />
  </article>
</template>

<style scoped>
.config-article {
  padding-block: clamp(36px, 5vw, 64px) clamp(44px, 6vw, 80px);

  header {
    margin-bottom: 14px;

    > code {
      display: inline-block;
      margin-bottom: 14px;
      font-family: var(--font-mono);
      font-size: 12px;
      letter-spacing: 0.02em;
      color: var(--fg-faint);
    }

    h1 {
      margin: 0;
      font-family: var(--font-serif);
      font-size: clamp(30px, 4vw, 46px);
      line-height: 1.1;
      font-weight: 600;
      color: var(--fg-strong);
    }

    /* Tagline. */
    > p {
      margin: 12px 0 0;
      max-width: 60ch;
      font-family: var(--font-serif);
      font-style: italic;
      font-size: clamp(16px, 1.6vw, 20px);
      color: var(--fg-muted);
    }

    .prose {
      margin-top: 20px;
      max-width: 70ch;

      :deep(p) {
        margin: 0 0 0.9em;
        font-size: 16px;
        line-height: 1.75;
        color: var(--fg);
        text-wrap: pretty;

        &:last-child {
          margin-bottom: 0;
        }
      }
    }

    /* Primary reference — a plain underlined link, not a button. */
    > a {
      display: inline-flex;
      align-items: center;
      gap: 5px;
      margin-top: 18px;
      font-size: 14px;
      color: var(--accent);
      border-bottom: 1px solid var(--rule-strong);
      padding-bottom: 1px;

      span {
        display: inline-flex;
        opacity: 0.7;
      }

      &:hover {
        text-decoration: none;
        color: var(--accent-strong);
        border-bottom-color: currentColor;
      }
    }
  }

  section {
    margin-top: clamp(34px, 4.5vw, 52px);

    h2 {
      margin: 0 0 8px;
      font-family: var(--font-serif);
      font-size: clamp(20px, 2.1vw, 25px);
      font-weight: 600;
      color: var(--fg-strong);
    }

    /* Group intro. */
    > p {
      margin: 0 0 8px;
      max-width: 68ch;
      font-size: 14.5px;
      color: var(--fg-muted);
      text-wrap: pretty;
    }
  }
}
</style>
