// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Export the Vite configuration
export default defineConfig({
  plugins: [react()],
  test: {
    // Include here any Vitest specific configurations
    globals: true, // This enables global test keywords like describe, test, expect
    environment: 'jsdom', // This simulates the browser's environment
    setupFiles: ['./vitest.setup.js'],
  },
});
