<script lang="ts" setup>
import { TresCanvas } from '@tresjs/core'
import { Suspense } from 'vue'
import StatueMain from './StatueMain.vue'
import { useProgress } from '@tresjs/cientos'
import { anticipate, motion } from 'motion-v'

const { hasFinishLoading, progress, items } = await useProgress()
</script>

<template>
  <motion.div
    class="fixed left-0 bottom-0 top-0 right-0 z-[100] bg-[rgb(5,5,5)] overflow-hidden"
    :initial="{ bottom: '0%' }"
    :animate="{ bottom: hasFinishLoading ? '105%' : '0%' }"
    :transition="{ duration: 0.75, ease: anticipate, delay: 1 }"
  >
    <div
      class="absolute z-[1] w-[150px] h-[150px] left-[50%] top-[50%] -translate-x-[75px] -translate-y-[75px] !bg-cover"
      :style="{ background: `url(./images/logo.jpg) center center no-repeat` }"
    ></div>
    <div
      class="absolute left-0 bottom-0 w-full h-[30px] z-[2] w-[5px] border-t-white/10 border-t-1 border-solid"
    >
      <div
        class="absolute left-0 top-0 bottom-0 bg-white transition-[width] duration-1000 ease-in-out overflow-hidden flex items-center justify-end"
        :style="{ width: `${progress}%` }"
      >
        <p class="text-black text-xs !font-semibold leading-[1] p-0 !m-0 pr-5">{{ progress }}%</p>
      </div>
    </div>
  </motion.div>
  <div class="w-full h-screen fixed z-[0] inset-0">
    <TresCanvas window-size shadows clear-color="#000000" :dpr="1.5" :antialias="false">
      <Suspense>
        <StatueMain />
      </Suspense>
    </TresCanvas>
  </div>
</template>
