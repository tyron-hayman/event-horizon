// src/stores/settings.ts
import { defineStore } from 'pinia'
import sanityClient from '@/utils/sanity/sanity'

export interface BlogPosts {
  _id: string
  title: string
  slug: { current: string }
  desc: string
  content: any[] // eslint-disable-line
}

// 2. Define the type for the store's state
interface BlogPageState {
  data: Array<BlogPosts> | null
  loading: boolean
  loadComplete: boolean
  error: Error | null
}

export const blogStore = defineStore('blogposts', {
  state: (): BlogPageState => ({
    data: null,
    loading: false,
    loadComplete: false,
    error: null,
  }),
  actions: {
    completeLoading(): void {
      this.loadComplete = true
    },
    completeLoadingInit(): void {
      this.loadComplete = false
    },
    async fetchBlogPosts(): Promise<void> {
      if (this.loading) {
        // Prevent concurrent fetches
        return
      }
      if (this.data) {
        // Optionally, prevent refetching if data already exists
        // You might want to add logic here to check for staleness if needed
        return
      }

      this.loading = true
      this.error = null // Clear previous errors
      try {
        const query = `*[_type == "blog_posts" ]{
            _id,
            title,
            slug {
              current
            },
            desc,
            content[],
        }`
        // Explicitly cast the fetched data to SiteSettings
        const fetchedData = await sanityClient.fetch<Array<BlogPosts>>(query)
        this.data = fetchedData || null
      } catch (err) {
        // Catch any error type
        console.error('Failed to fetch work:', err)
        this.error = err instanceof Error ? err : new Error(String(err)) // Ensure it's an Error object
      } finally {
        this.loading = false
      }
    },
  },
  getters: {
    blogData(state): Array<BlogPosts> | null {
      return state.data
    },
    isLoadingComplete(state): boolean {
      return state.loadComplete
    },
    isLoading(state): boolean {
      return state.loading
    },
    hasError(state): boolean {
      return !!state.error
    },
  },
})
