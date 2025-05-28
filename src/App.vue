<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/vue'
import TransitionComponent from './components/TransitionComponent.vue'
import CursorComponent from '@/components/CursorComponent.vue'
</script>

<template>
  <SpeedInsights />
  <CursorComponent />
  <TransitionComponent />
  <RouterView />
</template>
