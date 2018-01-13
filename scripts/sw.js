self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open("static-site").then(function(cache) {
      return cache.addAll([
          '/styles/main.css',
          '/styles/font-awesome.min.css',
          '/scripts/main.js',
          '/scripts/vendor.js',
          'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
          'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
          'images/road-tall.svg',
          'images/favicon@0,1x.png',
          'images/csev1o.jpg',
          'images/csev2o.jpg',
          'images/csev3o.jpg',
          'fonts/Roboto-Regular.ttf',
          'fonts/Roboto-Bold.ttf',
          'fonts/Roboto-Medium.ttf',
          '/index.html'
        ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function() {
      return caches.match(event.request);
    })
  );
});

