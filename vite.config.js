import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' permite abrir o site em qualquer hospedagem/pasta
export default defineConfig({
  plugins: [react()],
  base: './',
})
