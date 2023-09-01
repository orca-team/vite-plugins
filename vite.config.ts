import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@orca-fe/vite-plugin-react-convention-routes': './packages/vite-plugin-react-convention-routes/src/index.tsx',
    },
  },
});
