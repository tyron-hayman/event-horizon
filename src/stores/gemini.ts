import { ref, type Ref } from 'vue'
import { defineStore } from 'pinia'

export const geminiStore = defineStore('geministore', () => {
  const status: Ref = ref('')

  function setStatus(newStatus: string) {
    status.value = newStatus
  }

  return { status, setStatus }
})
