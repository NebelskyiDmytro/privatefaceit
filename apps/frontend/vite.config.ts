import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import svgLoader from 'vite-svg-loader';
import ViteFonts from 'vite-plugin-fonts';

const config = defineConfig({
  plugins: [
    vue(),
    svgLoader(),
    ViteFonts({
      google: {
        families: ['Inter', 'Inter:wght@800'],
      },
    }),
  ],
  server: {
    port: 3001,
    proxy: {
      '/api/': {
        target: 'http://localhost:3000/api',
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});

export default config;
