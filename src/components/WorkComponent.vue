<script setup lang="ts">
import { motion, useTransform, useScroll } from 'motion-v'
import { ArrowUpRight } from 'lucide-vue-next'
import { useCursorStore } from '@/stores/cursor'
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import { Dot } from 'lucide-vue-next'

defineProps<{
  title?: string
  data?: Array<{
    _id: string
    Image: { asset: { url: string } }
    company: string
    desc: string
    link: string
    tech: []
    title: string
  }>
}>()

const brands: Array<string> = [
  'Nike',
  'Hungerford Properties',
  'Onni',
  'McDonalds',
  'Disney',
  'LottoMax',
  'EVO',
  'Axis Realestate',
  '131 Water',
]

const containerRef = ref(null)
const cursorStore = useCursorStore()
const router = useRouter()
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', '400px'],
})
const scale = useTransform(scrollYProgress, [0, 1], [1, 0.3])
const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
const y = useTransform(scrollYProgress, [0, 1], ['0px', '40px'])
const blur = useTransform(scrollYProgress, [0, 1], ['blur(0px)', 'blur(20px)'])

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}

const proVariants = {
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

const openProject = (id: string) => {
  router.push(`/work/${id}`)
}
</script>

<template>
  <div
    class="w-full px-5 py-20 md:px-10 xl:px-0 md:py-40 flex justify-center min-h-[700px] workContainer"
  >
    <div v-if="data" ref="containerRef" class="container relative">
      <motion.h2
        class="text-white text-5xl md:text-8xl !font-light block pb-10 md:pb-20 uppercase sticky top-20 text-center relative"
        :style="{ scale, y, filter: blur, opacity }"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 'all' }"
        >{{ title }}</motion.h2
      >
      <div
        class="w-full lg:grid grid-cols-[repeat(2,1fr)] gap-[10rem] items-start relative z-[1] cursor-pointer !mt-20"
      >
        <motion.div
          class="!mb-20 md:!mb-0"
          v-for="(project, index) in data"
          :class="index % 2 != 0 ? '!mt-50' : null"
          :key="project.title"
          :variants="proVariants"
          :custom="index"
          initial="hidden"
          whileInView="visible"
          :inViewOptions="{ once: true, amount: 0.1 }"
          @click="openProject(project._id)"
          @mouseover="cursorStore.hovered"
          @mouseleave="cursorStore.notHovered"
        >
          <div
            class="w-full aspect-square !bg-cover rounded-3xl !mb-10"
            :style="{ background: `url(${project.Image?.asset.url}) center center no-repeat` }"
          ></div>
          <h2 class="text-white text-3xl md:text-5xl font-normal !mb-5 uppercase w-full">
            {{ project.title }}<ArrowUpRight class="inline-block align-middle" :size="44" />
          </h2>
          <ul class="flex flex-wrap items-center gap-2">
            <li
              v-for="(tech, index) in project.tech"
              :key="`tech${index}`"
              class="text-white text-md bg-stone-900 py-1 px-4 rounded-full"
            >
              {{ tech }}
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  </div>
  <div class="!pt-20 pb-40 overflow-hidden">
    <h3 class="text-3xl text-white font-bold w-10/12 md:w-1/2 text-center !mx-auto !mb-40">
      I've had the honor to work with some large companies while freelancing and during fulltime
      employment.
    </h3>
    <div class="-rotate-5">
      <Vue3Marquee :duration="40" :pauseOnHover="true">
        <span
          v-for="(brand, index) in brands"
          :key="`brand${index}`"
          class="text-4xl md:text-8xl text-white font-bold flex items-center"
        >
          <span class="bg-white text-black p-5">{{ brand }}</span
          ><span class="px-10"><Dot :size="64" /></span>
        </span>
      </Vue3Marquee>
    </div>
  </div>
</template>
