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
  <article :id="doc.id" class="config-article" :data-spy-id="doc.id">
    <header class="article-head">
      <p class="article-path">
        <code>{{ doc.path }}</code>
      </p>
      <h2 class="article-title">
        <a :href="`#${doc.id}`" class="anchor" aria-label="Link to this section">
          <span v-html="icons.link({ size: 16 })" />
        </a>
        {{ doc.title }}
      </h2>
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

    <section
      v-for="group in doc.groups"
      :id="`${doc.id}--${group.id}`"
      :key="group.id"
      class="group"
      :data-spy-id="`${doc.id}--${group.id}`"
    >
      <h3 class="group-title">
        <a :href="`#${doc.id}--${group.id}`" class="anchor" aria-label="Link to this group">
          <span v-html="icons.link({ size: 14 })" />
        </a>
        {{ group.title }}
      </h3>
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
  padding-block: clamp(40px, 6vw, 72px);
  border-top: 1px solid var(--border);

  &:first-child {
    border-top: 0;
  }
}

.article-head {
  margin-bottom: 12px;
}

.article-path {
  margin: 0 0 10px;

  code {
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--fg-muted);
    padding: 3px 9px;
    border-radius: 999px;
    background: var(--surface-2);
    border: 1px solid var(--border);
  }
}

.article-title {
  position: relative;
  margin: 0;
  font-size: clamp(26px, 3.4vw, 38px);
  line-height: 1.15;
  letter-spacing: -0.025em;
  font-weight: 700;
  color: var(--fg-strong);
}

.article-tagline {
  margin: 8px 0 0;
  font-size: clamp(15px, 1.5vw, 18px);
  color: var(--fg-muted);
}

.article-intro {
  margin-top: 18px;
  max-width: 72ch;

  :deep(p) {
    margin: 0 0 0.85em;
    font-size: 15.5px;
    line-height: 1.7;
    color: var(--fg);
    text-wrap: pretty;

    &:last-child {
      margin-bottom: 0;
    }
  }
}

.primary-ref {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  margin-top: 16px;
  padding: 7px 13px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--accent-line);
  background: var(--accent-soft);
  font-size: 13px;
  font-weight: 600;
  color: var(--accent-strong);

  .ref-ic {
    display: inline-flex;
  }
  &:hover {
    text-decoration: none;
    background: light-dark(rgba(11, 102, 195, 0.13), rgba(90, 162, 255, 0.18));
  }
}

.group {
  margin-top: clamp(28px, 4vw, 44px);
}

.group-title {
  position: relative;
  margin: 0 0 6px;
  font-size: 19px;
  font-weight: 650;
  letter-spacing: -0.01em;
  color: var(--fg-strong);
}

.group-intro {
  margin: 0 0 6px;
  font-size: 14px;
  color: var(--fg-muted);
  max-width: 70ch;
  text-wrap: pretty;
}

.settings {
  margin-top: 8px;
}

/* Anchor-link affordance on hover. */
.anchor {
  position: absolute;
  left: -24px;
  display: inline-flex;
  align-items: center;
  height: 1em;
  top: 0.2em;
  color: var(--fg-faint);
  opacity: 0;
  transition: opacity 140ms var(--easing);
}
.article-title:hover .anchor,
.group-title:hover .anchor {
  opacity: 1;
}

@media (max-width: 860px) {
  .anchor {
    display: none;
  }
}
</style>
