import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const API_TARGET = 'http://localhost:8788'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // `npm run api` serves the Pages Functions on 8788.
    proxy: {
      '/api': {
        target: API_TARGET,
        changeOrigin: true,
        // The API only accepts writes whose Origin matches its own
        // origin (CSRF check), so present the proxied origin to it.
        configure: (proxy) => {
          proxy.on('proxyReq', (proxyReq) => {
            if (proxyReq.getHeader('origin')) {
              proxyReq.setHeader('origin', API_TARGET)
            }
          })
        },
      },
    },
  },
})
