<script setup lang="ts">
import { motion } from 'motion-v'
import { type Service } from '@/stores/sanity'

defineProps<{
  title?: string
  data: Array<Service> | undefined
}>()

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}

const serviceVariants = {
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
  <div class="w-full px-5 py-20 md:px-10 xl:px-0 md:pt-60 md:pb-20 serviceContainer">
    <div class="container !mx-auto">
      <motion.h2
        class="block text-white text-center text-8xl leading-8xl w-full pb-20"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 0.5 }"
        >{{ title }}</motion.h2
      >
    </div>
    <div class="!mt-10 md!mt-20 min-h-[500]">
      <div v-if="data" class="container !mx-auto grid grid-cols-3 gap-10">
        <motion.div
          v-for="(service, index) in data"
          :key="`service${index}`"
          class="col-span-3 lg:col-span-1 bg-black rounded-4xl p-10"
          :style="{ zIndex: index }"
          :variants="serviceVariants"
          :custom="index"
          initial="hidden"
          whileInView="visible"
          :inViewOptions="{ once: true, amount: 0.25 }"
        >
          <h3 class="text-white text-3xl md:text-4xl !font-black uppercase !mb-10">
            {{ service.title }}
          </h3>
          <p class="text-neutral-500 text-xl leading-relaxed">{{ service.desc }}</p>
        </motion.div>
      </div>
    </div>
  </div>
</template>
