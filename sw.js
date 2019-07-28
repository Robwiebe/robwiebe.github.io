console.log(`Date: July 22, 2019`)

// service worker already registered through gatsby
// only need to put it to work from this file 
console.log('this is my registered service worker')
self.addEventListener('install', (event) => {
//     console.log('Service Worker] Installing Service Worker ...', event)
    event.waitUntil(
        caches.open('static')
            .then((cache) => {
                console.log('[Service Worker] pre-caching app shell')
                // cache.add('/index.html')
                // cache.add('/') 
                cache.addAll([
                    '/index.html',
                    '/',
                    '/static/*.png',
                    '/static/*.jpeg',
                    // '/*.js',
                    // '*.json',
                    '/404.html',
                    // '/styles.*.css'
                ])
            })
    )
})
self.addEventListener('activate', (event) => {
    console.log('Service Worker] Activating Service Worker ...', event)
    return self.clients.claim()
})
self.addEventListener('fetch', (event) => {
    console.log('Service Worker] fetching something ...', event)
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                if (response) {
                    return response
                } else {
                    return fetch(event.request)
                        .then(function(res) {
                            return caches.open('dynamic')
                                .then(function(cache) {
                                    cache.put(event.request.url, res.clone())
                                    return res;
                                })
                        })
                        .catch(function(error) {

                        })
                }
            })
    )
})