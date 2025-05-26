/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_VERCEL_SANITY_PROID: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
