import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  build: {
    // The client manifest lets scripts/prerender.mjs link each page's CSS
    // and JS chunks into its prerendered HTML (the manifest is removed after).
    manifest: !isSsrBuild,
  },
}))
