import { defineConfig } from 'tsup';
import * as fs from 'node:fs';
import * as path from 'node:path';

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['esm', 'cjs'],
  dts: true,
  sourcemap: true,
  clean: true,
  minify: false,
  external: ['react', 'react-dom'],
  onSuccess: async () => {
    const srcCss = path.resolve('src/styles/glass-theme.css');
    const distCss = path.resolve('dist/glass-theme.css');
    if (fs.existsSync(srcCss)) {
      if (!fs.existsSync(path.resolve('dist'))) {
        fs.mkdirSync(path.resolve('dist'), { recursive: true });
      }
      fs.copyFileSync(srcCss, distCss);
    }
  },
});

