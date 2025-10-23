<script setup lang="ts">
import { motion, useScroll, useTransform } from 'motion-v'
import { useCursorStore } from '@/stores/cursor'
import { ref } from 'vue'
import { Dot, SquareArrowUpRight } from 'lucide-vue-next'
import { useDevice } from '@/utils/DeviceCheck'

const props = defineProps<{
  title?: string
  data: Array<{
    _id: string
    Image: { asset: { url: string } }
    company: string
    desc: string
    link: string
    tech: []
    title: string
  }> | undefined
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

const { isMobile } = useDevice();
const containerRef = ref(null)
const cursorStore = useCursorStore()
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['start start', 'end end'],
})

const variants = {
  initial: { opacity: 0, y: 100, filter: 'blur(8px)' },
  visible: (custom: unknown) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.35,
      ease: 'easeInOut',
      delay: typeof custom === 'number' ? 0.05 * custom : 0,
    },
  }),
  exit: { opacity: 0, y: 100, filter: 'blur(8px)' }
}

const openLink = ( url : string ) => {
  window.open(url);
}
</script>

<template>
  <section
    ref="containerRef"
    class="w-full relative workContainer !my-40 px-5 lg:px-0"
  >
    <div class="w-full">
      <div class="container !mx-auto">
        <motion.h2
          class="text-white text-3xl md:text-4xl font-normal block pb-10 md:pb-20"
          :variants="variants"
          initial="initial"
          whileInView="visible"
          :custom="0"
          :inViewOptions="{ once: true, amount: 'all' }"
          >{{ title }}</motion.h2>
      </div>
      <div class="w-full">
      <div class="container !mx-auto">
        <motion.div v-if="data" class="w-full grid grid-cols-4 gap-20">
          <motion.div 
            v-for="(project, index) in data" 
            :key="`pro${index}`" 
            class="col-span-4 lg:col-span-2 !bg-cover aspect-square md:aspect-[3/2] rounded-3xl overflow-hidden relative group"
            :style="{ background : `url(${project.Image.asset.url}) center center no-repeat`}"
            :variants="variants"
            initial="initial"
            whileInView="visible"
            :custom="index"
            :inViewOptions="{ once: true, amount: 0.5 }"
            @hoverStart="cursorStore.hovered"
            @hoverEnd="cursorStore.notHovered"
            @click="openLink(project.link)"
            >
            <div class="absolute inset-y-0 left-0 w-[100%] md:w-[0%] z-[1] bg-black/80 md:bg-black group-hover:w-[100%] transition-[width] duration-500 opacity-100"></div>
            <div class="absolute inset-0 z-[2] grid grid-cols-1">
              <div class="col-span-1 p-10 self-start">
                <h3 class="text-white text-3xl md:text-6xl !mb-5 !font-black leading-7xl uppercase col-span-1 self-start opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 md:-translate-x-10 group-hover:translate-x-0 delay-150 ease-in-out">{{ project.title }}</h3>
                <ul class="w-full flex flex-wrap gap-2 opacity-100 md:opacity-0 group-hover:opacity-100 transition-all duration-500 translate-x-0 md:-translate-x-10 group-hover:translate-x-0 delay-250 ease-in-out">
                  <li v-for="(tech, index) in project.tech" :key="`tech${index}`" class="text-sm text-white border-white border-1 border-solid rounded-full px-4 py-1">{{ tech }}</li>
                </ul>
              </div>
              <p class="text-white text-xl !m-10 block !self-end place-self-end opacity-100 md:opacity-0 group-hover:opacity-100 transition-[opacity] duration-500 delay-350"><SquareArrowUpRight :size="32" /></p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  </div>
    </section>
  <section class="!pt-20 pb-40 overflow-hidden">
    <h3 class="text-3xl text-white font-bold w-10/12 md:w-1/2 text-center !mx-auto !mb-40">
      I've had the honor to work with some large companies while freelancing and during fulltime
      employment.
    </h3>
    <div class="-rotate-5 border-y-2 border-y-white border-dashed scale-102 py-5">
      <Vue3Marquee :duration="40" :pauseOnHover="true">
        <span
          v-for="(brand, index) in brands"
          :key="`brand${index}`"
          class="text-4xl md:text-8xl text-white font-bold flex items-center"
        >
          <span class="text-white p-5 rounded-3xl">{{ brand }}</span
          ><span class="px-10"><Dot :size="64" color="#ffffff" /></span>
        </span>
      </Vue3Marquee>
    </div>
  </section>
</template>
