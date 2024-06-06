import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

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
})