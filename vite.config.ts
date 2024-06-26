import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'
import tailwindcss from 'tailwindcss'
import svgr from 'vite-plugin-svgr'

// https://vitejs.dev/config/
export default defineConfig({
    resolve: {
        alias: [
            { find: '@/lib', replacement: resolve(__dirname, './lib') },
            { find: '@/utils', replacement: resolve(__dirname, './utils') },
            { find: '@/public', replacement: resolve(__dirname, './public') },
        ],
    },
    build: {
        lib: {
            entry: resolve(__dirname, './lib/index.ts'),
            name: 'react-beautiful-timeline',
            fileName: (format) => `index.${format}.js`,
        },
        rollupOptions: {
            external: ['react', 'react-dom', 'tailwindcss'],
            output: {
                globals: {
                    react: 'React',
                    'react-dom': 'ReactDOM',
                    tailwindcss: 'tailwindcss',
                },
            },
        },
        sourcemap: true,
        emptyOutDir: true,
    },
    plugins: [react(), dts({ rollupTypes: true }), svgr()],
    css: {
        postcss: {
            plugins: [tailwindcss],
        },
    },
})
