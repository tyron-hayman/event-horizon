<script setup lang="ts">
import { onMounted, ref } from 'vue'
import sanityClient, { type SanityImageData, type SanityImageAsset } from '@/utils/sanity/sanity'
import { useRoute, useRouter } from 'vue-router'
import { motion } from 'motion-v'
import { homepageStore } from '@/stores/sanity'
import { useCursorStore } from '@/stores/cursor'
import { CircleArrowLeft } from 'lucide-vue-next'

interface ProjectData {
  _id: string
  title: string
  company: string
  Image: (SanityImageData & { asset?: SanityImageAsset }) | undefined
  desc: string
  role: string
  tech: Array<string>
  link: string
}

const projectData = ref<Array<ProjectData> | null>(null)
const route = useRoute()
const router = useRouter()
const homeStore = homepageStore()
const cursorStore = useCursorStore()

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}

onMounted(() => {
  if (!route.params.id) {
    router.push('/')
  } else {
    homeStore.completeLoadingInit()
    fetchProData(route.params.id as string)
    homeStore.fetchSettings()
  }
})

const fetchProData = async (id: string): Promise<void> => {
  try {
    const query = `*[_type == "work" && _id == "${id}" ]{
            _id,
            title,
            desc,
            Image {
              asset->{
                _id,
                url,
                metadata {
                  lqip
                }
              },
              alt
            },
            company,
            role,
            tech,
            link
        }`
    const fetchedData = await sanityClient.fetch<ProjectData[]>(query)
    projectData.value = fetchedData
    console.log(fetchedData)
  } catch {
    console.error('A fatal error occured fetching this project.')
  } finally {
    homeStore.completeLoading()
  }
}

const goBack = () => {
  router.push(`/`)
}
</script>

<template>
  <div class="w-full">
    <div class="w-full flex justify-center px-5 md:px-10 xl:px-0 min-h-[700px]">
      <div v-if="projectData && homeStore.loadComplete" class="container !mt-10 md:!mt-40">
        <div @click="goBack">
          <CircleArrowLeft
            class="text-3xl text-white !mb-10 inline-block cursor-pointer"
            color="#ffffff"
            :size="40"
          />
        </div>
        <motion.h1
          class="text-white text-[10vw] leading-[9vw] block"
          :variants="variants"
          initial="hidden"
          whileInView="visible"
          :inViewOptions="{ once: true, amount: 'all' }"
          >{{ projectData[0].title }}</motion.h1
        >
        <div class="w-full md:flex justify-between !mt-10 md:!mt-20">
          <motion.div
            class="w-full md:w-3/12 !mb-10 md:!mb-0"
            :variants="variants"
            initial="hidden"
            whileInView="visible"
            :inViewOptions="{ once: true, amount: 'some' }"
          >
            <p class="text-white text-lg">
              <strong class="text-white/50 block uppercase">Agency:</strong
              >{{ projectData[0].company }}
            </p>
            <p class="text-white text-lg">
              <strong class="text-white/50 block uppercase">Client:</strong
              >{{ projectData[0].title }}
            </p>
            <p class="text-white text-lg">
              <strong class="text-white/50 block uppercase">Role:</strong>{{ projectData[0].role }}
            </p>
          </motion.div>
          <motion.div
            class="w-full md:w-8/12"
            :variants="variants"
            initial="hidden"
            whileInView="visible"
            :inViewOptions="{ once: true, amount: 'some' }"
          >
            <img
              v-if="projectData[0].Image"
              class="w-full aspect-video rounded-3xl !mb-10"
              :src="projectData[0].Image.asset.url"
              :alt="projectData[0].Image.alt"
            />
            <p class="text-white text-xl leading-relaxed !mb-10">{{ projectData[0].desc }}</p>
            <a
              class="inline-block rounded-full bg-white text-black text-2xl px-10 py-4"
              :href="projectData[0].link"
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
