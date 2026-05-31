const CACHE_NAME = 'nexoclx-ap-v12';
const BASE_PATH = '/nexoclx-ap/';
const APP_SHELL = [
  BASE_PATH,
  `${BASE_PATH}index.html`,
  `${BASE_PATH}manifest.webmanifest`,
  `${BASE_PATH}favicon.ico`,
  `${BASE_PATH}favicon.png`,
  `${BASE_PATH}apple-touch-icon.png`,
  `${BASE_PATH}assets/logo.svg`,
  `${BASE_PATH}assets/icons/icon-192.png`,
  `${BASE_PATH}assets/icons/icon-512.png`,
  `${BASE_PATH}assets/icons/maskable-192.png`,
  `${BASE_PATH}assets/icons/maskable-512.png`
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  const requestUrl = new URL(event.request.url);
  const isAppRequest = requestUrl.origin === self.location.origin && requestUrl.pathname.startsWith(BASE_PATH);
  const isNavigation = event.request.mode === 'navigate';

  if (!isAppRequest) return;

  event.respondWith(
    fetch(event.request).then((response) => {
      if (response.ok && !isNavigation) {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }).catch(() => {
      if (isNavigation) return caches.match(BASE_PATH);
      return caches.match(event.request);
    })
  );
});
