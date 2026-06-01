/**
 * Scattergates Service Worker
 * Specialized for resilient and ultra-fast static caching of corporate assets,
 * stylesheets, icons, logos, and UI layout animations.
 */

const CACHE_NAME = 'scattergates-v1.0.0';

// Core assets to pre-cache immediately upon installation
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/images/branding/symbol.png',
  '/robots.txt',
  '/sitemap.xml'
];

// Installation event: Cache critical corporate branding assets
self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Scattergates Service Worker: Pre-caching core style headers & media');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
});

// Activation event: Purge deprecated caches and inherit clients
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Scattergates Service Worker: Pruning stale cache', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event handler: Smart network-vs-cache route routing
self.addEventListener('fetch', (event) => {
  // Ignore non-GET queries or extension endpoints (chrome-extension, etc.)
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  if (!url.protocol.startsWith('http')) return;

  // 1. Same-origin assets: scripts, design sheets, static images, indices
  if (url.origin === self.location.origin) {
    // For navigation requests, try to request network fresh, fallback to cache
    if (event.request.mode === 'navigate') {
      event.respondWith(
        fetch(event.request)
          .then((response) => {
            if (response.status === 200) {
              const copy = response.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
            }
            return response;
          })
          .catch(() => {
            return caches.match('/index.html') || caches.match(event.request);
          })
      );
      return;
    }

    // JS and CSS bundle files: Stale-While-Revalidate (fast display, background update)
    const isAsset = url.pathname.includes('/assets/') || url.pathname.endsWith('.js') || url.pathname.endsWith('.css');
    if (isAsset) {
      event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
          const fetchPromise = fetch(event.request).then((networkResponse) => {
            if (networkResponse.status === 200) {
              const copy = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
            }
            return networkResponse;
          });
          return cachedResponse || fetchPromise;
        })
      );
      return;
    }

    // Default same-origin assets: Cache-First with Network fallback
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 2. Cross-origin fonts (Google Fonts API delivery)
  const isGoogleFont = url.hostname.includes('fonts.googleapis.com') || url.hostname.includes('fonts.gstatic.com');
  if (isGoogleFont) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // 3. Cross-origin background placeholders & visual layout templates (Unsplash images)
  const isUnsplash = url.hostname.includes('images.unsplash.com');
  if (isUnsplash) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) return cachedResponse;

        return fetch(event.request).then((networkResponse) => {
          if (networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
          }
          return networkResponse;
        });
      })
    );
    return;
  }
});
