<script setup lang="ts">
import { motion } from 'motion-v'

defineProps<{
  title?: string
  content?: string
}>()

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
  <div class="w-full px-5 py-20 md:px-10 xl:px-0 md:pt-40 md:pb-20 flex justify-center">
    <div class="container flex flex-wrap xl:flex-nowrap justify-between">
      <motion.h2
        class="text-white text-[25vw] md:text-[15vw] xl:text-[7vw] leading-[25vw] md:leading-[6vw] w-full xl:w-3/12 pb-10 xl:pb-0"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 0.5 }"
        >{{ title }}</motion.h2
      >
      <motion.p
        class="text-white text-2xl md:text-4xl leading-relaxed font-normal block w-full xl:w-8/12"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 0.5 }"
        >{{ content }}</motion.p
      >
    </div>
  </div>
</template>
