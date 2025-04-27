const CACHE_NAME = 'v1';
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/unipal.html',
  '/cadbury.html',
  '/amada.html',
  '/style.css',
  '/script.js',
  '/images/logo.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png',
];

// التثبيت (install) - تخزين الملفات في الكاش
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets');
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// التفعيل (activate)
self.addEventListener('activate', (event) => {
  console.log('Service Worker Activated');
});

// جلب البيانات (fetch) - محاولة استخدام الكاش في حالة عدم وجود اتصال بالإنترنت
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cacheResponse) => {
      return cacheResponse || fetch(event.request);
    })
  );
});
