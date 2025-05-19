<script setup lang="ts">
import { motion } from 'motion-v'
import workData from '@/assets/data/projects.json'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { CircleX, CirclePlus } from 'lucide-vue-next'
import { useCursorStore } from '@/stores/cursor'

defineProps<{
  title?: string
}>()

const projectData: Array<{
  name: string
  date: string
  tech: string[]
  company: string
  content: string
  link: string
  image: string
}> = workData.projects
const activePro: Ref = ref(0)
const modalOpen: Ref = ref(false)
const modalChildOpen: Ref = ref(false)
const cursorStore = useCursorStore()

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

const handleModalClose = () => {
  modalChildOpen.value = false
  setTimeout(() => {
    modalOpen.value = false
  }, 250)
}

const openModal = (index: number) => {
  activePro.value = index
  modalOpen.value = true
  setTimeout(() => {
    modalChildOpen.value = true
  }, 250)
}
</script>

<template>
  <div
    class="w-full px-5 py-20 md:px-10 xl:px-0 md:py-40 md:!mt-[100vh] flex justify-center min-h-[700px]"
  >
    <div v-if="projectData" class="container">
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
          v-for="(project, index) in projectData"
          :key="project.name"
          :variants="proVariants"
          :custom="index"
          initial="hidden"
          whileInView="visible"
          :inViewOptions="{ once: true, amount: 0.25 }"
          @click="openModal(index)"
          @mouseover="cursorStore.hovered"
          @mouseleave="cursorStore.notHovered"
        >
          <div
            class="absolute inset-0 z-[1] !bg-cover scale-125 rotate-10"
            :style="{ background: `url(${project.image}) left top no-repeat` }"
          ></div>
          <CirclePlus
            class="absolute bottom-5 right-5 z-[20] cursor-pointer block z-[5]"
            color="#333333"
            @click="handleModalClose"
          />
          <div
            class="bg-linear-to-b from-white to-white/0 p-10 from-50% absolute inset-x-0 top-0 z-[2]"
          >
            <h4 class="text-neutral-500 text-xl font-normal">{{ project.company }}</h4>
            <h3 class="text-neutral-900 text-3xl font-normal">{{ project.name }}</h3>
          </div>
        </motion.div>
      </div>
    </div>
  </div>
  <motion.div
    class="fixed flex items-center justify-center z-[10] inset-0 bg-neutral-900/60 backdrop-blur-md overflow-hidden"
    :animate="modalOpen ? { opacity: 1, display: 'flex' } : { opacity: 0, display: 'none' }"
  >
    <motion.div
      class="w-full h-screen lg:w-10/12 xl:w-1/2 md:h-auto rounded-3xl bg-neutral-800 p-10 md:p-20 relative opacity-0"
      :animate="modalChildOpen ? { opacity: 1, y: 0 } : { opacity: 0, y: 300 }"
    >
      <CircleX
        class="absolute top-10 right-10 z-[20] cursor-pointer block z-[5]"
        color="#ffffff"
        @click="handleModalClose"
      />
      <div
        class="w-full"
        v-for="(project, index) in projectData"
        :class="activePro == index ? 'block' : 'hidden'"
        :key="`sub${project.name}`"
      >
        <h4 class="text-gray-500 text-xl font-normal">{{ project.company }}</h4>
        <h3 class="text-white text-3xl font-normal pb-5">{{ project.name }}</h3>
        <p class="text-white text-lg leading-loose">{{ project.content }}</p>
        <p class="text-lg text-gray-500 pt-5">Tech Used</p>
        <ul class="flex gap-2 pt-2 pb-10 flex-wrap md:flex-nowrap">
          <li
            class="rounded-full border-gray-500 border-1 border-solid text-gray-500 text-sm px-4 py-1"
            v-for="tech in project.tech"
            :key="`sub${tech}`"
          >
            {{ tech }}
          </li>
        </ul>
        <a
          :href="project.link"
          target="_blank"
          class="bg-blue-500 text-lg px-4 py-1 text-white hover:bg-neutral-800 rounded-3xl transition-all duration-500"
          >View Live Site</a
        >
      </div>
    </motion.div>
  </motion.div>
</template>
