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
    {{ theme }}
  </button>
</template>

<style scoped>
.theme-toggle {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  font-size: 14px;
  text-transform: capitalize;
  color: var(--fg-muted);
  transition: color 160ms var(--easing);

  span {
    display: inline-flex;
  }

  &:hover {
    color: var(--fg-strong);
  }
}
</style>
