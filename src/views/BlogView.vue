<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { motion } from 'motion-v'
import { homepageStore } from '@/stores/sanity'
import { blogStore, type BlogPosts } from '@/stores/blog'
import { formatDate } from '@/utils/sanity/sanity'
import { useCursorStore } from '@/stores/cursor'
import { useRouter } from 'vue-router'

const homeStore = homepageStore()
const blogPageStore = blogStore()
const cursorStore = useCursorStore()
const router = useRouter()
const blogData = ref<Array<BlogPosts> | null | undefined>(null)

const proVariants = {
  hidden: { opacity: 0, y: 100 },
  visible: (custom: unknown) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.75,
      ease: 'easeInOut',
      delay: typeof custom === 'number' ? 0.2 * custom : 0,
    },
  }),
}

onMounted(async () => {
  homeStore.completeLoadingInit()
  if (!homeStore.fetchSettings) {
    await homeStore.fetchSettings
  }
  if (!blogPageStore.blogData) {
    await blogPageStore.fetchBlogPosts()
  }
  blogData.value = blogPageStore.blogData
})

const handlePostClick = (e: MouseEvent, slug: string): void => {
  e.preventDefault()
  router.push(`/blog/${slug}`)
}
</script>

<template>
  <div class="w-full">
    <HomeScene />
    <div class="relative w-full z-[1]" v-if="homeStore.data && !homeStore.isLoading">
      <GlobalHeader :image="homeStore.siteAvatar" />
      <div class="w-full px-5 py-20 md:px-10 xl:px-0 md:py-40 min-h-[500px]">
        <div class="w-full !mt-20 !mb-40">
          <Vue3Marquee :duration="40" class="overflow-y-hidden overflow-x-hidden">
            <h1 class="text-white text-8xl md:text-[10vw] leading-[1] block px-5">
              Ideas - experiments - tutorials -
            </h1>
            <h2 class="text-white text-8xl md:text-[10vw] leading-[1] block px-5">
              Ideas - experiments - tutorials -
            </h2>
          </Vue3Marquee>
        </div>
        <div class="container grid grid-cols-2 gap-10 !mx-auto">
          <motion.div
            class="border-white/10 hover:border-white/100 transition-[border] duration-500 border-solid border-1 rounded-3xl p-10 col-span-2 md:col-span-1 curson-pointer"
            v-if="blogData"
            v-for="(post, index) in blogData"
            :key="`post${index}`"
            :variants="proVariants"
            :custom="index"
            initial="hidden"
            whileInView="visible"
            :inViewOptions="{ once: true, amount: 0.1 }"
            @mouseover="cursorStore.hovered"
            @mouseleave="cursorStore.notHovered"
            @click="(e) => handlePostClick(e, post.slug.current)"
          >
            <h2 class="text-white text-4xl pb-5">{{ post.title }}</h2>
            <p class="text-stone-500 text-xl">{{ formatDate(post.desc) }}</p>
          </motion.div>
        </div>
      </div>
      <FooterComponent
        :title="homeStore.siteFooterTitle"
        :email="homeStore.siteFooterEmail"
        footerContentLeft="Design & Developed in "
        footerContentRight="Crafted using Vue 3, Pinia, Sanity, Framer & Lucide"
      />
    </div>
  </div>
</template>
