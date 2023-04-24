import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    // server: {
    //     proxy: {
    //         '/api': {
    //             target: 'http://44.200.10.150',
    //             // target: 'http://localhost:8080',
    //             changeOrigin: true,
    //             rewrite: (path) => path.replace(/^\/api/, ''),
    //             secure: false,      
    //             ws: true,
    //         },
    //     },
    // },
    plugins: [react()],
    test: {
        coverage: {
            all: true,
            include: ["src/**/*.{jsx,js}"],
        },
        globals: true,
        environment: 'jsdom',
        setupFiles: './tests/setup.js',
        watch: false

    }
})
