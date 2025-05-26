<script setup lang="ts">
import { LogOut, Settings } from 'lucide-vue-next'
defineProps<{
  data: Users[]
}>()

const links: Array<{ id: string; title: string; link: string }> = [
  { id: 'dashboard', title: 'Dashboard', link: '/dashboard' },
  { id: 'clients', title: 'Clients', link: '/' },
  { id: 'projects', title: 'Projects', link: '/' },
]
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="container !mt-10 flex items-center justify-between">
      <div>
        <h1 class="text-white text-lg">Welcome {{ data[0].first_name }}</h1>
      </div>
      <div>
        <ul class="flex items-center justify-between w-full">
          <li v-for="link in links" :key="link.id">
            <a class="text-white text-lg block p-2" :href="link.link">{{ link.title }}</a>
          </li>
          <li>
            <a href="/" class="text-white text-lg block p-2"><Settings /></a>
          </li>
          <li>
            <a href="/" class="text-white text-lg block p-2"><LogOut /></a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
