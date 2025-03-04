import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            output: {
                inlineDynamicImports: true, // 让所有 JS 代码都内联
                manualChunks: undefined,   // 禁用代码分割
            }
        }
    }
});
