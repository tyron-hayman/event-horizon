<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { Suspense } from 'vue';
import StatueMain from './StatueMain.vue'
import { useProgress } from '@tresjs/cientos'
import { easeOut, motion } from 'motion-v';

const { hasFinishLoading, progress, items } = await useProgress()
</script>

<template>
  <motion.div
    class="fixed left-0 bottom-0 top-0 z-[5] bg-rose-700 overflow-hidden"
    :initial="{ width : '100%' }"
    :animate="{ width : hasFinishLoading ? '0%' : '100%'  }"
    :transition="{ duration : 0.75, ease: easeOut, delay: 0.75}"
  >
    <div class="absolute left-10 bottom-10 z-[1] mix-blend-difference">
      <p class="text-white text-[20dvw]">{{ Math.round(progress) }}%</p>
    </div>
    <div class="absolute left-0 bottom-0 top-0 z-[0] w-[5px] bg-black transition-[width] duration-500 ease-in-out" :style="{ width : `${progress}%`}"></div>
  </motion.div>
  <div class="w-full h-screen fixed z-[0] inset-0">
    <TresCanvas window-size shadows clear-color="#000000" :dpr="1.5" :antialias="false">
      <Suspense>
        <StatueMain />
      </Suspense>
    </TresCanvas>
  </div>
</template>
