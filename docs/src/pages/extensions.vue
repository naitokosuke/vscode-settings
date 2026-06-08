<script setup lang="ts">
import ConfigArticle from "../components/ConfigArticle.vue";
import { docById } from "../reference.ts";

const doc = docById("extensions");
</script>

<template>
  <ConfigArticle v-if="doc" :doc="doc" />
</template>
