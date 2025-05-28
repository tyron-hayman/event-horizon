<script setup lang="ts">
import { ref } from 'vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import CursorComponent from '@/components/CursorComponent.vue'
import { LoaderCircle } from 'lucide-vue-next'

const active = ref<boolean>(true)

const onBeforeEnter = () => {
  active.value = true
}

const onEnter = (el: Element, done: () => void) => {
  active.value = false
  setTimeout(() => {
    done()
  }, 750)
}

const onLeave = (el: Element, done: () => void) => {
  active.value = true
  setTimeout(() => {
    done()
  }, 750)
}
</script>

<template>
  <SpeedInsights />
  <CursorComponent />
  <div
    class="fixed inset-x-0 top-0 bg-white z-[99] transition-all duration-700"
    :class="active ? 'h-[100vh]' : 'h-[0vh]'"
  ></div>
  <div
    class="fixed inset-x-0 top-0 bg-black z-[100] transition-all duration-300 flex items-center justify-center overflow-hidden"
    :class="active ? 'h-[100vh]' : 'h-[0vh]'"
  >
    <p class="text-white text-lg animate-spin"><LoaderCircle /></p>
  </div>
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>
