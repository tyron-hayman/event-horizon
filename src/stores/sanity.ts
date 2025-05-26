/* eslint-disable */
// src/stores/settings.ts
import { defineStore } from 'pinia'
import sanityClient, { type SanityImageData, type SanityImageAsset } from '@/utils/sanity/sanity'

// 1. Define the type for your site settings data
export interface SiteSettings {
  hero_text: string
  Avatar?: SanityImageData & { asset?: SanityImageAsset } // logo field, with optional dereferenced asset
  projects: any[] // Assuming projects will be an array of references, adjust type as needed
  about_title: string
  about_Content: string
  testimonials: any[] // Assuming testimonials will be an array of references, adjust type as needed
  exp_title: string
  experience: any[] //
}

// 2. Define the type for the store's state
interface SettingsState {
  data: SiteSettings | null
  loading: boolean
  error: Error | null
}

export const homepageStore = defineStore('homepage', {
  state: (): SettingsState => ({
    data: null,
    loading: false,
    error: null,
  }),
  actions: {
    async fetchSettings(): Promise<void> {
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
        const query = `*[_id == "homepage"][0]{
          hero_text,
          Avatar {
            asset->{
              _id,
              url,
              metadata {
                lqip
              }
            },
            alt
          },
            projects[]->{
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
            company,
            link,
            tech
          },
          about_title,
          about_Content,
          testimonials[]->{
            _id,
            name,
            content,
            Image {
            asset->{
              _id,
              url,
              metadata {
                lqip
              }
            },
            alt,
          },
          company
          },
          exp_title,
          experience[]->{ // Dereference experience
            _id,
            company,
            role,
            date,
          }
        }`
        // Explicitly cast the fetched data to SiteSettings
        const fetchedData = await sanityClient.fetch<SiteSettings>(query)
        this.data = fetchedData
      } catch (err) {
        // Catch any error type
        console.error('Failed to fetch site settings:', err)
        this.error = err instanceof Error ? err : new Error(String(err)) // Ensure it's an Error object
      } finally {
        this.loading = false
      }
    },
  },
  getters: {
    heroText(state): string | undefined {
      return state.data?.hero_text
    },
    // The logo getter will return SanityImageData with the asset dereferenced
    siteAvatar(state): (SanityImageData & { asset?: SanityImageAsset }) | undefined {
      return state.data?.Avatar
    },
    siteWork(state): any[] | undefined {
      return state.data?.projects
    },
    siteAboutTitle(state): string | undefined {
      return state.data?.about_title
    },
    siteAboutContent(state): string | undefined {
      return state.data?.about_Content
    },
    siteExperienceTitle(state): string | undefined {
      return state.data?.exp_title
    },
    siteExperience(state): any[] | undefined {
      return state.data?.experience
    },
    siteTestimonials(state): any[] | undefined {
      return state.data?.testimonials
    },
    isLoading(state): boolean {
      return state.loading
    },
    hasError(state): boolean {
      return !!state.error
    },
  },
})
