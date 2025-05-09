<script setup lang="ts">
import { motion } from 'motion-v'
import { useCursorStore } from '@/stores/cursor'
import { useRoute } from 'vue-router'
import { CircleArrowLeft, UserRound } from 'lucide-vue-next'

const route = useRoute()
const cursorStore = useCursorStore()
</script>

<template>
  <motion.div class="fixed inset-x-0 top-0 z-[80]">
    <div class="p-5 md:p-10 grid">
      <RouterLink
        v-if="route.fullPath != '/login'"
        to="/login"
        class="border-white/20 border-2 border-solid text-white p-2 text-md rounded-full bg-neutral-900 hover:bg-black transition-all duration-500 justify-self-end"
        @mouseover="cursorStore.hovered"
        @mouseleave="cursorStore.notHovered"
        ><UserRound color="#ffffff"
      /></RouterLink>
      <RouterLink
        v-if="route.fullPath != '/'"
        to="/"
        class="text-white p-2 text-md rounded-full bg-neutral-900 hover:bg-black transition-all duration-500 justify-self-start"
        @mouseover="cursorStore.hovered"
        @mouseleave="cursorStore.notHovered"
        ><CircleArrowLeft color="#ffffff"
      /></RouterLink>
    </div>
  </motion.div>
</template>
