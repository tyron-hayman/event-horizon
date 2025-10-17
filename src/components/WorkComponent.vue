<script setup lang="ts">
import { motion, useScroll } from 'motion-v'
import { useCursorStore } from '@/stores/cursor'
import { ref } from 'vue'
import { Dot, MoveRight } from 'lucide-vue-next'
import WorkLinks from './ui/WorkLinks.vue'
import { useDevice } from '@/utils/DeviceCheck'

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

const { isMobile } = useDevice();
const containerRef = ref(null)
const cursorStore = useCursorStore()
const { scrollYProgress } = useScroll({
  target: containerRef,
  offset: ['-0.2 start', 'end end'],
})
const activeBg = ref<number>(0)
const currActiveBG = ref<number>(0)
const variants = {
  initial: { opacity: 0, x: 100, filter: 'blur(8px)' },
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
  exit: { opacity: 0, x: 100, filter: 'blur(8px)' }
}
const proImageVariants = {
  initial: { opacity: 0, filter: 'blur(8px)' },
  visible: { 
    opacity: 1, 
    filter: 'blur(0px)', 
    transition: {
      duration: 0.5,
    },
  },
  exit: { opacity: 0, filter: 'blur(8px)' }
}

const porjectHover = (index : number) => {
  cursorStore.hovered;
  activeBg.value = index;
}

const porjectHoverMobile = (index : number) => {
  activeBg.value = index;
  currActiveBG.value = index;
}
</script>

<template>
  <section
    ref="containerRef"
    class="w-full lg:min-h-[130dvh] relative workContainer py-40"
  >
    <div class="w-full sticky top-30">
      <div class="w-full lg:min-h-[80vh] lg:min-h-[80vh] relative grid grid-cols-2 gap-0 z-[2]">
          <div class="col-span-2 lg:col-span-1 self-start"><h2 class="text-4xl leading-4xl font-black text-white pl-10">{{  title  }}</h2></div>
          <div class="col-span-2 relative lg:absolute z-[1] lg:left-10 md:top-0 lg:top-20 lg:right-10 overflow-x-hidden block !my-20 xl:!my-0">
        <AnimatePresence>
          <div class="w-full flex justify-between flex-wrap">
            <div class="w-full lg:w-6/12">
              <div v-if="data" class="w-full relative">
                <motion.div
                  :key="`workImage${activeBg}`"
                  class="w-11/12 lg:w-full !mx-auto lg:!m-0 aspect-video !bg-cover rounded-full relative z-[1] shadow-sm"
                  :style="{ background : `url(${data[activeBg].Image.asset.url}) center center no-repeat` }"
                  :variants="proImageVariants"
                  initial="initial"
                  animate="visible"
                  exit="exit"
                ></motion.div>
              </div>
            </div>
            <div :key="`work${activeBg}`" class="hidden lg:block w-5/12 xl:w-4/12">
              <ul class="flex flex-wrap gap-2" v-if="data">
                <motion.li
                  class="text-white text-md xl:text-2xl rounded-full px-5 py-2 border-white/10 border-solid border-1"
                  v-for="(tech, index) in data[activeBg].tech" 
                  :key="`tech${index}`"
                  :variants="variants"
                  initial="initial"
                  animate="visible"
                  exit="exit"
                  :custom="index"
                >{{ tech }}
                </motion.li>
              </ul>
            </div>
          </div>
        </AnimatePresence>
      </div>
          <div v-if="!isMobile" class="col-span-2 self-end relative z-[2]">
            <div class="grid grid grid-cols-12 gap-10">
              <div class="col-span-12 lg:col-span-4"></div>
              <div class="col-span-12 lg:col-span-8 text-left md:text-right">
                <div class="pl-10 md:pl-0 pr-10" v-if="data">
                  <WorkLinks 
                    v-for="(exp, index) in data" 
                    :key="`experience${exp}`"
                    :title="exp.title"
                    :link="exp.link"
                    :index="index * 50"
                    :progress="scrollYProgress"
                    :data="data"
                    @mouseover="porjectHover(index)"
                    @mouseleave="cursorStore.notHovered"
                  />
                </div>
              </div>
            </div>
          </div>
          <div v-if="isMobile" class="col-span-2 self-end relative z-[2]">
            <motion.p
                v-for="(expMob, expindex) in data" 
                :key="`experienceMoble${expindex}`"
                class="text-2xl md:text-4xl text-[var(--text-color)] hover:text-white font-normal !mb-5 lg:!mb-0 block !mx-5 block flex justify-between items-center"
                :class="expindex == activeBg ? 'text-white' : null"
                @click="() => porjectHoverMobile(expindex)"
            >
                <span>{{ expMob.title }}</span>
                <a v-if="expindex == activeBg" :href="expMob.link" class="rounded-full bg-white inline-block p-2 text-black" target="_blank"><MoveRight /></a>
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  <section class="!pt-20 pb-40 overflow-hidden">
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
  </section>
</template>
