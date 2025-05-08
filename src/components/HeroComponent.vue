<script setup lang="ts">
import { motion, useScroll, useTransform } from 'motion-v'
import type { Ref } from 'vue'
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowDown } from 'lucide-vue-next'

const props = defineProps<{
  title?: string
  subtitle?: string
  image?: string
}>()
const heroRef: Ref = ref(null)
const { scrollYProgress } = useScroll({
  offset: ['start start', '100vh'],
})
const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])
const scale = useTransform(scrollYProgress, [0, 0.8], [1, 0.7])
const blur = useTransform(scrollYProgress, [0, 0.8], ['blur(0px)', 'blur(8px)'])

// Animation variants for each element
const variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}

const headingVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (custom: unknown) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 1,
      ease: 'anticipate',
      delay: typeof custom === 'number' ? 0.1 * custom : 0,
    },
  }),
}

const greetings: Array<string> = [
  'Hello',
  'سلام',
  'Bonjour',
  'Kwey Kwey',
  'Hola',
  'Tunngasugit',
  '你好',
  'Salve',
  'Guten Tag',
  'こんにちは',
]

const titleArr: Array<string> | undefined = props.title?.split(' ')

let animationInterval: number | null = null
const currentIndex: Ref = ref(0)

const animateSequence = () => {
  // Move to the next index
  currentIndex.value = (currentIndex.value + 1) % greetings.length
}

// Start the animation loop
onMounted(() => {
  animationInterval = setInterval(animateSequence, 3000)
})

// Cleanup interval on component unmount
onUnmounted(() => {
  if (animationInterval) {
    clearInterval(animationInterval)
  }
})
</script>

<template>
  <motion.div
    ref="heroRef"
    class="w-full relative md:fixed inset-0 px-5 pt-20 md:pt-0 md:px-10 xl:p-0 flex items-center justify-center"
    :style="{ opacity, scale, filter: blur }"
  >
    <div class="container">
      <div class="flex items-center pb-5 w-full">
        <motion.div
          class="rounded-full w-[100px] h-[100px] inline-block overflow-hidden"
          initial="hidden"
          animate="visible"
          :variants="variants"
        >
          <img :src="image" class="w-full" alt="My Avatar" />
        </motion.div>
        <div class="pl-5 w-1/2">
          <h3 class="text-2xl md:text-5xl font-normal text-white w-full">
            <span class="relative block w-full overflow-hidden">
              <motion.span
                class="w-full block py-2 opacity-0"
                v-for="(word, index) in greetings"
                :key="index"
                :class="currentIndex === index ? 'relative' : 'absolute left-0 top-0'"
                :animate="currentIndex === index ? 'visible' : 'hidden'"
                :variants="variants"
                >{{ word }}</motion.span
              >
            </span>
          </h3>
          <motion.h2
            class="text-neutral-300 text-lg font-normal"
            initial="hidden"
            animate="visible"
            :variants="variants"
          >
            {{ subtitle }}
          </motion.h2>
        </div>
      </div>
      <h1 class="text-6xl md:text-[7vw] leading-6xl md:leading-[7vw] text-white block w-full">
        <motion.span
          class="inline-block pr-4"
          v-for="(titleWord, index) in titleArr"
          :key="index"
          initial="hidden"
          animate="visible"
          :custom="index"
          :variants="headingVariants"
          >{{ titleWord }}</motion.span
        >
      </h1>
    </div>
    <div class="absolute inset-x-0 bottom-0 pb-10 flex justify-center opacity-0 md:opacity-100">
      <div><ArrowDown class="animate-bounce" :size="32" color="#ffffff" /></div>
    </div>
  </motion.div>
</template>
