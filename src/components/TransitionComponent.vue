<script setup lang="ts">
import { onMounted, ref } from 'vue'
import router from '@/router'
import { LoaderCircle } from 'lucide-vue-next'

const isActive = ref<boolean>(true)

router.beforeEach((to, from, next) => {
  isActive.value = true
  setTimeout(() => {
    next()
  }, 750)
})

router.afterEach(async () => {
  isActive.value = false
})

onMounted(() => {
  isActive.value = false
})
</script>

<template>
  <div
    class="fixed inset-x-0 top-0 bg-white z-[100] transition-height duration-750 ease-in-out"
    :style="{ height: isActive ? '100vh' : '0vh' }"
  ></div>
  <div
    class="fixed inset-x-0 top-0 bg-black z-[101] transition-height duration-500 ease-in-out flex items-center justify-center overflow-hidden"
    :style="{ height: isActive ? '100vh' : '0vh' }"
  >
    <p class="text-4xl text-white animate-spin"><LoaderCircle /></p>
  </div>
</template>
