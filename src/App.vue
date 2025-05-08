<script setup lang="ts">
import { VueLenis, useLenis } from 'lenis/vue'
import HomeView from './views/HomeView.vue'

useLenis(() => {
  // called every scroll
})
</script>

<template>
  <VueLenis root>
    <HomeView />
  </VueLenis>
</template>
