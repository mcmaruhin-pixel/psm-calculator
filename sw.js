// Имя кэша – меняйте при каждом обновлении (v1 → v2 → v3 …)
const CACHE_NAME = 'psm-calc-v3';

// Список файлов, которые будут кэшироваться
const urlsToCache = [
  'index.html',
  'style.css',
  'script.js',
  'manifest.json',
  // Если есть иконки, добавьте их:
  // 'icon-192.png',
  // 'icon-512.png'
];

// Установка Service Worker – кэшируем файлы
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

// Активация – удаляем старые кэши
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
});

// Перехват запросов – сначала ищем в кэше, затем в сети
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});