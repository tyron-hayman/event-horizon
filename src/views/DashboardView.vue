<script setup lang="ts">
import { ref } from 'vue'
import CursorComponent from '@/components/CursorComponent.vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { getUser } from '@/utils/supabase/actions'
import GlobalLoader from '@/components/GlobalLoader.vue'

const router = useRouter()
const loading = ref<boolean>(true)

onMounted(() => {
  loadUser()
})

const loadUser = async () => {
  try {
    const user = await getUser()
    if (user) {
      console.log(user)
    } else {
      router.push('/login')
    }
  } catch {
    alert('An error occured, please try again later')
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
