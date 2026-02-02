import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
    plugins: [react()],
    base: '/kklinks/', // GitHub Pages deployment path

    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },

    build: {
        // Performance optimizations
        target: 'es2015',
        minify: 'esbuild', // Use esbuild (faster and included with Vite)
        esbuild: {
            drop: ['console', 'debugger'], // Remove console logs and debuggers in production
        },
        rollupOptions: {
            output: {
                manualChunks: {
                    // Split vendor code for better caching
                    react: ['react', 'react-dom'],
                },
            },
        },
        // Optimize chunk size
        chunkSizeWarningLimit: 1000,
        cssCodeSplit: true,
        sourcemap: false, // Disable sourcemaps in production for smaller builds
    },

    // Development server optimizations
    server: {
        host: true,
        port: 5173,
        strictPort: false,
        open: false,
    },

    // Preview server settings
    preview: {
        port: 4173,
        strictPort: false,
        open: false,
    },
})
