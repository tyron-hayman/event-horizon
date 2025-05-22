<script setup lang="ts">
import { useCursorStore } from '@/stores/cursor'
import { RouterLink } from 'vue-router'

const cursorStore = useCursorStore()

// const handleLogin = () => {

// }
</script>

<template>
  <div class="fixed top-0 inset-x-0 w-full z-[90]">
    <div class="p-5 grid">
      <div class="justify-self-end">
        <RouterLink
          class="text-white text-md inline-block px-4 py-2 rounded-full bg-neutral-800 hover:bg-white hover:text-neutral-800 transition-all duration-500"
          to="/login"
          @mouseover="cursorStore.hovered"
          @mouseleave="cursorStore.notHovered"
          activeClass="!hidden"
          >Client Portal</RouterLink
        >
        <RouterLink
          class="text-white text-md inline-block px-4 py-2 rounded-full bg-neutral-800 hover:bg-white hover:text-neutral-800 transition-all duration-500"
          to="/"
          @mouseover="cursorStore.hovered"
          @mouseleave="cursorStore.notHovered"
          activeClass="!hidden"
          >Home</RouterLink
        >
      </div>
    </div>
  </div>
</template>
