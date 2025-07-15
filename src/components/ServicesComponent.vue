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
        class="block text-white text-center text-6xl md:text-8xl xl:text-[5vw] md:text-[15vw] xl:text-[7vw] leading-[25vw] md:leading-[15vw] w-full pb-10 xl:pb-0"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 0.5 }"
        >{{ title }}</motion.h2
      >
    </div>
    <div class="!mt-10 md!mt-20 min-h-[500]">
      <div v-if="data" class="container !mx-auto grid xl:grid-cols-3 gap-10">
        <motion.div
          v-for="(service, index) in data"
          :key="`service${index}`"
          class="rounded-3xl bg-black p-10"
          :variants="serviceVariants"
          :custom="index"
          initial="hidden"
          whileInView="visible"
          :inViewOptions="{ once: true, amount: 0.25 }"
        >
          <div class="!mb-10">
            <h3 class="text-white text-4xl md:text-6xl !font-black block w-full">
              {{ service.title }}
            </h3>
          </div>
          <p class="text-neutral-500 text-xl leading-relaxed">{{ service.desc }}</p>
        </motion.div>
      </div>
    </div>
  </div>
</template>
