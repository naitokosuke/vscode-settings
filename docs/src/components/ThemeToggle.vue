<script setup lang="ts">
import { computed } from "vue";
import { icons } from "../icons.ts";
import { useTheme } from "./useTheme.ts";

const { theme, cycle } = useTheme();

const glyph = computed(() =>
  theme.value === "light" ? icons.sun({ size: 17 }) : icons.moon({ size: 17 }),
);
const label = computed(() => `Theme: ${theme.value} (click to change)`);
</script>

<template>
  <button class="theme-toggle" type="button" :aria-label="label" :title="label" @click="cycle">
    <span v-html="glyph" />
    <span class="theme-tag">{{ theme }}</span>
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  height: 32px;
  padding: 0 10px;
  border-radius: var(--radius-sm);
  border: 1px solid var(--border);
  color: var(--fg-muted);
  background: var(--surface);
  transition:
    color 160ms var(--easing),
    border-color 160ms var(--easing),
    background 160ms var(--easing);

  span {
    display: inline-flex;
  }

  .theme-tag {
    font-size: 12px;
    letter-spacing: 0.02em;
    text-transform: capitalize;
  }

  &:hover {
    color: var(--fg-strong);
    border-color: var(--border-strong);
    background: var(--surface-2);
  }
}
</style>
