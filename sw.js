console.log(`Date: July 26, 2019`)

// service worker already registered through gatsby
// only need to put it to work from this file 
console.log('this is my registered service worker')
self.addEventListener('install', (event) => {
    console.log('Service Worker] Installing Service Worker ...', event)
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
                    '/static/*.svg',
                    '/static/*.woff2',
                    '/static/*.eot',
                    '/static/*.ttf',
                    '/static/*.woff',
                    '/static/*.jpeg',
                    '/static/*.jpg',
                    '/icons/*.png',
                    '/HBR/WLC/I032/',
                    '/HBR/WLC/I032/index.html',
                    '/HBR/WLC/S255/',
                    '/HBR/WLC/S255/index.html',
                    '/GRK/GNA/I042/',
                    '/GRK/GNA/I042/index.html',
                    '/GRK/GNA/S285/',
                    '/GRK/GNA/S285/index.html',
                    '/ENG/NLT/I042/',
                    '/ENG/NLT/I042/index.html',
                    '/ENG/NLT/S285/',
                    '/ENG/NLT/S285/index.html',
                    '/ENG/NLT/S286/',
                    '/ENG/NLT/S286/index.html',
                    '/ENG/NLT/S287/',
                    '/ENG/NLT/S287/index.html',
                    '/ENG/NLT/S288/',
                    '/ENG/NLT/S288/index.html',
                    '/ENG/NLT/S289/',
                    '/ENG/NLT/S289/index.html',
                    '/ENG/NLT/S290/',
                    '/ENG/NLT/S290/index.html',
                    '/ENG/NLT/S291/',
                    '/ENG/NLT/S291/index.html',
                    '/ENG/NLT/S292/',
                    '/ENG/NLT/S292/index.html',
                    '/ENG/NLT/S293/',
                    '/ENG/NLT/S293/index.html',
                    '/ENG/NLT/S294/',
                    '/ENG/NLT/S294/index.html',
                    '/ENG/NLT/S295/',
                    '/ENG/NLT/S295/index.html',
                    '/ENG/NLT/S296/',
                    '/ENG/NLT/S296/index.html',
                    '/ENG/NLT/S297/',
                    '/ENG/NLT/S298/index.html',
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