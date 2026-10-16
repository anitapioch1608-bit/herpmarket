import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // Auto-update the service worker in the background on each deploy.
      registerType: 'autoUpdate',
      // Let the plugin inject the registration script into index.html for us,
      // so main.jsx stays clean.
      injectRegister: 'auto',
      // Keep your existing hand-written public/manifest.json — don't generate
      // a second one.
      manifest: false,
      includeAssets: [
        'favicon.ico', 'favicon-16x16.png', 'favicon-32x32.png',
        'favicon-180x180.png', 'favicon-192x192.png', 'favicon-512x512.png',
        'manifest.json', 'og-image.png',
      ],
      workbox: {
        // Precache the built app shell so the installed PWA opens instantly —
        // even on a cold start or a flaky connection. This is what fixes the
        // white screen that currently needs a full restart.
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2}'],
        navigateFallback: '/index.html',
        // Don't serve a cached shell for these — let them hit the network.
        navigateFallbackDenylist: [/^\/sitemap\.xml$/, /^\/robots\.txt$/, /^\/chi-siamo\.html$/],
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        skipWaiting: true,
      },
    }),
  ],
})
