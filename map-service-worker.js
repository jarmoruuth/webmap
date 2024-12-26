const CACHE_NAME = 'mapjx-cache-v1';
self.addEventListener('install', function(event) {
    event.waitUntil(
      caches.open('CACHE_NAME').then(function(cache) {
        return cache.addAll([
          '/map.html',
          '/map_manifest.json',
          '/map-service-worker.js',
          '/mapicon-192x192.png',
          '/mapicon-512x512.png',
          '/cross-hairs.png',
          '/map-favicon.png',
          '/ic_gps_fixed_black_24px.svg',
          '/ic_layers_black_24px.svg',
          '/ic_open_in_new.svg',
          '/ic_settings_black_24px.svg'
          // ... add other assets to cache ...
        ]);
      })
    );
  });
  
// Fetch event - serving cached assets when offline
self.addEventListener('fetch', event => {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Cache hit - return response
          if (response) {
            return response;
          }
  
          // IMPORTANT: Clone the request. A request is a stream and can only be consumed once.
          const fetchRequest = event.request.clone();
  
          return fetch(fetchRequest).then(
            fetchResponse => {
              // Check if we received a valid response
              if (!fetchResponse || fetchResponse.status !== 200 || fetchResponse.type !== 'basic') {
                return fetchResponse;
              }
  
              // IMPORTANT: Clone the response. A response is a stream and can only be consumed once.
              const responseToCache = fetchResponse.clone();
  
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });
  
              return fetchResponse;
            }
          );
        })
        .catch(() => {
          // Fallback logic if both cache and network are unavailable
          // Optionally, return a fallback page or image
        })
    );
  });
  
  // Activate event - cleaning up old caches
  self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    
    event.waitUntil(
      caches.keys().then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (!cacheWhitelist.includes(cacheName)) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    );
  });