<script setup lang="ts">
import { defineAsyncComponent } from 'vue'
import { VueLenis, useLenis } from 'lenis/vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'

const HomeView = defineAsyncComponent(() => import('@/views/HomeView.vue'))

useLenis(() => {
  // called every scroll
})
</script>

<template>
  <SpeedInsights />
  <VueLenis root>
    <Suspense>
      <template #default>
        <HomeView />
      </template>
      <template #fallback>
        <div class="flex w-full h-screen min-h-screen items-center justify-center bg-neutral-900">
          <p class="text-white text-[5vw]">Loading....</p>
        </div>
      </template>
    </Suspense>
  </VueLenis>
</template>
