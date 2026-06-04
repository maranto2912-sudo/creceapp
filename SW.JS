// Service Worker que se autodestruye y limpia todo el caché
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(names => Promise.all(names.map(name => caches.delete(name))))
      .then(() => self.clients.claim())
      .then(() => self.registration.unregister())
  );
});
self.addEventListener('fetch', event => {
  // No cachear nada — siempre ir a la red
  event.respondWith(fetch(event.request));
});
