<script setup lang="ts">
import { motion } from 'motion-v'
import expData from '@/assets/data/testimonials.json'
import { useCursorStore } from '@/stores/cursor'

defineProps<{
  title?: string
}>()

const cursorStore = useCursorStore()
const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}

const testVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (custom: unknown) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeInOut',
      delay: typeof custom === 'number' ? 0.2 * custom : 0,
    },
  }),
}
</script>

<template>
  <div class="w-full px-5 py-20 md:px-10 xl:px-0 md:pt-60 md:pb-20 flex justify-center">
    <div class="container min-h-[500px]">
      <motion.h2
        class="text-white text-6xl md:text-8xl xl:text-[5vw] font-normal block pb-20 px-0 md:px-20 md:pb-20 text-center"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 0.5 }"
        >{{ title }}</motion.h2
      >
      <div v-if="expData.testimonials.length">
        <div class="lg:grid lg:grid-cols-2 lg:gap-10">
          <motion.div
            v-for="(exp, index) in expData.testimonials"
            :key="`test${index}`"
            class="border-1 border-white/10 border-solid rounded-3xl p-10 w-full md:w-auto !mb-10 lg:!mb-0 opacity-0 block"
            :class="index == 0 ? 'col-span-2' : ''"
            :variants="testVariants"
            :custom="index"
            initial="hidden"
            whileInView="visible"
            :inViewOptions="{ once: true, amount: 0.25 }"
            @mouseover="cursorStore.hoveredLove"
            @mouseleave="cursorStore.notHovered"
          >
            <div class="flex items-center">
              <div
                class="!bg-cover w-[75px] h-[75px] rounded-full grayscale !mr-5 border-1 border-white border-solid"
                :style="{ background: `url(${exp.image}) center center no-repeat` }"
              ></div>
              <h3 class="text-white text-4xl font-normal">{{ exp.name }}</h3>
            </div>
            <p class="text-nuetral-500 text-lg leading-loose py-5">{{ exp.content }}</p>
            <p class="text-white text-lg">{{ exp.role }}</p>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
</template>
