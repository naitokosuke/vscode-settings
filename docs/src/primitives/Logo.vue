<script setup lang="ts">
/**
 * Generic brand logo. The variant prop selects which SVG mark to
 * render. Size, position, color, and animation are all the
 * caller's responsibility — the primitive only commits to filling
 * each shape with `currentColor` so the calling style sheet can
 * tint the mark with a CSS `color`.
 *
 * Variants:
 *   - `"gear"` — a 12-tooth cog, built from one tooth `<rect>` and
 *     eleven rotated `<use>` copies plus an even-odd ring body.
 *     The whole mark lives inside a `.rotor` group so the calling
 *     style sheet can spin it about its own centre. A settings
 *     repo's natural mark.
 */
type Variant = "gear";

defineProps<{
  variant: Variant;
}>();
</script>

<template>
  <svg
    v-if="variant === 'gear'"
    class="logo logo-gear"
    viewBox="0 0 100 100"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <g class="rotor">
      <!-- Gear body: an even-odd donut (outer disc minus centre hole). -->
      <path fill-rule="evenodd" d="M50 16 a34 34 0 1 0 0.001 0 Z M50 34 a16 16 0 1 0 0.001 0 Z" />
      <!-- One tooth at 12 o'clock, then eleven rotated copies. -->
      <rect id="gear-tooth" x="44.5" y="4" width="11" height="18" rx="2.5" />
      <use href="#gear-tooth" transform="rotate(30, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(60, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(90, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(120, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(150, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(180, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(210, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(240, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(270, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(300, 50, 50)" />
      <use href="#gear-tooth" transform="rotate(330, 50, 50)" />
    </g>
  </svg>
</template>

<style scoped>
.logo {
  display: block;
  fill: currentColor;

  :is(path, use, rect, circle) {
    fill: currentColor;
  }

  .rotor {
    /* Rotate about the mark's own geometric centre. */
    transform-box: fill-box;
    transform-origin: center;
  }
}
</style>
