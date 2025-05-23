<script setup lang="ts">
import { ref } from 'vue'
import CursorComponent from '@/components/CursorComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GlobalLoader from '@/components/GlobalLoader.vue'
import { getUser } from '@/utils/supabase/actions'
import type { User } from '@supabase/supabase-js'

const router = useRouter()
const loading = ref<boolean>(true)
const userData = ref<User>()

onMounted(() => {
  loadUser()
})

const loadUser = async () => {
  loading.value = true
  try {
    const user = await getUser()
    if (user) {
      userData.value = user
      console.log(userData.value)
    } else {
      router.push('/login')
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="w-full">
    <div v-if="!loading">
      <CursorComponent />
      <FooterComponent
        title="Let's Talk."
        email="hello@tyronhayman.me"
        :hide="true"
        footerContentLeft="Design & Developed in "
        footerContentRight="Crafted using Vue 3, Pinia & Lucide"
      />
    </div>
    <div v-else><GlobalLoader /></div>
  </div>
</template>
