const CACHE_NAME = 'v2'; // غير رقم النسخة عند التحديث
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/unipal.html',
  '/cadbury.html',
  '/amada.html',
  '/tiffany.html',
  '/style.css',
  '/script.js',
  '/images/logo.png',
  '/images/icons/icon-192x192.png',
  '/images/icons/icon-512x512.png',
  '/images/unipal/galaxy.jpg',
  '/images/unipal/mars.jpg',
  '/images/unipal/bueno.jpg',
  '/images/cadbury/cadbury.jpg',
  '/images/amada/amada.jpg',
  '/images/tiffany/tiffany1.jpg',
  '/images/tiffany/tiffany2.jpg',
  '/images/tiffany/tiffany3.jpg',
  '/images/tiffany/tiffany4.jpg',
  '/images/tiffany/tiffany5.jpg',
  '/images/tiffany/tiffany6.jpg',
  '/images/tiffany/tiffany7.jpg',
  '/images/tiffany/tiffany8.jpg',
  '/images/tiffany/tiffany9.jpg',
  '/images/tiffany/tiffany10.jpg',
  '/images/tiffany/tiffany11.jpg',
  '/images/tiffany/tiffany12.jpg'
];

// تثبيت الـ Service Worker وتخزين الملفات
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caching all assets');
      return cache.addAll(CACHE_ASSETS);
    })
  );
});

// تفعيل الـ Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker activated');
  // حذف الكاش القديم إذا لزم
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      );
    })
  );
});

// اعتراض الطلبات وتقديم الملفات من الكاش
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    }).catch(() => {
      // في حالة لم يوجد شيء، ممكن تعرض صفحة خطأ مخصصة
    })
  );
});
