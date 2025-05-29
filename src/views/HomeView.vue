<script setup lang="ts">
import { homepageStore } from '@/stores/sanity'
import HeroComponent from '@/components/HeroComponent.vue'
import WorkComponent from '@/components/WorkComponent.vue'
import AboutComponent from '@/components/AboutComponent.vue'
import ServicesComponent from '@/components/ServicesComponent.vue'
import ExerienceComponent from '@/components/ExerienceComponent.vue'
import TestimonialsComponent from '@/components/TestimonialsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'

const homeStore = homepageStore()
</script>

<template>
  <div class="w-full">
    <div v-if="homeStore.data && !homeStore.isLoading">
      <HeroComponent
        :title="homeStore.heroText"
        subtitle="My Name Is Tyron"
        :image="homeStore.siteAvatar"
      />
      <WorkComponent title="Recent Work" :data="homeStore.siteWork" />
      <AboutComponent :title="homeStore.siteAboutTitle" :content="homeStore.siteAboutContent" />
      <ExerienceComponent title="My Experience" :data="homeStore.siteExperience" />
      <ServicesComponent title="What I Offer" :data="homeStore.siteServices" />
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
