<script setup lang="ts">
import { VueLenis, useLenis } from 'lenis/vue'
import HomeView from './views/HomeView.vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'

useLenis(() => {
  // called every scroll
})
</script>

<template>
  <SpeedInsights />
  <VueLenis root>
    <HomeView />
  </VueLenis>
</template>
