import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig, type Plugin } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

/**
 * Collects the "core shell" JS: the entry chunk plus everything it imports statically, plus the few
 * lazy chunks every first visit needs anyway (lexicon, floating AI button). Only these JS files are
 * precached by the service worker; every other lazy chunk is runtime-cached (CacheFirst) on first use.
 */
const coreShell = new Set<string>();
const CORE_LAZY = /^assets\/(lexiconGenerator|HorKathaAIWidget|TextSpeakerReader)-/;
function collectCoreShell(): Plugin {
  return {
    name: 'hks-collect-core-shell',
    apply: 'build',
    generateBundle(_opts, bundle) {
      coreShell.clear();
      const visit = (file: string) => {
        if (coreShell.has(file)) return;
        const c = bundle[file];
        if (!c || c.type !== 'chunk') return;
        coreShell.add(file);
        c.imports.forEach(visit);
      };
      for (const [file, c] of Object.entries(bundle)) {
        if (c.type === 'chunk' && (c.isEntry || CORE_LAZY.test(file))) visit(file);
      }
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [
      collectCoreShell(),
      react(),
      tailwindcss(),
      VitePWA({
        registerType: 'autoUpdate',
        includeAssets: ['favicon.svg', 'apple-touch-icon.svg', 'pwa-192x192.svg', 'pwa-512x512.svg'],
        manifest: {
          id: '/',
          name: 'HorKathaSantali — Santali Language & Learning Platform',
          short_name: 'HorKathaSantali',
          description: 'Standardized digital linguistic platform for Santali language, Santali Devanagari typing, and 10,000+ word dictionary by BOSC Tech & Edu.',
          theme_color: '#090d16',
          background_color: '#090d16',
          display: 'standalone',
          orientation: 'any',
          scope: '/',
          start_url: '/',
          icons: [
            {
              src: '/pwa-192x192.svg',
              sizes: '192x192',
              type: 'image/svg+xml'
            },
            {
              src: '/pwa-512x512.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'any'
            },
            {
              src: '/pwa-512x512.svg',
              sizes: '512x512',
              type: 'image/svg+xml',
              purpose: 'maskable'
            }
          ]
        },
        workbox: {
          maximumFileSizeToCacheInBytes: 10 * 1024 * 1024, // 10 MiB to cache dictionary and components
          globPatterns: ['**/*.{js,css,html,ico,png,webp,svg,woff,woff2}'],
          // original 255 KB PNG logo is kept for old links only; the app uses the 23 KB WebP
          globIgnores: ['**/bosc-main-logo_*.png'],
          // Precache only the core shell; lazy module chunks are cached on first use (rule below)
          manifestTransforms: [
            async (entries) => ({
              manifest: entries.filter((e) => !/^assets\/.*\.js$/.test(e.url) || coreShell.has(e.url)),
              warnings: [],
            }),
          ],
          runtimeCaching: [
            {
              // Hashed build assets never change: lazy chunks (LDP, Quiz, Dictionary, …) are cached on first open
              urlPattern: ({ url, sameOrigin }) => sameOrigin && url.pathname.startsWith('/assets/') && /\.(?:js|css)$/.test(url.pathname),
              handler: 'CacheFirst',
              options: {
                cacheName: 'hks-lazy-chunks',
                expiration: { maxEntries: 250, maxAgeSeconds: 60 * 60 * 24 * 60, purgeOnQuotaError: true },
                cacheableResponse: { statuses: [200] },
              },
            },
            {
              urlPattern: ({ url, sameOrigin }) => sameOrigin && /\.(?:png|jpe?g|webp|svg|gif)$/.test(url.pathname),
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'hks-images',
                expiration: { maxEntries: 60, maxAgeSeconds: 60 * 60 * 24 * 30, purgeOnQuotaError: true },
              },
            },
            {
              urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
              handler: 'StaleWhileRevalidate',
              options: {
                cacheName: 'google-fonts-stylesheets'
              }
            },
            {
              urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
              handler: 'CacheFirst',
              options: {
                cacheName: 'google-fonts-webfonts',
                expiration: {
                  maxEntries: 30,
                  maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
                },
                cacheableResponse: {
                  statuses: [0, 200]
                }
              }
            }
          ]
        },
        devOptions: {
          enabled: false
        }
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(import.meta.dirname, '.'),
      },
    },
    build: {
      chunkSizeWarningLimit: 2000,
      rolldownOptions: {
        output: {
          // Long-lived vendor chunks: app deploys don't invalidate the React / motion caches
          codeSplitting: {
            groups: [
              { name: 'react-vendor', test: /[\\/]node_modules[\\/](react|react-dom|scheduler)[\\/]/, priority: 20 },
              { name: 'motion-vendor', test: /[\\/]node_modules[\\/](motion|framer-motion|motion-dom|motion-utils)[\\/]/, priority: 10 },
            ],
          },
        },
      },
    },
  };
});
