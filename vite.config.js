import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: [
        'favicon.svg',
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png',
        'logo-icon.svg',
      ],
      manifest: {
        name: 'Snapbook',
        short_name: 'Snapbook',
        description: '희귀 의류 아카이빙 플랫폼',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        start_url: '/',
        icons: [
          {
            src: '/logo-icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml',
          },
          {
            src: '/logo-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
          {
            src: '/logo-icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
    }),
  ],
});
