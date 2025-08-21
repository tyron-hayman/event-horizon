import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import WorkView from '@/views/WorkView.vue'
import BlogView from '@/views/BlogView.vue'
import BlogViewSingle from '@/views/BlogViewSingle.vue'

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (savedPosition) {
          resolve({ top: savedPosition.top })
        } else {
          resolve({ left: 0, top: 0 })
        }
      }, 500)
    })
  },
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/work',
      name: 'work',
      component: WorkView,
    },
    { path: '/work/:id', component: WorkView },
    { path: '/blog', component: BlogView },
    { path: '/blog/:id', component: BlogViewSingle },
  ],
})

export default router
