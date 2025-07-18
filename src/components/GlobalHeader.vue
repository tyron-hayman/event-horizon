<script setup lang="ts">
import { type SanityImageData, type SanityImageAsset } from '@/utils/sanity/sanity'
defineProps<{
  image?: (SanityImageData & { asset?: SanityImageAsset | undefined }) | undefined
}>()

const navArr: Array<{ title: string; target: string }> = [
  { title: 'Work', target: 'workContainer' },
  { title: 'About', target: 'aboutContainer' },
  { title: 'Services', target: 'serviceContainer' },
  { title: 'Contact', target: 'contactContainer' },
]

const handleNavLink = (e: MouseEvent) => {
  e.preventDefault()
  const target = (e.target as HTMLElement).dataset.target
  const el = document.querySelector(`.${target}`)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
  return false
}
</script>

<template>
  <div class="fixed w-full inset-x-0 top-0 z-[80] bg-linear-to-b from-black from-20% to-black/0">
    <div class="w-full flex justify-between items-center p-5 md:p-10 pb-30">
      <div v-if="image">
        <div
          class="w-[50px] h-[50px] !bg-cover rounded-full"
          :style="{ backgroundImage: `url(${image.asset.url})` }"
        ></div>
      </div>
      <div>
        <ul class="flex items-center gap-2 md:gap-4">
          <li v-for="(navItem, index) in navArr" :key="`nav${index}`">
            <a
              class="text-white text-lg md:text-xl"
              href="/"
              :data-target="navItem.target"
              @click="(e) => handleNavLink(e)"
              >{{ navItem.title }}</a
            >
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
