<script setup lang="ts">
import { VueLenis, useLenis } from 'lenis/vue'
import HomeView from './views/HomeView.vue'
import { Analytics } from '@vercel/analytics/react'

useLenis(() => {
  // called every scroll
})
</script>

<template>
  <Analytics />
  <VueLenis root>
    <HomeView />
  </VueLenis>
</template>
