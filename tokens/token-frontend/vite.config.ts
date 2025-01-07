import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: 'buffer', // Alias "buffer" for browser use
    },
  },
  define: {
    global: 'window', // Ensures "global" is defined for browser environments
  },
  optimizeDeps: {
    esbuildOptions: {
      plugins: [
        NodeGlobalsPolyfillPlugin({
          process: true, // Polyfill "process"
          buffer: true,  // Polyfill "Buffer"
        }),
      ],
    },
  },
});