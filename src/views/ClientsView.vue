<script setup lang="ts">
import { ref } from 'vue'
import FooterComponent from '@/components/FooterComponent.vue'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import GlobalLoader from '@/components/GlobalLoader.vue'
import { getUser, getUserData } from '@/utils/supabase/actions'
import LoggedInHeader from '@/components/login/LoggedInHeader.vue'

const router = useRouter()
const loading = ref<boolean>(true)
const userData = ref<Users[]>([])

onMounted(() => {
  loadUser()
})

const loadUser = async () => {
  loading.value = true
  try {
    const user = await getUser()
    if (user) {
      loadUserData(user.id)
    } else {
      router.push('/login')
    }
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const loadUserData = async (id: string): Promise<void | null | Users[]> => {
  try {
    const user = await getUserData(id)
    if (user) {
      userData.value = user
    } else {
      console.error('Ther was an error retreiving user data.')
    }
  } catch {
    console.error('Ther was an error retreiving user data.')
  }
}
</script>

<template>
  <div class="w-full">
    <div v-if="!loading">
      <LoggedInHeader v-if="userData.length > 0" :data="userData" />
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
