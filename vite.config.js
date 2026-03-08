import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    watch: {
      // Use usePolling if you are on a Virtual Machine or Docker, 
      // but 'ignored' is the key fix here:
      ignored: ['**/src/data/locations.json']
    }
  }
})