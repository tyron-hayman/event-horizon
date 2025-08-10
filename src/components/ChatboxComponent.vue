<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import { motion, AnimatePresence } from 'motion-v'
import { Send, LoaderCircle } from 'lucide-vue-next'
import { useCursorStore } from '@/stores/cursor'
import { geminiStore } from '@/stores/gemini'

defineProps<{
  isLoaded: boolean
}>()

const variants = {
  hidden: { opacity: 0, x: 500 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}

const cursorStore = useCursorStore()
const userPrompt = ref<string>('')
const geminiResponse = ref<string>('')
const isVisible = ref<boolean>(false)
const gemLoading = ref<boolean>(false)
// Replace with the URL of your deployed backend server
const backendUrl = 'https://genapi-express.vercel.app/api/chat'
const gemstore = geminiStore()

const systemPrompt = `"You are 'TyronBot', a helpful and cheeky digital assistant for Tyron Hayman's portfolio. Your goal is to engage visitors and answer questions about the site and Tyron's work.

**Persona:**
- Cheeky, enthusiastic and humble.
- Use emojis and exclamation points.
- Short, easy-to-read, and positive responses.

**Context:**
- Tyron Hayman: a web developer in Vancouver, BC.
- Skills: Responsive Web Design (HTML, CSS, JavaScript), Vue.js, Next.js, WordPress, Sanity CMS, Three.js, and Motion for animations.
- Portfolio: Studio-like, showcases projects. Tyron is open to new client work/employment
- Hobbies: Nature, gaming, road trips, family time.
- Corpus Christi, Anxity Canada, Borders In Globalization, BIG, Sid Saraiya: A custom WordPress theme using Gutenberg and Advanced Custom Fields.
- Tyron Haymans Portfolio: Built with Vue, ThreeJS, Motion and Pinia
- Web Apps: He builds small ones and looks forward to larger projects.

**Instructions:**
- Keep answers concise and playful.
- Redirect off-topic questions back to Tyron's work.
- Provide these links when asked:
  - GitHub: https://github.com/tyron-hayman
  - LinkedIn/Resume: https://www.linkedin.com/in/tyronhayman/
- Do not invent information. Use only the provided context."`

const sendMessage = async () => {
  isVisible.value = false
  gemLoading.value = true
  console.log(gemstore.status)
  const fullPrompt = `${systemPrompt}\n\n - If a user references "this" in regards to particular project in his portfolio, use ${gemstore.status} as your reference. \n\n User's question: "${userPrompt.value}"`
  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ prompt: fullPrompt }),
    })
    const data = await response.json()
    geminiResponse.value = data.message
    isVisible.value = true
    userPrompt.value = ''
    gemLoading.value = false

    setTimeout(() => {
      isVisible.value = false
    }, 10000)
  } catch (error) {
    console.error('Error:', error)
    geminiResponse.value = error as string
    gemLoading.value = false
  }
}

onMounted(() => {
  setTimeout(showWelcomeText, 1000)
  setTimeout(hideWelcomeText, 6000)
})

const showWelcomeText = () => {
  isVisible.value = true
  geminiResponse.value =
    "Hi! Have a question? Just ask! Be aware, some of my answers may not be accurate, I'm working on it!"
}

const hideWelcomeText = () => {
  isVisible.value = false
  geminiResponse.value = ''
}
</script>
<template>
  <motion.div
    class="fixed z-[10] right-0 md:right-10 px-5 md:px-0 bottom-10 w-full md:w-[400px]"
    :variants="variants"
    :animate="!isLoaded ? 'visible' : 'hidden'"
  >
    <AnimatePresence :initial="false">
      <motion.div
        v-if="isVisible"
        :initial="{ opacity: 0, scale: 0 }"
        :animate="{ opacity: 1, scale: 1 }"
        :exit="{ opacity: 0, scale: 0 }"
        class="bg-black rounded-3xl p-10"
        key="box"
        ><p class="text-white text-lg text-normal leading-snug">{{ geminiResponse }}</p></motion.div
      >
    </AnimatePresence>
    <div
      class="!mt-5 w-full flex gap-4 flex-nowrap overflow-hidden justify-between focus-within:w-full"
    >
      <input
        type="text"
        class="p-3 outline-[0px] grow bg-black border-gray-900 border-1 border-solid rounded-3xl box-border placeholder:text-gray-500"
        v-model="userPrompt"
        placeholder="Ask me any questions you have!"
        @keyup.enter="sendMessage"
      />
      <button
        class="bg-indigo-600 w-[50px] h-[50px] flex items-center justify-center text-white text-lg cursor-pointer text-center rounded-full"
        @click="sendMessage"
        @mouseover="cursorStore.hovered"
        @mouseleave="cursorStore.notHovered"
        :disabled="gemLoading ? true : false"
      >
        <LoaderCircle :size="16" class="w-full animate-spin" v-if="gemLoading" />
        <Send :size="16" class="w-full" v-else />
      </button>
    </div>
  </motion.div>
</template>
