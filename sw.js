const CACHE_NAME = 'psm-calculator-v1';
const urlsToCache = [
  '/psm-calculator/',
  '/psm-calculator/index.html',
  '/psm-calculator/style.css',
  '/psm-calculator/script.js',
  '/psm-calculator/icon-192.png',
  '/psm-calculator/icon-512.png'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Принудительное обновление (добавьте, если хотите)
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim();
});