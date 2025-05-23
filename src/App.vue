<script setup lang="ts">
// import { SpeedInsights } from '@vercel/speed-insights/vue'
</script>

<template>
  <!-- <SpeedInsights /> -->
  <Suspense>
    <template #default>
      <div class="min-h-[700px]">
        <RouterView />
      </div>
    </template>
    <template #fallback>
      <div class="flex w-full fixed inset-0 items-center justify-center bg-neutral-900">
        <p class="text-white text-[5vw]">Loading....</p>
      </div>
    </template>
  </Suspense>
</template>
