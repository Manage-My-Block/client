import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        globals: true, // so you don't have to import expect, describe, it in each test file
        environment: 'jsdom',
        setupFiles: './tests/setup.js',
    },
})
