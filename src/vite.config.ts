import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

const APP_VERSION = '1.2.0';
const BUILD_TIMESTAMP = Date.now();
const BUILD_ID = new Date(BUILD_TIMESTAMP)
  .toISOString()
  .replace(/[-:T.Z]/g, '')
  .slice(0, 12);

/**
 * Custom Vite plugin to emit an updated version.json in dist/ during build
 */
function versionPlugin(): Plugin {
  return {
    name: 'vite-plugin-lgw-version',
    generateBundle() {
      this.emitFile({
        type: 'asset',
        fileName: 'version.json',
        source: JSON.stringify(
          {
            version: APP_VERSION,
            buildId: BUILD_ID,
            buildTimestamp: BUILD_TIMESTAMP,
            description: 'Little Genius World - Little Minds. Big Discoveries!',
            builtAt: new Date(BUILD_TIMESTAMP).toISOString(),
          },
          null,
          2
        ),
      });
    },
  };
}

export default defineConfig(() => {
  return {
    define: {
      __APP_VERSION__: JSON.stringify(APP_VERSION),
      __BUILD_ID__: JSON.stringify(BUILD_ID),
      __BUILD_TIMESTAMP__: JSON.stringify(BUILD_TIMESTAMP),
    },
    plugins: [
      react(),
      tailwindcss(),
      versionPlugin(),
      VitePWA({
        registerType: 'prompt', // Reliable user-prompted update flow
        includeAssets: ['favicon.ico', 'apple-touch-icon.png', 'icon.svg', 'version.json'],
        manifest: {
          id: '/',
          name: 'Little Genius World',
          short_name: 'LittleGenius',
          description: 'A magical, age-adaptive educational gaming universe for children aged 0–5 years with interactive games, stories, music, and drawing.',
          theme_color: '#38BDF8',
          background_color: '#F0F9FF',
          display: 'standalone',
          orientation: 'any',
          start_url: '/',
          scope: '/',
          icons: [
            {
              src: '/pwa-192x192.png',
              sizes: '192x192',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'any',
            },
            {
              src: '/pwa-maskable-512x512.png',
              sizes: '512x512',
              type: 'image/png',
              purpose: 'maskable',
            },
          ],
        },
        workbox: {
          globPatterns: ['**/*.{js,css,html,ico,png,svg,webp,woff,woff2}'],
          cleanupOutdatedCaches: true, // Safely purge outdated application caches on update
          clientsClaim: true,
          skipWaiting: false, // Waits for child/parent confirmation before activating
          navigateFallback: '/index.html',
          navigateFallbackDenylist: [/^\/api/],
          runtimeCaching: [
            {
              // Real-time version checking bypasses service worker cache
              urlPattern: /.*version\.json(\?.*)?$/i,
              handler: 'NetworkOnly',
            },
            {
              // Network-First for HTML navigation documents so updates are detected immediately
              urlPattern: ({ request }) => request.mode === 'navigate',
              handler: 'NetworkFirst',
              options: {
                cacheName: 'lgw-html-cache',
                networkTimeoutSeconds: 3,
                expiration: {
                  maxEntries: 10,
                  maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days offline fallback
                },
              },
            },
            {
              // Cache-First for version-hashed scripts and styles
              urlPattern: ({ request, url }) =>
                request.destination === 'script' ||
                request.destination === 'style' ||
                url.pathname.startsWith('/assets/'),
              handler: 'CacheFirst',
              options: {
                cacheName: 'lgw-static-assets-cache',
                expiration: {
                  maxEntries: 100,
                  maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year for hashed bundles
                },
              },
            },
            {
              // Google Web Fonts
              urlPattern: /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'lgw-fonts-cache',
                expiration: {
                  maxEntries: 20,
                  maxAgeSeconds: 60 * 60 * 24 * 365,
                },
              },
            },
          ],
        },
        devOptions: {
          enabled: true,
          type: 'module',
        },
      }),
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
