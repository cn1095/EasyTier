import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    build: {
        outDir: 'dist',
        rollupOptions: {
            input: 'index.html'  // 让 Vite 以 index.html 为入口
        }
    }
});
