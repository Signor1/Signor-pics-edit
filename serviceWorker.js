const signor = "signor-picEdit-v-1";

const assets = [
  "/",
  "/index.html",
  "/css/styles.css",
  "/js/app.js",
  "/img/logo32.png",
  "/img/logo96.png",
  "/img/logo72.png",
  "/img/logo128.png",
  "/img/logo144.png",
  "/img/logo152.png",
  "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.1.1/css/all.min.css",
  "https://unpkg.com/boxicons@2.1.2/css/boxicons.min.css",
];

//Caching the assets files
self.addEventListener("install", (installEvent) => {
  installEvent.waitUntil(
    caches.open(signor).then((cache) => {
      cache.addAll(assets);
    })
  );
});

//fetching the cached files
self.addEventListener("fetch", (fetchEvent) => {
  fetchEvent.respondWith(
    caches.match(fetchEvent.request).then((res) => {
      return res || fetch(fetchEvent.request);
    })
  );
});
