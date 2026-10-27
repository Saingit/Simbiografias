const CACHE_VERSION = 'v6'
const CACHE_NAME = `simbiografias-${CACHE_VERSION}`
const STATIC_CACHE = `simbiografias-static-${CACHE_VERSION}`
const MODEL_CACHE = `simbiografias-models-${CACHE_VERSION}`
const IMAGE_CACHE = `simbiografias-images-${CACHE_VERSION}`

const STATIC_ASSETS = [
  '/simbiografias/',
  '/simbiografias/index.html',
  '/simbiografias/manifest.json',
  '/simbiografias/favicon-simbiografias.png?v=1',
  '/simbiografias/fonts/Poppins-Regular.ttf',
  '/simbiografias/fonts/Poppins-Medium.ttf',
  '/simbiografias/fonts/Poppins-SemiBold.ttf',
  '/simbiografias/fonts/Poppins-Bold.ttf',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_ASSETS)
    })
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => {
            return name.startsWith('simbiografias-') && 
                   name !== STATIC_CACHE && 
                   name !== MODEL_CACHE && 
                   name !== IMAGE_CACHE
          })
          .map((name) => caches.delete(name))
      )
    })
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  if (request.method !== 'GET') return

  // El navegador debe obtener el favicon actualizado directamente de la red.
  if (url.pathname.endsWith('/favicon-simbiografias.svg') ||
      url.pathname.endsWith('/favicon-simbiografias.png')) return

  // El navegador gestiona los rangos de audio/video; Cache.put no admite respuestas 206.
  if (request.headers.has('range') || request.destination === 'audio' ||
      request.destination === 'video' || /\.(opus|ogg|mp3|m4a|wav|mp4|webm)$/i.test(url.pathname)) return

  if (url.pathname.endsWith('.glb') || url.pathname.endsWith('.gltf')) {
    event.respondWith(
      caches.open(MODEL_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          }).catch(() => {
            return new Response('Model not available offline', { status: 503 })
          })
        })
      })
    )
    return
  }

  if (url.pathname.match(/\.(jpg|jpeg|png|gif|webp|avif|svg|ico)$/)) {
    event.respondWith(
      caches.open(IMAGE_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          }).catch(() => {
            return new Response('', { status: 503 })
          })
        })
      })
    )
    return
  }

  if (url.pathname.match(/\.(woff2?|ttf|eot)$/)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse
          return fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          })
        })
      })
    )
    return
  }

  if (url.pathname.match(/\.(js|css)$/)) {
    event.respondWith(
      caches.open(STATIC_CACHE).then((cache) => {
        return cache.match(request).then((cachedResponse) => {
          const fetchPromise = fetch(request).then((networkResponse) => {
            if (networkResponse.ok) {
              cache.put(request, networkResponse.clone())
            }
            return networkResponse
          }).catch(() => {
            return cachedResponse
          })
          
          return cachedResponse || fetchPromise
        })
      })
    )
    return
  }

  event.respondWith(
    fetch(request)
      .then((networkResponse) => {
        if (networkResponse.ok && request.url.startsWith(self.location.origin)) {
          const responseClone = networkResponse.clone()
          caches.open(STATIC_CACHE).then((cache) => {
            cache.put(request, responseClone)
          })
        }
        return networkResponse
      })
      .catch(() => {
        return caches.match(request)
      })
  )
})

self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting()
  }
})
