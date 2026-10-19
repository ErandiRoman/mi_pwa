const CACHE_NAME = 'star-app-v1';
const STATIC_ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/libs/jquery.js',
  './js/app.js',
  './manifest.json'
];

// Instalación y Caché del App Shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(STATIC_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activación y limpieza de cachés antiguas
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Estrategia Offline (Cache First con Fallback a Network)
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      return cachedResponse || fetch(event.request);
    })
  );
});

// Evento Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'sync-new-stars') {
    event.waitUntil(
      // Lógica de sincronización cuando recupera internet
      self.registration.showNotification('Star App Sincronizado', {
        body: 'Tus datos de estrellas se han sincronizado con el servidor.',
        icon: 'img/icons/icon-512x512.png'
      })
    );
  }
});

// Listener para recepción de Notificaciones Push
self.addEventListener('push', (event) => {
  const data = event.data ? event.data.text() : '¡Nueva actualización de estrellas!';
  const options = {
    body: data,
    icon: 'img/icons/icon-512x512.png',
    badge: 'img/icons/icon-512x512.png'
  };

  event.waitUntil(
    self.registration.showNotification('Star App Update', options)
  );
});