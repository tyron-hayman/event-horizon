<script setup lang="ts">
import { type SanityImageData, type SanityImageAsset } from '@/utils/sanity/sanity'
import { useCursorStore } from '@/stores/cursor'
import { useRoute, useRouter } from 'vue-router'
defineProps<{
  image?: (SanityImageData & { asset?: SanityImageAsset | undefined }) | undefined
}>()

const cursorStore = useCursorStore()
const router = useRouter()
const route = useRoute()
const navArr: Array<{ title: string; target?: string; link?: string }> = [
  { title: 'Work', target: 'workContainer' },
  { title: 'Blog', link: '/blog' },
  { title: 'About', target: 'aboutContainer' },
  { title: 'Services', target: 'serviceContainer' },
]

const handleNavLink = (e: MouseEvent) => {
  e.preventDefault()
  const target = (e.target as HTMLElement).dataset.target
  const el = document.querySelector(`.${target}`)
  const isBlogPage = route.fullPath.startsWith('/blog')
  const isWorkPage = route.fullPath.startsWith('/work')
  console.log(route.fullPath)

  if (isBlogPage || isWorkPage) {
    router.push({ path: '/', hash: `#${target}` })
    return false
  }

  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  return false
}

const goHome = (): void => {
  router.push('/')
}
</script>

<template>
  <div class="fixed w-full inset-x-0 top-0 z-[80] bg-linear-to-b from-black from-20% to-black/0">
    <div class="w-full flex justify-between items-center p-5 md:p-10 pb-30">
      <div v-if="image">
        <div
          class="w-[50px] h-[50px] !bg-cover rounded-full"
          :style="{ backgroundImage: `url(${image.asset.url})` }"
          @click="goHome"
          @mouseover="cursorStore.hovered"
          @mouseleave="cursorStore.notHovered"
        ></div>
      </div>
      <div>
        <ul class="flex items-center gap-2 md:gap-4">
          <li v-for="(navItem, index) in navArr" :key="`nav${index}`">
            <a
              v-if="navItem.target"
              class="text-white text-lg md:text-xl"
              href="/"
              :data-target="navItem.target"
              @click="(e) => handleNavLink(e)"
              @mouseover="cursorStore.hovered"
              @mouseleave="cursorStore.notHovered"
              >{{ navItem.title }}</a
            >
            <a
              v-else
              class="text-white text-lg md:text-xl"
              :href="navItem.link"
              @mouseover="cursorStore.hovered"
              @mouseleave="cursorStore.notHovered"
              >{{ navItem.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
