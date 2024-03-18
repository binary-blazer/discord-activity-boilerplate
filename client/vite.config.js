import {defineConfig} from 'vite';

  // https://vitejs.dev/config/
  export default defineConfig({
    envDir: './',
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:8080',
          changeOrigin: true,
          secure: false,
          ws: true,
        },
      },
      hmr: {
        clientPort: 443,
      },
    },
  });
  