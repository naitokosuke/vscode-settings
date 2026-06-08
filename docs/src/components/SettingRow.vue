<script setup lang="ts">
import { computed } from "vue";
import { icons } from "../icons.ts";
import { renderInline } from "../markdown.ts";
import type { SettingDoc } from "../types.ts";

const props = defineProps<{ setting: SettingDoc }>();

const summaryHtml = computed(() => renderInline(props.setting.summary));
const extLink = icons.externalLink({ size: 13 });
</script>

<template>
  <div class="setting-row">
    <div class="setting-head">
      <code class="setting-key">{{ setting.key }}</code>
      <code v-if="setting.value" class="setting-value">{{ setting.value }}</code>
    </div>
    <p class="summary" v-html="summaryHtml" />
    <p v-if="setting.refs?.length" class="refs">
      <a
        v-for="ref in setting.refs"
        :key="ref.url"
        class="ref-link"
        :href="ref.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ ref.label }}<span class="ref-ic" v-html="extLink" />
      </a>
    </p>
  </div>
</template>

<style scoped>
.setting-row {
  padding: 16px 0;
  border-top: 1px solid var(--border);

  &:first-child {
    border-top: 0;
  }
}

.setting-head {
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 6px;
}

.setting-key {
  font-family: var(--font-mono);
  font-size: 13.5px;
  font-weight: 600;
  color: var(--fg-strong);
  padding: 2px 7px;
  border-radius: 6px;
  background: var(--accent-soft);
  border: 1px solid var(--accent-line);
  overflow-wrap: anywhere;
}

.setting-value {
  font-family: var(--font-mono);
  font-size: 12.5px;
  color: var(--fg-muted);
  padding: 2px 6px;
  border-radius: 6px;
  background: var(--surface-2);
  border: 1px solid var(--border);
  overflow-wrap: anywhere;
}

.summary {
  margin: 0;
  font-size: 14.5px;
  line-height: 1.65;
  color: var(--fg);
  max-width: 70ch;
  text-wrap: pretty;
}

.refs {
  margin: 10px 0 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
}

.ref-link {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  font-size: 12.5px;
  font-weight: 500;
  color: var(--accent);

  .ref-ic {
    display: inline-flex;
    opacity: 0.75;
  }

  &:hover {
    color: var(--accent-strong);
    text-decoration: none;

    .ref-ic {
      opacity: 1;
    }
  }
}
</style>
