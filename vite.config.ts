import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'es2020',
    // three.js ships in its own lazily-loaded chunk, so the default warning
    // threshold is not meaningful here.
    chunkSizeWarningLimit: 1100,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('three') || id.includes('@react-three')) return 'three'
          if (id.includes('framer-motion')) return 'motion'
        },
      },
    },
  },
})
