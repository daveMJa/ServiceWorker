const cachePWA = "cache-site-v1";

const assets = [
    "/",
    "/index.html",
    "/manifest.json",
    "/css/estilos.css",
    "/css/inicio.css",
    "/css/prueba.css",
    "/js/app.js",
    "/img/icons/imagen16x16.png",
    "/img/icons/imagen_32x32.png",
    "/fondos/fondos.html",
    "/Libros/libros.html",
    "/Peliculas/peliculas.html",
    
];


self.addEventListener("install", installEvent =>{
    installEvent.waitUntil(
        caches.open(cachePWA).then( cache => {
            cache.addAll(assets);
        })
    )
});

self.addEventListener("fetch", fetchEvent =>{
    fetchEvent.respondWith(
        caches.match(fetchEvent.request).then(res => {
            return res || fetch(fetchEvent.request);
        })
    )
});


'use strict';

self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Recivido.');
    console.log(`[Service Worker] Push tiene esta información: "${event.data.text()}"`);
  
    const title = 'Digital Amet';
    const options = {
      body: 'Tenemos nuevas peliculas !Visitanos!',
      icon: 'resource/img/icons/S.jpeg',
      badge: 'images/badge.png'
    };
    self.registration.showNotification(title, options);
  
    const notificationPromise = self.registration.showNotification(title, options);
    event.waitUntil(notificationPromise);

    self.addEventListener('notificationclick', function(event) {
        console.log('[Service Worker] Notification click Received.');
      
        event.notification.close();
      
        event.waitUntil(
          clients.openWindow('https://digitalamet-35e58.web.app/Peliculas/peliculas.html')
        );
      });
  });