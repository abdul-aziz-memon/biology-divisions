const CACHE_NAME = "biology-divisions-v1";
const PRECACHE_URLS = [
  "./index.html",
  "./index.css",
  "./index.js",
  "./zoology.html",
  "./zoology.css",
  "./zoology.js",
  "./botany.html",
  "./botany.css",
  "./botany.js",
  "./microbiology.html",
  "./microbiology.css",
  "./microbiology.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(PRECACHE_URLS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => Promise.all(
        cacheNames
          .filter((cacheName) => cacheName.startsWith("biology-divisions-") && cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      ))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const requestUrl = new URL(request.url);

  if (request.method !== "GET" || requestUrl.origin !== self.location.origin) {
    return;
  }

  const cachePromise = caches.open(CACHE_NAME);
  const updatePromise = cachePromise
    .then((cache) => fetch(request)
      .then((response) => {
        if (response.ok) {
          return cache.put(request, response.clone()).then(() => response);
        }
        return response;
      }))
    .catch((error) => {
      console.warn("Cache refresh failed for " + request.url, error);
      throw error;
    });

  event.waitUntil(updatePromise.then(() => undefined, () => undefined));
  event.respondWith(
    cachePromise
      .then((cache) => cache.match(request))
      .then((cachedResponse) => cachedResponse || updatePromise)
  );
});
