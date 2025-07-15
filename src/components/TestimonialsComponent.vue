<script setup lang="ts">
import { motion } from 'motion-v'
import { useCursorStore } from '@/stores/cursor'

defineProps<{
  title?: string
  data?: Array<{
    name: string
    content: string
    Image: { asset: { url: string } }
    company: string
  }>
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
      <div v-if="data">
        <div class="lg:grid lg:grid-cols-2 lg:gap-10">
          <motion.div
            v-for="(exp, index) in data"
            :key="`test${index}`"
            class="bg-black rounded-3xl p-10 w-full md:w-auto !mb-10 lg:!mb-0 opacity-0 block"
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
                :style="{ background: `url(${exp.Image.asset.url}) center center no-repeat` }"
              ></div>
              <h3 class="text-white text-4xl font-normal">{{ exp.name }}</h3>
            </div>
            <p class="text-neutral-500 text-lg leading-loose py-5">{{ exp.content }}</p>
            <p class="text-white text-lg">{{ exp.company }}</p>
          </motion.div>
        </div>
      </div>
    </div>
  </div>
</template>
