<script setup lang="ts">
import { motion } from 'motion-v'
import { useCursorStore } from '@/stores/cursor'
import type { LucideIcon } from 'lucide-vue-next'

defineProps<{
  title?: string
  email?: string
  footerContentLeft?: string
  footerContentRight?: string | HTMLElement | LucideIcon
}>()
const date: Date = new Date()
const cursorStore = useCursorStore()

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}
</script>

<template>
  <div class="w-full px-5 py-20 md:px-10 xl:px-0 md:pt-60 md:pb-20 flex flex-wrap justify-center">
    <div class="container">
      <motion.h2
        class="text-neutral-700 text-6xl md:text-8xl xl:text-[10vw] font-normal block"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 0.5 }"
        >{{ title }}</motion.h2
      >
      <motion.a
        class="text-white text-3xl md:text-5xl lg:text-7xl xl:text-8xl font-normal block pb-20 md:pb-20"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 0.5 }"
        @mouseover="cursorStore.hoveredMail"
        @mouseleave="cursorStore.notHovered"
        :href="`mailto:${email}`"
        >{{ email }}</motion.a
      >
    </div>
    <motion.div
      class="container border-t-1 border-white/10 border-solid py-10"
      :variants="variants"
      initial="hidden"
      whileInView="visible"
      :inViewOptions="{ once: true, amount: 0.5 }"
    >
      <div class="md:flex justify-between">
        <p class="text-white text-md !mb-5 md:!mb-0">
          {{ `${footerContentLeft} ${' '} ${date.getFullYear()}` }}
        </p>
        <p class="text-white text-md">{{ footerContentRight }}</p>
      </div>
    </motion.div>
  </div>
</template>
