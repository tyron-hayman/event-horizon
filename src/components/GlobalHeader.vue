<script setup lang="ts">
import { type SanityImageData, type SanityImageAsset } from '@/utils/sanity/sanity'
import { useCursorStore } from '@/stores/cursor'
import { useRoute, useRouter } from 'vue-router'
import { getTopTracks } from '@/utils/spotify'
import { easeInOut, motion } from 'motion-v'
import { Terminal } from 'lucide-vue-next';


defineProps<{
  image?: (SanityImageData & { asset?: SanityImageAsset | undefined }) | undefined
}>()

const cursorStore = useCursorStore()
const router = useRouter()
const route = useRoute()
const topTrack = await getTopTracks();
const navArr: Array<{ title: string; target?: string; link?: string; link_target?: string }> = [
  { title: 'Work', target: 'workContainer' },
  { title: 'About', target: 'aboutContainer' },
  { title: 'GitHub', link: 'https://github.com/tyron-hayman', link_target: '_blank' },
]

const handleNavLink = (e: MouseEvent) => {
  e.preventDefault()
  const target = (e.target as HTMLElement).dataset.target
  const el = document.querySelector(`.${target}`)
  const isBlogPage = route.fullPath.startsWith('/blog')
  const isWorkPage = route.fullPath.startsWith('/work')

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
      <div class="">
        <p class="text-lg text-white !font-black"><Terminal :size="24" class="inline-block" /> Frontend Developer</p>
      </div>

      <div v-if="image" class="flex items-center gap-4 hidden md:block">
        <div v-if="topTrack" v-for="(artist, index) in topTrack" class="flex items-center rounded-full overflow-hidden">
          <div class="w-[42px] aspect-square rounded-full overflow-hidden !bg-cover relative z-[1] border-white border-1 border-solid" :style="{ background : `url(${artist.images[0].url}) center center no-repeat` }"></div>
          <motion.p 
            class="text-sm leading-[1] text-black py-2 px-3 relative z-[0] rounded-full bg-white grid grid-cols-1 content-start"
          >
            <span class="!font-black col-span-1">Current Spotify</span> 
            <span class="col-span-1">{{ artist.name }}</span>
          </motion.p>
        </div>
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
              :target="navItem.link_target"
              >{{ navItem.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
