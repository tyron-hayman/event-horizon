<script setup lang="ts">
import CursorComponent from '@/components/CursorComponent.vue'
import HeaderComponent from '@/components/HeaderComponent.vue'
import LoginForm from '@/components/login/LoginForm.vue'
import FooterComponent from '@/components/FooterComponent.vue'
</script>

<template>
  <div class="w-full">
    <CursorComponent />
    <HeaderComponent />
    <LoginForm title="Client Portal" />
    <FooterComponent
      title="Let's Talk."
      email="hello@tyronhayman.me"
      :hide="true"
      footerContentLeft="Design & Developed in "
      footerContentRight="Crafted using Vue 3, Pinia & Lucide"
    />
  </div>
</template>
