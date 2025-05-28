<script setup lang="ts">
import { homepageStore } from '@/stores/sanity'
import { motion } from 'motion-v'

defineProps<{
  loading: boolean
}>()

const homeStore = homepageStore()

const loadComplete = () => {
  homeStore.completeLoading()
}
</script>

<template>
  <motion.div
    class="flex w-full fixed inset-x-0 top-0 h-screen items-center justify-center bg-neutral-900 z-[99] overflow-hidden"
    :animate="{ height: 0 }"
    v-on:animation-complete="loadComplete"
  >
    <p class="text-white text-[5vw]">Loading....</p>
  </motion.div>
</template>
