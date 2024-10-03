import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { apiRoute } from './src/api_param'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
