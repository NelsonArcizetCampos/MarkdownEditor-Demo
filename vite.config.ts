import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: ['zvp9wr-5173.csb.app'], // Permite qualquer host
    host: true, // Garante que o Vite aceita conexões externas
  },
});
