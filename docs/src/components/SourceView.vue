<script setup lang="ts">
import { computed } from "vue";
import { rawFile } from "../data.ts";
import { highlight } from "../syntax.ts";

const props = defineProps<{ path: string }>();

const file = computed(() => rawFile(props.path));
const html = computed(() => (file.value ? highlight(file.value.content, file.value.lang) : ""));
const lineNumbers = computed(() =>
  file.value ? Array.from({ length: file.value.lineCount }, (_, i) => i + 1).join("\n") : "",
);
</script>

<template>
  <details v-if="file" class="source-view">
    <summary>
      <span>View source</span>
      <span>{{ file.lineCount }} lines · {{ path }}</span>
    </summary>
    <div>
      <pre><span>{{ lineNumbers }}</span><code v-html="html" /></pre>
    </div>
  </details>
</template>

<style scoped>
.source-view {
  margin-top: 22px;
  border: 1px solid var(--rule);
  background: var(--bg);
  overflow: hidden;

  summary {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    padding: 11px 15px;
    cursor: pointer;
    list-style: none;
    user-select: none;

    &::-webkit-details-marker {
      display: none;
    }
    &:hover {
      background: var(--bg-sunken);
    }

    /* Label. */
    span:first-child {
      font-family: var(--font-mono);
      font-size: 12.5px;
      font-weight: 600;
      color: var(--fg-strong);

      &::before {
        content: "▸";
        display: inline-block;
        margin-right: 8px;
        color: var(--fg-muted);
        transition: rotate 160ms var(--easing);
      }
    }

    /* Meta. */
    span:last-child {
      overflow: hidden;
      font-family: var(--font-mono);
      font-size: 11.5px;
      color: var(--fg-faint);
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  &[open] summary span:first-child::before {
    rotate: 90deg;
  }

  /* Scroll region. */
  div {
    max-height: 70dvh;
    overflow: auto;
    border-top: 1px solid var(--rule);
    background: var(--bg-sunken);
  }

  pre {
    display: grid;
    grid-template-columns: auto minmax(0, 1fr);
    gap: 16px;
    margin: 0;
    padding: 16px;
    font-family: var(--font-mono);
    font-size: 12.5px;
    line-height: 1.65;
    tab-size: 2;
    color: var(--fg);
    white-space: pre;

    /* Line numbers. */
    span {
      text-align: right;
      color: var(--fg-faint);
      user-select: none;
      font-variant-numeric: tabular-nums;
    }

    code {
      display: block;
      overflow-x: auto;
      white-space: pre;
    }
  }
}
</style>
