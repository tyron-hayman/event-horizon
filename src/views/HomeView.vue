<script setup lang="ts">
import { homepageStore } from '@/stores/sanity'
import GlobalHeader from '@/components/GlobalHeader.vue'
import HomeScene from '@/components/scenes/HomeScene.vue'
import HeroComponent from '@/components/HeroComponent.vue'
import WorkComponent from '@/components/WorkComponent.vue'
import AboutComponent from '@/components/AboutComponent.vue'
import ServicesComponent from '@/components/ServicesComponent.vue'
import ExerienceComponent from '@/components/ExerienceComponent.vue'
import TestimonialsComponent from '@/components/TestimonialsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { geminiStore } from '@/stores/gemini'

const homeStore = homepageStore()
const gemstore = geminiStore()

gemstore.setStatus("Tyron Hayman's Portfolio")
</script>

<template>
  <div class="w-full">
    <HomeScene />
    <div class="relative w-full z-[1]" v-if="homeStore.data && !homeStore.isLoading">
      <GlobalHeader :image="homeStore.siteAvatar" />
      <HeroComponent :title="homeStore.heroText" :image="homeStore.siteAvatar" />
      <WorkComponent title="Recent Work" :data="homeStore.siteWork" />
      <AboutComponent :title="homeStore.siteAboutTitle" :content="homeStore.siteAboutContent" />
      <ExerienceComponent title="My Experience" :data="homeStore.siteExperience" />
      <TestimonialsComponent
        :title="homeStore.siteExperienceTitle"
        :data="homeStore.siteTestimonials"
      />
      <ServicesComponent title="What I Offer" :data="homeStore.siteServices" />
      <FooterComponent
        :title="homeStore.siteFooterTitle"
        :email="homeStore.siteFooterEmail"
        footerContentLeft="Design & Developed in "
        footerContentRight="Crafted using Vue 3, Pinia, Sanity, Framer & Lucide"
      />
    </div>
  </div>
</template>
