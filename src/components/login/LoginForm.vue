<script setup lang="ts">
interface IProps {
  title: string
  content?: string
}

withDefaults(defineProps<IProps>(), {
  title: 'Client Portal',
  content: 'Please enter your email and password to login to your account.',
})
</script>

<template>
  <div class="w-full mx-auto flex pt-60 justify-center">
    <div class="w-11/12 md:w-1/2">
      <h1 class="text-white text-6xl pb-5">{{ title }}</h1>
      <p class="text-white text-lg pb-5 leading-relaxed">{{ content }}</p>
      <form class="w-full">
        <input
          type="text"
          placeholder="Email*"
          class="w-full p-2 rounded-md bg-neutral-800 text-white !mb-4"
        />
        <input
          type="password"
          placeholder="Password*"
          class="w-full p-2 rounded-md bg-neutral-800 text-white !mb-4"
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
