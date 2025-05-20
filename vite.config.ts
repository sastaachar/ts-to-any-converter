import { defineConfig } from 'vite';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'TypeScriptConverter',
      fileName: (format) => `ts-to-any.${format}.js`,
      formats: ['es', 'umd'],
    },
  },
  plugins: [dts()],
  publicDir: 'templates',
  test: {
    environment: "node",
  },
}); 