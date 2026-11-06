import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import laravel from 'laravel-vite-plugin';
import path from 'node:path';

export default defineConfig({
  plugins: [
    laravel({
      input: 'resources/js/app.tsx',
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@elhalc8n/ui/styles': path.resolve(__dirname, '../../packages/ui/src/styles/glass-theme.css'),
      '@elhalc8n/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
});

