import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
    plugins: [vue()],
    mode: 'production',  // 确保是生产模式
    build: {
        minify: 'terser', // 使用更强的代码压缩工具
        terserOptions: {
            compress: {
                drop_console: true,  // 移除 console.log
                drop_debugger: true  // 移除 debugger
            }
        },
        rollupOptions: {
            output: {
                manualChunks: undefined,  // 避免分割代码
            }
        }
    }
});
