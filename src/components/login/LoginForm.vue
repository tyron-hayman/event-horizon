<script setup lang="ts">
import { type Ref, ref } from 'vue'
import { login } from '@/utils/supabase/actions'
import checkEmail from '@/utils/validation'
import { useRouter } from 'vue-router'
import { LoaderCircle } from 'lucide-vue-next'

interface IProps {
  title: string
  content?: string
}

interface Errors {
  content: string
}

withDefaults(defineProps<IProps>(), {
  title: 'Client Portal',
  content: 'Please enter your email and password to login to your account.',
})

const u_email: Ref<string> = ref('')
const u_pass: Ref<string> = ref('')
const formLoader = ref<boolean>(false)
const form_errors = ref<Array<Errors>>([])
const router = useRouter()

const handleLogin = async (event: Event) => {
  event.preventDefault()
  form_errors.value = []
  formLoader.value = true

  if (!checkEmail(u_email.value)) {
    form_errors.value.push({ content: 'Please use a valid email' })
  }

  if (u_pass.value == '') {
    form_errors.value.push({ content: 'Please enter your password' })
  }

  if (form_errors.value.length > 0) {
    console.log(form_errors.value)
    formLoader.value = false
    return false
  }

  try {
    const response = await login(u_email.value, u_pass.value)
    if (response === 'failed') {
      form_errors.value.push({ content: 'Authentication failed, do you have an account?' })
    } else {
      router.push('/dashboard')
    }
  } catch (error) {
    console.log(error)
  } finally {
    formLoader.value = false
  }
  return false
}
</script>

<template>
  <div class="w-full mx-auto flex pt-60 justify-center">
    <div class="w-11/12 md:w-1/2">
      <h1 class="text-white text-6xl pb-5">{{ title }}</h1>
      <p class="text-white text-lg pb-5 leading-relaxed">{{ content }}</p>
      <div v-if="form_errors.length > 0" class="bg-rose-600 p-5 rounded-3xl !mb-5">
        <ul class="pl-10">
          <li
            :key="`errors${index}`"
            v-for="(error, index) in form_errors"
            class="text-white text-md list-decimal"
          >
            {{ error.content }}
          </li>
        </ul>
      </div>
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
          <span v-if="!formLoader" class="text-black">Login</span>
          <span v-else class="animate-spin block"><LoaderCircle color="#000000" /></span>
        </button>
      </form>
    </div>
  </div>
</template>
