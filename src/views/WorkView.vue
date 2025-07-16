<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { motion } from 'motion-v'
import { homepageStore } from '@/stores/sanity'
import { type ProjectData, workStore } from '@/stores/work'
import { useCursorStore } from '@/stores/cursor'
import { CircleArrowLeft } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const homeStore = homepageStore()
const cursorStore = useCursorStore()
const workpageStore = workStore()
const proData = ref<ProjectData | null | undefined>(null)
const pro_id = route.params.id

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}

onMounted(async () => {
  if (!pro_id) {
    router.push('/')
  } else {
    homeStore.completeLoadingInit()
    if (!homeStore.fetchSettings) {
      await homeStore.fetchSettings
    }
    if (!workpageStore.proData) {
      await workpageStore.fetchWork()
    }
    proData.value = setProData(pro_id as string)
  }
})

const goBack = () => {
  router.push(`/`)
}

const setProData = (id: string): ProjectData | null | undefined => {
  if (workpageStore.proData) {
    const response = workpageStore.proData.find((o) => o._id === id)
    return response
  } else {
    return null
  }
}
</script>

<template>
  <div class="w-full">
    <HomeScene />
    <div class="w-full relative z-[1] flex justify-center min-h-[700px]">
      <div v-if="proData" class="w-full !mt-10 md:!mt-40 overflow-x-hidden">
        <div class="container !mx-auto px-5 md:px-10 xl:px-0" @click="goBack">
          <CircleArrowLeft
            class="text-3xl text-white !mb-10 inline-block cursor-pointer"
            color="#ffffff"
            :size="40"
          />
        </div>
        <Vue3Marquee :duration="40" class="overflow-y-hidden">
          <h1 class="text-white text-8xl md:text-[10vw] leading-[1] block px-5">
            {{ proData.title }}
          </h1>
          <h2 class="text-white text-8xl md:text-[10vw] leading-[1] block px-5">
            {{ proData.title }}
          </h2>
        </Vue3Marquee>
        <div
          class="container !mx-auto md:flex justify-between !mt-10 md:!mt-20 px-5 md:px-10 xl:px-0"
        >
          <motion.div
            class="w-full md:w-3/12 !mb-10 md:!mb-0"
            :variants="variants"
            initial="hidden"
            whileInView="visible"
            :inViewOptions="{ once: true, amount: 'some' }"
          >
            <p class="text-white text-lg pb-4">
              <strong class="text-white/50 block uppercase">Agency:</strong>{{ proData.company }}
            </p>
            <p class="text-white text-lg pb-4">
              <strong class="text-white/50 block uppercase">Client:</strong>{{ proData.title }}
            </p>
            <p class="text-white text-lg pb-4">
              <strong class="text-white/50 block uppercase">Role:</strong>{{ proData.role }}
            </p>
            <p class="text-white text-lg">
              <strong class="text-white/50 block uppercase">Tech Stack</strong>
            </p>
            <ul>
              <li
                v-for="(tech, index) in proData.tech"
                :key="`tech${index}`"
                class="text-white text-lg"
              >
                {{ tech }}
              </li>
            </ul>
          </motion.div>
          <motion.div
            class="w-full md:w-8/12"
            :variants="variants"
            initial="hidden"
            whileInView="visible"
            :inViewOptions="{ once: true, amount: 'some' }"
          >
            <div class="grid grid-cols-4 gap-6 !mb-20">
              <div
                class="!bg-cover col-span-4 md:col-span-3 rounded-3xl overflow-hidden aspect-video"
                :style="{
                  background: `url(${proData?.website_Image?.asset?.url ?? ''}) center center no-repeat`,
                }"
              ></div>
              <div
                class="!bg-cover col-span-1 rounded-3xl overflow-hidden hidden md:block"
                :style="{
                  background: `url(${proData?.mobile_Image?.asset?.url ?? ''}) center center no-repeat`,
                }"
              ></div>
            </div>
            <p class="text-white text-xl leading-relaxed !mb-10">{{ proData.desc }}</p>
            <a
              class="inline-block rounded-full bg-white text-black text-2xl px-10 py-4"
              :href="proData.link"
              target="_blank"
              @mouseover="cursorStore.hovered"
              @mouseleave="cursorStore.notHovered"
              >Visit</a
            >
          </motion.div>
        </div>
      </div>
    </div>
    <FooterComponent
      :title="homeStore.siteFooterTitle"
      :email="homeStore.siteFooterEmail"
      footerContentLeft="Design & Developed in "
      footerContentRight="Crafted using Vue 3, Pinia, Sanity, Framer & Lucide"
    />
  </div>
</template>
