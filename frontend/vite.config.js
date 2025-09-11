import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,       // describe/test/expect senza import
    setupFiles: './src/__tests__/setupTests.jsx',
  },
});