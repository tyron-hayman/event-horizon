<script setup lang="ts">
import { motion, useScroll, useTransform } from 'motion-v'
import type { Ref } from 'vue'
import { ref } from 'vue'
import { type SanityImageData, type SanityImageAsset } from '@/utils/sanity/sanity'

const props = defineProps<{
  title?: string
  image?: (SanityImageData & { asset?: SanityImageAsset | undefined }) | undefined
}>()
const heroRef: Ref = ref(null)
const { scrollYProgress } = useScroll({
  offset : ["start start", "+70vh"]
})
const opacity = useTransform(scrollYProgress, [0,1], [1,0]);
const y = useTransform(scrollYProgress, [0,1], [0, -200]);
const blur = useTransform(scrollYProgress, [0,1], ["blur(0px)", "blur(8px)"]);
</script>

<template>
  <motion.div
    ref="heroRef"
    class="w-full relative flex items-end h-screen min-h-screen z-[1]"
    :style="{ opacity, y, filter : blur }"
  >
    <div class="w-full">
      <div class="p-5 pb-20 md:p-10">
        <p class="text-lg md:text-5xl w-full md:w-5/12 text-[var(--text-color)] !mb-2 md:!mb-0">{{ title }}</p>
        <h1 class="text-[15vw] md:text-[17vw] leading-[1] text-white !font-black">T-HAYMAN</h1>
      </div>
    </div>
  </motion.div>
</template>
