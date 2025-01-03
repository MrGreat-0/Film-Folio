import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/tmdb': {
        target: 'http://localhost:3000',  // Express backend URL
        changeOrigin: true,
        secure: false,  // Set to `true` if you're using HTTPS
        rewrite: (path) => path.replace(/^\/api\/tmdb/, '/api/tmdb'),  // No change needed
      },
    },
  },
});
