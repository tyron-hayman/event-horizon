<script setup lang="ts">
import { onMounted } from 'vue'
import { homepageStore } from '@/stores/sanity'
import CursorComponent from '@/components/CursorComponent.vue'
import HeroComponent from '@/components/HeroComponent.vue'
import WorkComponent from '@/components/WorkComponent.vue'
import AboutComponent from '@/components/AboutComponent.vue'
import ExerienceComponent from '@/components/ExerienceComponent.vue'
import TestimonialsComponent from '@/components/TestimonialsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import GlobalLoader from '@/components/GlobalLoader.vue'

const homeStore = homepageStore()

onMounted(() => {
  homeStore.fetchSettings()
})
</script>

<template>
  <div class="w-full">
    <div v-if="!homeStore.data">
      <GlobalLoader />
    </div>
    <div v-else>
      <CursorComponent />
      <HeroComponent
        :title="homeStore.heroText"
        subtitle="My Name Is Tyron"
        :image="homeStore.siteAvatar"
      />
      <WorkComponent title="Recent Work" :data="homeStore.siteWork" />
      <AboutComponent :title="homeStore.siteAboutTitle" :content="homeStore.siteAboutContent" />
      <ExerienceComponent title="My Experience" :data="homeStore.siteExperience" />
      <TestimonialsComponent
        :title="homeStore.siteExperienceTitle"
        :data="homeStore.siteTestimonials"
      />
      <FooterComponent
        title="Let's Talk."
        email="hello@tyronhayman.me"
        footerContentLeft="Design & Developed in "
        footerContentRight="Crafted using Vue 3, Pinia, Sanity & Lucide"
      />
    </div>
  </div>
</template>
