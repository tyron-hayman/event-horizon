import { createClient, SanityClient } from '@sanity/client'
import imageUrlBuilder from '@sanity/image-url'
import type { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Define the shape of your image data from Sanity
export interface SanityImageData {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string // Optional alt text
}

// Define the shape of the image asset data that comes from `asset->` dereferencing
export interface SanityImageAsset {
  _id: string
  url: string
  metadata?: {
    lqip?: string // Low-quality image placeholder
    dimensions?: {
      aspectRatio: number
      height: number
      width: number
    }
  }
}

const sanityClient: SanityClient = createClient({
  projectId: import.meta.env.VITE_VERCEL_SANITY_PROID as string, // Replace with your Sanity Project ID
  dataset: 'production', // Replace with your dataset name
  apiVersion: '2023-05-03', // Use a fixed API version
  useCdn: true,
})

const builder = imageUrlBuilder(sanityClient)

// Use SanityImageSource for better type hinting
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

export default sanityClient
