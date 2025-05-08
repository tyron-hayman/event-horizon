import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const useCursorStore = defineStore('cursor', () => {
  const stauts: Ref = ref('')
  function hovered() {
    stauts.value = 'link'
  }
  function hoveredLove() {
    stauts.value = 'love'
  }
  function hoveredMail() {
    stauts.value = 'mail'
  }
  function notHovered() {
    stauts.value = ''
  }

  return { stauts, hovered, hoveredLove, hoveredMail, notHovered }
})
