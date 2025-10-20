<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { SpeedInsights } from '@vercel/speed-insights/vue'
import CursorComponent from '@/components/CursorComponent.vue'
import { homepageStore } from '@/stores/sanity'
import { workStore } from '@/stores/work'
import { blogStore } from '@/stores/blog'
import { inject } from '@vercel/analytics'
import { VueLenis } from 'lenis/vue'

const active = ref<boolean>(true)
const homeStore = homepageStore()
const workpageStore = workStore()
const blogPageStore = blogStore()

const lenisOptions = {
  // lenis options (optional)
}

onMounted(async () => {
  await homeStore.fetchSettings()
  await workpageStore.fetchWork()
  await blogPageStore.fetchBlogPosts()
  inject()
})
</script>

<template>
  <SpeedInsights />
  <CursorComponent />
  <VueLenis root :options="lenisOptions" />
  <router-view v-slot="{ Component, route }">
      <component :is="Component" :key="route.path" />
  </router-view>
</template>
