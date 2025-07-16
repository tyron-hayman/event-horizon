// src/stores/settings.ts
import { defineStore } from 'pinia'
import sanityClient, { type SanityImageData, type SanityImageAsset } from '@/utils/sanity/sanity'

export interface ProjectData {
  _id: string
  title: string
  company: string
  Image: (SanityImageData & { asset?: SanityImageAsset }) | undefined
  website_Image: (SanityImageData & { asset?: SanityImageAsset }) | undefined
  mobile_Image: (SanityImageData & { asset?: SanityImageAsset }) | undefined
  desc: string
  role: string
  tech: Array<string>
  link: string
}

// 2. Define the type for the store's state
interface WorkPageState {
  data: Array<ProjectData> | null
  loading: boolean
  loadComplete: boolean
  error: Error | null
}

export const workStore = defineStore('workpage', {
  state: (): WorkPageState => ({
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
    async fetchWork(): Promise<void> {
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
        const query = `*[_type == "work" ]{
            _id,
            title,
            desc,
            Image {
              asset->{
                _id,
                url,
                metadata {
                  lqip
                }
              },
              alt
            },
            website_Image {
              asset->{
                _id,
                url,
                metadata {
                  lqip
                }
              },
              alt
            },
            mobile_Image {
              asset->{
                _id,
                url,
                metadata {
                  lqip
                }
              },
              alt
            },
            company,
            role,
            tech,
            link
        }`
        // Explicitly cast the fetched data to SiteSettings
        const fetchedData = await sanityClient.fetch<Array<ProjectData>>(query)
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
    proData(state): Array<ProjectData> | null {
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
