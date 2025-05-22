<script setup lang="ts">
import CursorComponent from '@/components/CursorComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="w-full">
    <CursorComponent />
    <FooterComponent
      title="Let's Talk."
      email="hello@tyronhayman.me"
      :hide="true"
      footerContentLeft="Design & Developed in "
      footerContentRight="Crafted using Vue 3, Pinia & Lucide"
    />
  </div>
</template>
