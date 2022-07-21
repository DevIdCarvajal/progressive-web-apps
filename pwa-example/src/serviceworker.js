self.addEventListener("install", event => {
  
  self.skipWaiting();

  //console.log("Service worker installed");

  // -------------- Caching files --------------

  event.waitUntil(

    // Create or access cache files
    caches
      .open("pwa-assets")
      .then(cache => {

        // Add some files to cache
        cache.add("index.html")
        cache.add("css/style.css")
        cache.add("js/main.js")
      })
  )
})

self.addEventListener("activate", event => {

  clients.claim()

  //console.log("Service worker activated");

  // Create or access cache files
  // caches
  //   .open("pwa-assets")
  //   .then(cache => {

  //     // Clean up cache files
  //     cache.delete(request)
  //     cache.add("index.html")
  //   })
})

self.addEventListener("fetch", event => {
  
  //console.log(`URL requested: ${event.request.url}`);

  const url = event.request.url
  // Example: https://devidcarvajal.github.io/pwa-example/img/logo.jpg

  // Dummy service worker
  //const response = new Response("Body of the HTTP response")

  // const options = {
  //   status: 200,
  //   headers: {
  //   'Content-type': 'text/html'
  //   }
  // }

  // const responseHTML = new Response("<b>HTML</b> content", options)

  event.respondWith(

    // Open cache
    caches
      .open("pwa-assets")
      .then(cache => {

        // Find url resource in cache
        cache
          .match(url)
          .then(response => {

            // Return cache version (if exists) or server version (if doesn't)
            return response || fetch(event.request)
          })
      })
  )
})