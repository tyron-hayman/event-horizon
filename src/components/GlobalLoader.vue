<script setup lang="ts">
import { useProgress } from '@tresjs/cientos'
import { ref } from 'vue'

const progressData = await useProgress()  // top-level await

const progress = progressData.progress
const hasFinishLoading = progressData.hasFinishLoading
</script>

<template>
  <div
    class="fixed left-0 top-0 bottom-0 right-0 z-[90] bg-black"
  >
    <div class="absolute left-20 bottom-10 z-[1]">
      <p class="text-white text-[5vw]">{{ Math.round(progress) }}%</p>
    </div>
  </div>
</template>
