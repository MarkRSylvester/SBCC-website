import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    port: 5173,
    cors: true,
    open: true
  }
}); 