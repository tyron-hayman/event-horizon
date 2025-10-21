<script setup lang="ts">
import { homepageStore } from '@/stores/sanity'
import GlobalHeader from '@/components/GlobalHeader.vue'
import HomeScene from '@/components/scenes/HomeScene.vue'
import HeroComponent from '@/components/HeroComponent.vue'
import WorkComponent from '@/components/WorkComponent.vue'
import AboutComponent from '@/components/AboutComponent.vue'
import ExerienceComponent from '@/components/ExerienceComponent.vue'
import TestimonialsComponent from '@/components/TestimonialsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { geminiStore } from '@/stores/gemini'
import { useRoute } from 'vue-router'
import { onMounted } from 'vue'

const homeStore = homepageStore()
const gemstore = geminiStore()
const route = useRoute()

onMounted(() => {
  if (route.hash) {
    const target = route.hash.replace('#', '')
    const el = document.querySelector(`.${target}`)

    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }
})

gemstore.setStatus("Tyron Hayman's Portfolio")
</script>

<template>
  <div class="w-full">
    <Suspense>
      <HomeScene />
    </Suspense>
    <div class="relative w-full z-[1]" v-if="homeStore.data && !homeStore.isLoading">
      <Suspense>
        <GlobalHeader :image="homeStore.siteAvatar" />
      </Suspense>
      <HeroComponent :title="homeStore.heroText" :image="homeStore.siteAvatar" />
      <WorkComponent title="Recent Work" :data="homeStore.siteWork" />
      <AboutComponent :title="homeStore.siteAboutTitle" :content="homeStore.siteAboutContent" />
      <ExerienceComponent title="My Experience" :data="homeStore.siteExperience" />
      <TestimonialsComponent
        :title="homeStore.siteExperienceTitle"
        :data="homeStore.siteTestimonials"
      />
      <FooterComponent
        :title="homeStore.siteFooterTitle"
        :email="homeStore.siteFooterEmail"
        footerContentLeft="Design & Developed in "
        footerContentRight="Crafted using Vue 3, Pinia, Sanity, Framer & Lucide"
      />
    </div>
  </div>
</template>
