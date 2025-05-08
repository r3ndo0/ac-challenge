<template>
  <main class="flex h-screen bg-neutral-bg2">
    <div class="m-auto"><slot /></div>
  </main>
</template>
<script setup lang="ts">
import { ref } from 'vue'

const test = ref('')
</script>
