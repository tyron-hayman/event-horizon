<script setup lang="ts">
import { motion } from 'motion-v'
import { CirclePlus } from 'lucide-vue-next'
import { useCursorStore } from '@/stores/cursor'
import { useRouter } from 'vue-router'

defineProps<{
  title?: string
  data?: Array<{
    _id: string
    Image: { asset: { url: string } }
    company: string
    desc: string
    link: string
    tech: []
    title: string
  }>
}>()

const cursorStore = useCursorStore()
const router = useRouter()

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}

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

const openProject = (id: string) => {
  router.push(`/work/${id}`)
}
</script>

<template>
  <div class="w-full px-5 py-20 md:px-10 xl:px-0 md:py-40 flex justify-center min-h-[700px]">
    <div v-if="data" class="container">
      <motion.h2
        class="text-white text-3xl md:text-6xl font-normal block pb-10 md:pb-20"
        :variants="variants"
        initial="hidden"
        whileInView="visible"
        :inViewOptions="{ once: true, amount: 'all' }"
        >{{ title }}</motion.h2
      >
      <div class="w-full flex gap-2 lg:gap-4 flex-wrap xl:flex-nowrap">
        <motion.div
          class="w-full md:!mb-10 xl:!mb-0 lg:grow xl:w-3/12 hover:xl:w-5/12 rounded-3xl bg-slate-500 p-10 h-[600px] relative overflow-hidden cursor-pointer opacity-0 transition-[width] duration-500"
          v-for="(project, index) in data"
          :key="project.title"
          :variants="proVariants"
          :custom="index"
          initial="hidden"
          whileInView="visible"
          :inViewOptions="{ once: true, amount: 0.25 }"
          @click="openProject(project._id)"
          @mouseover="cursorStore.hovered"
          @mouseleave="cursorStore.notHovered"
        >
          <div
            class="absolute inset-0 z-[1] !bg-cover scale-125 rotate-10"
            :style="{ background: `url(${project.Image?.asset.url}) left top no-repeat` }"
          ></div>
          <CirclePlus
            class="absolute bottom-5 right-5 z-[20] cursor-pointer block z-[5]"
            color="#333333"
          />
          <div
            class="bg-linear-to-b from-white to-white/0 p-10 from-50% absolute inset-x-0 top-0 z-[2]"
          >
            <h4 class="text-neutral-500 text-xl font-normal">{{ project.company }}</h4>
            <h3 class="text-neutral-900 text-3xl font-normal">{{ project.title }}</h3>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
</template>
