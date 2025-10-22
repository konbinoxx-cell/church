const CACHE_NAME = 'church-website-v1.0';
const urlsToCache = [
  '/church/demo/',
  '/church/demo/index.html',
  '/church/demo/style.css',
  '/church/demo/script.js',
  '/church/demo/manifest.json'
];

// 安装Service Worker
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        return cache.addAll(urlsToCache);
      })
  );
});

// 拦截请求并返回缓存内容
self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request)
      .then(function(response) {
        // 返回缓存内容，否则从网络请求
        return response || fetch(event.request);
      }
    )
  );
});
