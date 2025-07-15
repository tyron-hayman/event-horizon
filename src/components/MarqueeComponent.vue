<script setup lang="ts">
import { ref } from 'vue'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame,
} from 'motion-v'
import { wrap } from '@motionone/utils'

const brands: Array<string> = [
  'Nike',
  'Hungerford Properties',
  'Onni',
  'MacDonalds',
  'Disney',
  'LottoMax',
  'EVO',
]

const baseX = useMotionValue(0)
const { scrollY } = useScroll()
const scrollVelocity = useVelocity(scrollY)
const smoothVelocity = useSpring(scrollVelocity, {
  damping: 50,
  stiffness: 400,
})
const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
  clamp: false,
})

/**
 * This is a magic wrapping for the length of the text - you
 * have to replace for wrapping that works for you or dynamically
 * calculate
 */
const x = useTransform(baseX, (v) => `${wrap(-100, -40, v)}%`)

const directionFactor = ref<number>(1)
useAnimationFrame((t, delta) => {
  let moveBy = directionFactor.value * 5 * (delta / 1000)

  /**
   * This is what changes the direction of the scroll once we
   * switch scrolling directions.
   */
  if (velocityFactor.get() < 0) {
    directionFactor.value = -1
  } else if (velocityFactor.get() > 0) {
    directionFactor.value = 1
  }

  moveBy += directionFactor.value * moveBy * velocityFactor.get()

  baseX.set(baseX.get() + moveBy)
})
</script>

<template>
  <div class="relative w-full -rotate-5">
    <div
      class="w-full parallax overflow-hidden tracking-[-2px] leading-[0.8] !m-0 flex flex-nowrap whitespace-nowrap"
    >
      <motion.div
        class="w-full scroller font-semibold uppercase text-8xl flex whitespace-nowrap flex-nowrap border-y-1 border-y-solid border-y-white/50"
        :style="{ x }"
      >
        <span v-for="(brand, index) in brands" :key="`brand${index}`" class="block !mr-[30px]">
          {{ brand }}
        </span>
        <span v-for="(brand, index) in brands" :key="`brand${index}`" class="block !mr-[30px]">
          {{ brand }}
        </span>
      </motion.div>
    </div>
  </div>
</template>
