import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { config } from 'dotenv';
import { configDefaults } from 'vitest/config';

// Load environment variables from .env file
config();

export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env,
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './vitest.setup.ts',
    exclude: [...configDefaults.exclude, 'node_modules/**/*'],
  },
});
