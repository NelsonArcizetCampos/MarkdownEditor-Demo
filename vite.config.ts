import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@hooks': '/src/hooks',
    },
  },
  test: {
    globals: true,
    environment: 'jsdom',
  },
  server: {
    allowedHosts: ['all'], // Permite qualquer host
    host: true, // Garante que o Vite aceita conexões externas
  },
});
