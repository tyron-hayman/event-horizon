<script setup lang="ts">
import { motion, useMotionValue, useTransform, type MotionValue } from 'motion-v'

const props = defineProps<{
  title: string
  link: string
  index: number
  progress: MotionValue<number>
  data: Array<{ title: string; link: string }>
}>()

const y = useTransform(props.progress, [0, 1], [props.index, 0])
const opacity = useTransform(props.progress, [0, 1], [0, 1])

</script>

<template>
    <motion.a 
        :style="{ y, opacity }"
        :href="link" target="_blank" 
        class="text-5xl xl:text-7xl text-[var(--text-color)] hover:text-white font-normal !mb-5 md:!mb-0 block"
    >
        {{ title }}
    </motion.a>
</template>
