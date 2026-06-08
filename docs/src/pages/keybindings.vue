<script setup lang="ts">
import ConfigArticle from "../components/ConfigArticle.vue";
import { docById } from "../reference.ts";

const doc = docById("keybindings");
</script>

<template>
  <ConfigArticle v-if="doc" :doc="doc" />
</template>
