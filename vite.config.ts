import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000
  },
  resolve: {
    alias: {
      '~assets': path.resolve('src/assets'),
      '~features': path.resolve('src/features'),
      '~api': path.resolve('src/api'),
      '~components': path.resolve('src/components'),
      '~lib': path.resolve('src/lib'),
      '~store': path.resolve('src/store'),
      '~hooks': path.resolve('src/hooks'),
    },
  },
});
