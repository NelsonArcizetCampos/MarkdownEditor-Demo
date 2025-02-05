import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['all'], // Permite qualquer host
    host: true, // Garante que o Vite aceita conexões externas
  },
});
