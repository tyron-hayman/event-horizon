<script setup lang="ts">
import { VueLenis, useLenis } from 'lenis/vue'
import GlobalHeader from './components/GlobalHeader.vue'
// import { SpeedInsights } from '@vercel/speed-insights/vue'

useLenis(() => {
  // called every scroll
})
</script>

<template>
  <!-- <SpeedInsights /> -->
  <GlobalHeader />
  <VueLenis root>
    <RouterView />
  </VueLenis>
</template>
