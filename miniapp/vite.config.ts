import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],

  // GitHub Pages base path
  // https://leo-chernyak.github.io/telegram-mini-app/
  base: '/telegram-mini-app/',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },

  server: {
    host: '127.0.0.1',
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
});
