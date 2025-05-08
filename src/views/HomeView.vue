<script setup lang="ts">
import CursorComponent from '@/components/CursorComponent.vue'
import HeroComponent from '@/components/HeroComponent.vue'
import WorkComponent from '@/components/WorkComponent.vue'
import AboutComponent from '@/components/AboutComponent.vue'
import ExerienceComponent from '@/components/ExerienceComponent.vue'
import TestimonialsComponent from '@/components/TestimonialsComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="w-full">
    <CursorComponent />
    <HeroComponent
      title="A Web Developer Passionate About User Experience."
      subtitle="My Name Is Tyron"
      image="/images/me.jpeg"
    />
    <WorkComponent title="Recent Work" />
    <AboutComponent
      title="I AM..."
      content="A seasoned web developer with over a decade of experience in the industry, I have collaborated with clients from various sectors, including real estate, advertising, and mental health. My experience encompasses working in dynamic environments and utilizing a diverse range of technologies to develop user-friendly websites and small-scale web applications."
    />
    <ExerienceComponent title="My Experience" />
    <TestimonialsComponent title="I have worked with some amazing people." />
    <FooterComponent
      title="Let's Talk."
      email="hello@tyronhayman.me"
      footerContentLeft="Design & Developed in "
      footerContentRight="Crafted using Vue 3, Pinia & Lucide"
    />
  </div>
</template>
