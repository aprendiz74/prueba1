self.addEventListener('install', (event) => {
  console.log('Service Worker installing.');
  event.waitUntil(
    caches.open('zoom-musical-cache').then((cache) => {
      return cache.addAll([
        './',
        './style/style.css',
        './script/app.js',
        './manifest.json',
        './img/logo.png',
        'https://fonts.googleapis.com/icon?family=Material+Icons',
        'https://cdnjs.cloudflare.com/ajax/libs/materialize/0.100.2/css/materialize.min.css'
      ]);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
