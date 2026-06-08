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
    <header class="article-head">
      <p class="article-path">
        <code>{{ doc.path }}</code>
      </p>
      <h1 class="article-title">{{ doc.title }}</h1>
      <p class="article-tagline">{{ doc.tagline }}</p>
      <div class="prose article-intro" v-html="introHtml" />
      <a
        v-if="doc.primaryRef"
        class="primary-ref"
        :href="doc.primaryRef.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ doc.primaryRef.label }}<span class="ref-ic" v-html="extLink" />
      </a>
    </header>

    <section v-for="group in doc.groups" :key="group.id" class="group">
      <h2 class="group-title">{{ group.title }}</h2>
      <p v-if="group.intro" class="group-intro">{{ group.intro }}</p>
      <div class="settings">
        <SettingRow v-for="s in group.settings" :key="s.key" :setting="s" />
      </div>
    </section>

    <SourceView :path="doc.path" />
  </article>
</template>

<style scoped>
.config-article {
  padding-block: clamp(36px, 5vw, 64px) clamp(44px, 6vw, 80px);
}

.article-head {
  margin-bottom: 14px;
}

.article-path {
  margin: 0 0 14px;

  code {
    font-family: var(--font-mono);
    font-size: 12px;
    letter-spacing: 0.02em;
    color: var(--fg-faint);
  }
}

.article-title {
  position: relative;
  margin: 0;
  font-family: var(--font-serif);
  font-size: clamp(30px, 4vw, 46px);
  line-height: 1.1;
  font-weight: 600;
  color: var(--fg-strong);
}

.article-tagline {
  margin: 12px 0 0;
  font-family: var(--font-serif);
  font-style: italic;
  font-size: clamp(16px, 1.6vw, 20px);
  color: var(--fg-muted);
  max-width: 60ch;
}

.article-intro {
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

/* Primary reference as a plain underlined link, not a button. */
.primary-ref {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 18px;
  font-size: 14px;
  color: var(--accent);
  border-bottom: 1px solid var(--rule-strong);
  padding-bottom: 1px;

  .ref-ic {
    display: inline-flex;
    opacity: 0.7;
  }
  &:hover {
    text-decoration: none;
    color: var(--accent-strong);
    border-bottom-color: currentColor;
  }
}

.group {
  margin-top: clamp(34px, 4.5vw, 52px);
}

.group-title {
  position: relative;
  margin: 0 0 8px;
  font-family: var(--font-serif);
  font-size: clamp(20px, 2.1vw, 25px);
  font-weight: 600;
  color: var(--fg-strong);
}

.group-intro {
  margin: 0 0 8px;
  font-size: 14.5px;
  color: var(--fg-muted);
  max-width: 68ch;
  text-wrap: pretty;
}

.settings {
  margin-top: 10px;
}
</style>
