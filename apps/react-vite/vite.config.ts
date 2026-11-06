import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@elhalc8n/ui/styles': path.resolve(__dirname, '../../packages/ui/src/styles/glass-theme.css'),
      '@elhalc8n/ui': path.resolve(__dirname, '../../packages/ui/src/index.ts'),
    },
  },
});

