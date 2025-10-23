<script setup lang="ts">
import { motion, useMotionValue, useSpring } from 'motion-v'
import { onMounted, onUnmounted } from 'vue'
import { useCursorStore } from '@/stores/cursor'
import { Pointer, MessageCircleHeart, Send, ArrowDown } from 'lucide-vue-next'

const xPos = useMotionValue(0)
const yPos = useMotionValue(0)
const spring = { damping: 12, stiffness: 60, restDelta: 0.001 }
const x = useSpring(xPos, spring)
const y = useSpring(yPos, spring)
const cursorStore = useCursorStore()

const updateMousePosition = (event: MouseEvent) => {
  xPos.set(event.clientX - 25)
  yPos.set(event.clientY - 25)
}

onMounted(() => {
  window.addEventListener('mousemove', updateMousePosition)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', updateMousePosition)
})
</script>

<template>
  <motion.div
    class="fixed items-center justify-center left-0 top-0 z-[90] block w-[50px] h-[50px] rounded-full pointer-events-none hidden xl:flex transition-[width] transition-[height]"
    :class="cursorStore.stauts ? 'bg-rose-500' : 'border-rose-500 border-2 border-dashed'"
    :style="{ x, y }"
    :transition="{ type: 'spring', velocity: 2 }"
  >
    <div v-if="cursorStore.stauts && cursorStore.stauts == 'link'" class="w-1/2 block">
      <Pointer color="#ffffff" />
    </div>
    <div v-if="cursorStore.stauts && cursorStore.stauts == 'love'" class="w-1/2 block">
      <MessageCircleHeart color="#ffffff" />
    </div>
    <div v-if="cursorStore.stauts && cursorStore.stauts == 'mail'" class="w-1/2 block">
      <Send color="#ffffff" />
    </div>
    <div v-if="cursorStore.stauts && cursorStore.stauts == 'scroll'" class="w-1/2 block">
      <ArrowDown color="#ffffff" class="animate-bounce" />
    </div>
  </motion.div>
</template>
