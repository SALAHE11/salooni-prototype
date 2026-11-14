// Bump VERSION after every change so phones pick up the new files.
const VERSION = 'salooni-proto-v1';
const ASSETS = [
  './', './index.html', './manifest.webmanifest',
  './icons/icon.svg', './icons/icon-180.png', './icons/icon-192.png', './icons/icon-512.png',
  './fonts/manrope-latin-400-normal.woff2', './fonts/manrope-latin-500-normal.woff2',
  './fonts/manrope-latin-700-normal.woff2', './fonts/manrope-latin-800-normal.woff2',
  './fonts/ibm-plex-sans-arabic-arabic-400-normal.woff2', './fonts/ibm-plex-sans-arabic-arabic-500-normal.woff2',
  './fonts/ibm-plex-sans-arabic-arabic-700-normal.woff2'
];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  e.respondWith(
    caches.match(e.request, { ignoreSearch: true }).then(hit => hit || fetch(e.request).catch(() =>
      e.request.mode === 'navigate' ? caches.match('./index.html') : undefined))
  );
});
