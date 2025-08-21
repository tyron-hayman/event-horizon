<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import CursorComponent from '@/components/CursorComponent.vue'
import ChatboxComponent from './components/ChatboxComponent.vue'
import { homepageStore } from '@/stores/sanity'
import { workStore } from '@/stores/work'
import { blogStore } from '@/stores/blog'
import { inject } from '@vercel/analytics'

const active = ref<boolean>(true)
const homeStore = homepageStore()
const workpageStore = workStore()
const blogPageStore = blogStore()

const onBeforeEnter = () => {
  active.value = true
}

const onEnter = (el: Element, done: () => void) => {
  if (!homeStore.isLoading) {
    active.value = false
    setTimeout(() => {
      done()
    }, 750)
  }
}

const onLeave = (el: Element, done: () => void) => {
  active.value = true
  setTimeout(() => {
    done()
  }, 750)
}

onMounted(async () => {
  await homeStore.fetchSettings()
  await workpageStore.fetchWork()
  await blogPageStore.fetchBlogPosts()
  if (!homeStore.isLoading) {
    active.value = false
  }
  inject()
})
</script>

<template>
  <SpeedInsights />
  <CursorComponent />
  <ChatboxComponent :isLoaded="active" />
  <div
    class="fixed inset-x-0 top-0 bg-stone-900 z-[99] transition-all duration-700"
    :class="active ? 'h-[100vh]' : 'h-[0vh]'"
  ></div>
  <div
    class="fixed inset-x-0 top-0 bg-black z-[100] transition-all duration-300 flex items-center justify-center overflow-hidden"
    :class="active ? 'h-[100vh]' : 'h-[0vh]'"
  >
    <p class="text-white text-3xl animate-pulse">Tidying things up....</p>
  </div>
  <router-view v-slot="{ Component, route }">
    <transition mode="out-in" @before-enter="onBeforeEnter" @enter="onEnter" @leave="onLeave">
      <component :is="Component" :key="route.path" />
    </transition>
  </router-view>
</template>
