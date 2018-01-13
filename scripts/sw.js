var CACHE = 'cache-and-update';

self.addEventListener('install', function(evt) {
  console.log('The service worker is being installed.');

  evt.waitUntil(precache());
});
self.addEventListener('fetch', function(evt) {
  console.log('The service worker is serving the asset.');
  evt.respondWith(fromCache(evt.request));
  evt.waitUntil(update(evt.request));
});
function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll([
        '../styles/main.css',
        '../styles/font-awesome.min.css',
        '../scripts/main.js',
        '../scripts/vendor.js',
        // 'https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js',
        // 'https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js',
        '../images/road-tall.svg',
        '../images/favicon@0,1x.png',
        '../images/csev1o.jpg',
        '../images/csev2o.jpg',
        '../images/csev3o.jpg',
        '../fonts/Roboto-Regular.ttf',
        '../fonts/Roboto-Bold.ttf',
        '../fonts/Roboto-Medium.ttf',
        '../index.html'
    ]);
  });
}
function fromCache(request) {
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function update(request) {
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}
