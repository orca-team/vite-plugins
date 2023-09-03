import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { paramCase } from 'change-case';
import reactConventionRoutes from './packages/vite-plugin-react-convention-routes/src';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    reactConventionRoutes({
      transform: paramCase,
      filter: path => /^(.*\/)?(index|_layout|404)\.(j|t)sx?$/.test(path),
    }),
  ],
  resolve: {
    alias: {
      '@orca-fe/vite-plugin-react-convention-routes': './packages/vite-plugin-react-convention-routes/src/index.ts',
    },
  },
});
