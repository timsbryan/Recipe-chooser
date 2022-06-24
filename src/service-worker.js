import { manifest, version } from '@parcel/service-worker';

async function install() {
  const cache = await caches.open(version);
  await cache.addAll(manifest);
}
addEventListener('install', e => e.waitUntil(install()));

async function activate() {
  const keys = await caches.keys();
  await Promise.all(
    keys.map(key => key !== version && caches.delete(key))
  );
}
addEventListener('activate', e => e.waitUntil(activate()));


self.addEventListener('fetch', (e) => {
  e.respondWith((async () => {
    const r = await caches.match(e.request);
    console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
    if (r) { return r; }
    const response = await fetch(e.request);
    const cache = await caches.open(version);
    console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
    cache.put(e.request, response.clone());
    return response;
  })());
});

// async function fetch(event) {
//   event.respondWith(caches.match(event.request)
//     .then(r => {
//       if(r) { return r }
//       const response = fetch(event.request);
//       const cache = caches.open(version);
//       cache.put(event.request, response.clone());
//       return response;
//     }));
// }

//   addEventListener('fetch', e => e.waitUntil(fetch(e)));

/*
* 
const cacheName = 'sw-v1';

const appShellFiles = [
    '/index.html',
    '/css/styles.css',
    '/icons/apple-icon-180.png',
    '/icons/apple-splash-640-1136.jpg',
    '/icons/apple-splash-750-1334.jpg',
    '/icons/apple-splash-828-1792.jpg',
    '/icons/apple-splash-1125-2436.jpg',
    '/icons/apple-splash-1136-640.jpg',
    '/icons/apple-splash-1170-2532.jpg',
    '/icons/apple-splash-1242-2208.jpg',
    '/icons/apple-splash-1242-2688.jpg',
    '/icons/apple-splash-1284-2778.jpg',
    '/icons/apple-splash-1334-750.jpg',
    '/icons/apple-splash-1536-2048.jpg',
    '/icons/apple-splash-1620-2160.jpg',
    '/icons/apple-splash-1668-2224.jpg',
    '/icons/apple-splash-1668-2388.jpg',
    '/icons/apple-splash-1792-828.jpg',
    '/icons/apple-splash-2048-1536.jpg',
    '/icons/apple-splash-2048-2732.jpg',
    '/icons/apple-splash-2160-1620.jpg',
    '/icons/apple-splash-2208-1242.jpg',
    '/icons/apple-splash-2224-1668.jpg',
    '/icons/apple-splash-2388-1668.jpg',
    '/icons/apple-splash-2436-1125.jpg',
    '/icons/apple-splash-2532-1170.jpg',
    '/icons/apple-splash-2688-1242.jpg',
    '/icons/apple-splash-2732-2048.jpg',
    '/icons/apple-splash-2778-1284.jpg',
    '/icons/icon-52.png',
    '/icons/manifest-icon-192.maskable.png',
    '/icons/manifest-icon-512.maskable.png',
    '/js/script.js'
];

self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
    e.waitUntil((async () => {
      const cache = await caches.open(cacheName);
      console.log('[Service Worker] Caching all: app shell and content');
      await cache.addAll(contentToCache);
    })());
  });
  
  self.addEventListener('fetch', (e) => {
    e.respondWith((async () => {
      const r = await caches.match(e.request);
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`);
      if (r) { return r; }
      const response = await fetch(e.request);
      const cache = await caches.open(cacheName);
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`);
      cache.put(e.request, response.clone());
      return response;
    })());
  });
  
  self.addEventListener('activate', (e) => {
    e.waitUntil(caches.keys().then((keyList) => {
      return Promise.all(keyList.map((key) => {
        if (key === cacheName) { return; }
        return caches.delete(key);
      }))
    }));
  });
*/
