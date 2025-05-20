<script setup lang="ts">
import { motion } from 'motion-v'
import expData from '@/assets/data/experience.json'

defineProps<{
  title?: string
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
  <div class="w-full px-5 py-20 md:px-10 xl:px-0 md:py-10 flex justify-center">
    <div class="container min-h-[700px]">
      <motion.h2
        class="text-white text-3xl md:text-4xl font-normal block pb-10 md:pb-20"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 'all' }"
        >{{ title }}</motion.h2
      >
      <div v-if="expData.experience.length" class="w-full">
        <motion.div
          v-for="(exp, index) in expData.experience"
          class="md:flex items-center border-t-1 border-t-white/10 border-t-solid w-full py-10"
          :key="`experience${index}`"
          :variants="variants"
          initial="hidden"
          whileInView="visible"
          :inViewOptions="{ once: true, amount: 'some' }"
        >
          <h3 class="text-white text-2xl p-0 m-0 w-full md:w-4/12 lg:w-3/12">
            {{ exp.company }}
          </h3>
          <p class="text-nuetral-500 text-md lg:text-xl p-0 py-4 md:m-0 w-full md:w-6/12">
            {{ exp.role }}
          </p>
          <p
            class="text-nuetral-500 text-md lg:text-xl p-0 m-0 w-full md:w-4/12 lg:w-3/12 md:text-right"
          >
            {{ exp.date }}
          </p>
        </motion.div>
      </div>
    </div>
  </div>
</template>
