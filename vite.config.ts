/// <reference types="vitest/config" />
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'



// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  //vitest configuration para testes de componentes
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/tests/setup.ts'],
  },
})
