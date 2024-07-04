import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 8001, // This is the port which we will use in docker
  },
  preview: {
    port: 8000,
    host: true
  },
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src/")
    }
  }
})
