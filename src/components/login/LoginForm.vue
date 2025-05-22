<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { login } from '@/utils/supabase/actions'

interface IProps {
  title: string
  content?: string
}

withDefaults(defineProps<IProps>(), {
  title: 'Client Portal',
  content: 'Please enter your email and password to login to your account.',
})

const u_email: Ref<string> = ref('')
const u_pass: Ref<string> = ref('')

const handleLogin = async (event: Event) => {
  event.preventDefault()
  try {
    const response = login(u_email.value, u_pass.value)
    console.log(response)
  } catch (error) {
    console.log(error)
  }
  return false
}
</script>

<template>
  <div class="w-full mx-auto flex pt-60 justify-center">
    <div class="w-11/12 md:w-1/2">
      <h1 class="text-white text-6xl pb-5">{{ title }}</h1>
      <p class="text-white text-lg pb-5 leading-relaxed">{{ content }}</p>
      <form class="w-full" @submit.prevent="handleLogin">
        <input
          type="text"
          placeholder="Email*"
          class="w-full p-2 rounded-md bg-neutral-800 text-white !mb-4"
          v-model="u_email"
        />
        <input
          type="password"
          placeholder="Password*"
          class="w-full p-2 rounded-md bg-neutral-800 text-white !mb-4"
          v-model="u_pass"
        />
        <button
          type="submit"
          class="py-2 px-5 text-lg rounded-md bg-amber-400 text-blac cursor-pointer"
        >
          Login
        </button>
      </form>
    </div>
  </div>
</template>
