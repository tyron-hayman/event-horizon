<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { homepageStore } from '@/stores/sanity'
import { blogStore, type BlogPosts } from '@/stores/blog'
import { PortableText } from '@portabletext/vue'
import { useRoute, useRouter } from 'vue-router'
import { formatDate } from '@/utils/sanity/sanity'

const homeStore = homepageStore()
const blogPageStore = blogStore()
const route = useRoute()
const router = useRouter()
const blogData = ref<BlogPosts | null | undefined>(null)
const slug = route.params.id

onMounted(async () => {
  if (!slug) {
    router.push('/')
  } else {
    homeStore.completeLoadingInit()
    if (!homeStore.fetchSettings) {
      await homeStore.fetchSettings
    }
    if (!blogPageStore.blogData) {
      await blogPageStore.fetchBlogPosts()
    }
    blogData.value = setBlogData(slug as string)
  }
})

const setBlogData = (urlSlug: string) => {
  if (blogPageStore.blogData) {
    const query = decodeURIComponent(urlSlug)
    const response = blogPageStore.blogData.find((o) => o.slug.current === query)
    console.log(response)
    return response
  } else {
    return null
  }
}
</script>

<template>
  <div class="w-full">
    <HomeScene />
    <div class="relative w-full z-[1]" v-if="homeStore.data && !homeStore.isLoading">
      <GlobalHeader :image="homeStore.siteAvatar" />
      <div v-if="blogData" class="w-full px-5 py-20 md:px-10 xl:px-0 md:py-40 min-h-[500px]">
        <div class="container !mx-auto !mt-20 !mb-20 md:!mb-40">
          <p class="text-2xl md:text-4xl text-stone-500 leading-snug font-bold">
            {{ formatDate(blogData.desc) }}
          </p>
          <h1 class="text-5xl md:text-8xl text-white leading-snug font-bold">
            {{ blogData.title }}
          </h1>
        </div>
        <div class="container !mx-auto blogSingleView">
          <article class="w-full">
            <PortableText :value="blogData.content" />
          </article>
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
