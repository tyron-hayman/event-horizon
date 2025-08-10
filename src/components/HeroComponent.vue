<script setup lang="ts">
import { motion } from 'motion-v'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { ArrowDown } from 'lucide-vue-next'
import { type SanityImageData, type SanityImageAsset } from '@/utils/sanity/sanity'

const props = defineProps<{
  title?: string
  image?: (SanityImageData & { asset?: SanityImageAsset | undefined }) | undefined
}>()
const heroRef: Ref = ref(null)

const titleArr: Array<string> | undefined = props.title?.split(' ')
</script>

<template>
  <motion.div
    ref="heroRef"
    class="w-full relative flex items-center justify-center h-screen min-h-screen"
  >
    <div class="w-full overflow-hidden">
      <Vue3Marquee :duration="30" class="overflow-y-hidden">
        <span
          v-for="(brand, index) in titleArr"
          :key="`brand${index}`"
          class="text-8xl md:text-[15rem] text-white font-bold flex items-center"
        >
          <span class="text-white px-5">{{ brand }}</span>
        </span>
      </Vue3Marquee>
    </div>
    <div class="absolute inset-x-0 bottom-40 md:bottom-0 pb-10 flex justify-center">
      <div>
        <p class="text-white text-lg md:text-xl !mb-5">Scroll for more</p>
        <ArrowDown class="animate-bounce !mx-auto" :size="32" color="#ffffff" />
      </div>
    </div>
  </motion.div>
</template>
