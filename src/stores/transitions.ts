import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useTransitionStore = defineStore('cursor', () => {
  const transitioning: Ref = ref<boolean>(false)
  function transitionDone() {
    transitioning.value = true
  }
  function transitionActive() {
    transitioning.value = false
  }

  return { transitioning, transitionDone, transitionActive }
})
