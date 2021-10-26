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