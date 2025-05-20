<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'

const HomeView = defineAsyncComponent(() => import('@/views/HomeView.vue'))
</script>

<template>
  <SpeedInsights />
  <Suspense>
    <template #default>
      <div class="min-h-[700px]">
        <HomeView />
      </div>
    </template>
    <template #fallback>
      <div class="flex w-full fixed inset-0 items-center justify-center bg-neutral-900">
        <p class="text-white text-[5vw]">Loading....</p>
      </div>
    </template>
  </Suspense>
</template>
