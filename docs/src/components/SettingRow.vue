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
    <p class="head">
      <code>{{ setting.key }}</code>
      <code v-if="setting.value" class="val">{{ setting.value }}</code>
    </p>
    <p class="summary" v-html="summaryHtml" />
    <p v-if="setting.refs?.length" class="refs">
      <a
        v-for="ref in setting.refs"
        :key="ref.url"
        :href="ref.url"
        target="_blank"
        rel="noopener noreferrer"
      >
        {{ ref.label }}<span v-html="extLink" />
      </a>
    </p>
  </div>
</template>

<style scoped>
.setting-row {
  padding: 20px 0;
  border-top: 1px solid var(--rule);

  /* Key + value. */
  .head {
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
    gap: 6px 12px;
    margin: 0 0 8px;

    /* Key — bold mono ink, no chip, no fill. */
    code {
      font-family: var(--font-mono);
      font-size: 14px;
      font-weight: 700;
      color: var(--fg-strong);
      overflow-wrap: anywhere;
    }

    .val {
      font-weight: 400;
      font-size: 12.5px;
      color: var(--fg-muted);

      &::before {
        content: "= ";
        color: var(--fg-faint);
      }
    }
  }

  .summary {
    margin: 0;
    max-width: 70ch;
    font-size: 15px;
    line-height: 1.7;
    color: var(--fg);
    text-wrap: pretty;
  }

  .refs {
    display: flex;
    flex-wrap: wrap;
    gap: 4px 18px;
    margin: 10px 0 0;

    a {
      display: inline-flex;
      align-items: center;
      gap: 4px;
      font-size: 13px;
      color: var(--accent);
      border-bottom: 1px solid var(--rule-strong);
      padding-bottom: 1px;

      span {
        display: inline-flex;
        opacity: 0.7;
      }

      &:hover {
        color: var(--accent-strong);
        text-decoration: none;
        border-bottom-color: currentColor;

        span {
          opacity: 1;
        }
      }
    }
  }
}
</style>
