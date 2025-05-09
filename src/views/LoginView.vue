<script setup lang="ts">
import { motion } from 'motion-v'
import { ref } from 'vue'
import { supabase } from '@/utilities/supabaseClient'
import type { Ref } from 'vue'

const userData: Ref = ref({
  email: '',
  password: '',
})

const signInUser = async (event: MouseEvent) => {
  event.preventDefault()
  try {
    const { data } = await supabase.auth.signInWithPassword({
      email: userData.value.email,
      password: userData.value.password,
    })
    console.log(data)
  } catch (error) {
    console.log(error)
  }
  return false
}

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: 'anticipate' },
  },
}
</script>

<template>
  <div class="w-full h-screen min-h-screen flex items-center justify-center">
    <motion.div
      class="rounded-3xl border-white/10 border-1 border-solid p-10 w-full md:w-[450px]"
      :variants="variants"
      initial="hidden"
      whileInView="visible"
      :inViewOptions="{ once: true, amount: 0.25 }"
    >
      <h1 class="text-white text-5xl pb-5">Client Portal</h1>
      <div class="loginForm w-full">
        <form class="w-full">
          <input
            type="text"
            name="uName"
            class="formInputs w-full !mb-5"
            placeholder="Email*"
            v-model="userData.email"
          />
          <input
            type="password"
            name="uName"
            class="formInputs w-full !mb-5"
            placeholder="Password*"
            v-model="userData.password"
          />
          <div class="">
            <button
              class="text-white text-md bg-blue-500 hover:bg-black rounded-3xl px-10 py-2 cursor-pointer !mb-5"
              v-on:click="signInUser"
            >
              Login
            </button>
            <p class="text-white/50 text-xs">Registration given upon client onboarding.</p>
          </div>
        </form>
      </div>
    </motion.div>
  </div>
</template>
