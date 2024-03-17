'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "335b2d151fd25aaccae5d341cbcc22e8",
"assets/AssetManifest.bin.json": "716b9e4773618d500559d922dd8dc145",
"assets/AssetManifest.json": "100d23f1325224b26cb579566fd53503",
"assets/assets/fonts/poppins-bold.ttf": "08c20a487911694291bd8c5de41315ad",
"assets/assets/fonts/poppins-light.ttf": "fcc40ae9a542d001971e53eaed948410",
"assets/assets/fonts/poppins-medium.ttf": "bf59c687bc6d3a70204d3944082c5cc0",
"assets/assets/fonts/poppins-regular.ttf": "093ee89be9ede30383f39a899c485a82",
"assets/assets/fonts/poppins-semi-bold.ttf": "6f1520d107205975713ba09df778f93f",
"assets/assets/icons/aboutusvector.svg": "11a164fa6d74cdc370d719af3edf0a59",
"assets/assets/icons/alphamedicallogo.svg": "47426adc96fb1a39f841f58852994ad9",
"assets/assets/icons/coverageicon.svg": "c59fba9d60cffe9073a5fd4f807c6cb3",
"assets/assets/icons/homevector.svg": "cebef267eaf5f49a7f8dc2cc9249f00b",
"assets/assets/icons/officeicon.svg": "10ed4e79ac482fe2f968a2f1f1f5d00b",
"assets/assets/icons/staffingcosticon.svg": "674d8a68174082f713972d7ca4e7f04a",
"assets/assets/icons/turnovericon.svg": "a469b36f0b53fc35229e4bce0eb12a4d",
"assets/assets/images/alphamedicalbackground.gif": "2a8db499815cf7c53a47eeba20f99675",
"assets/assets/images/alphamedicalbackgroundhigh.gif": "398f37a1e87aa15e3609b767caa295d8",
"assets/assets/images/alphamedicalbackgroundmedium.gif": "39d9de408d17e2ae8c0e77213f277e56",
"assets/assets/images/alphamedicalbackgroundplaceholder.jpg": "a34dc3ae88b9d3c60afeca0000d04e82",
"assets/assets/images/alphamedicallogo.png": "f274ff09da46a5ca1a35cbaedfe17ec0",
"assets/assets/images/homebackground.png": "2eb60536d884537338809846a1db1361",
"assets/assets/images/homeinvertedbackground.png": "ed562cab41b239bc888645838184e418",
"assets/assets/images/keyfeaturebackground.png": "f57fbd0abdd55f4ac8257e835d799b7f",
"assets/FontManifest.json": "821dfc1b5312091eb0a05d4216fd47c6",
"assets/fonts/MaterialIcons-Regular.otf": "7da3fa5921d2093b3b65b0dd0e35fdfa",
"assets/NOTICES": "575ec8d72b35bb5eca35c93199948af5",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "89ed8f4e49bcdfc0b5bfc9b24591e347",
"assets/packages/font_awesome_flutter/lib/fonts/fa-brands-400.ttf": "17ee8e30dde24e349e70ffcdc0073fb0",
"assets/packages/font_awesome_flutter/lib/fonts/fa-regular-400.ttf": "f3307f62ddff94d2cd8b103daf8d1b0f",
"assets/packages/font_awesome_flutter/lib/fonts/fa-solid-900.ttf": "04f83c01dded195a11d21c2edf643455",
"assets/shaders/ink_sparkle.frag": "4096b5150bac93c41cbc9b45276bd90f",
"canvaskit/canvaskit.js": "eb8797020acdbdf96a12fb0405582c1b",
"canvaskit/canvaskit.wasm": "73584c1a3367e3eaf757647a8f5c5989",
"canvaskit/chromium/canvaskit.js": "0ae8bbcc58155679458a0f7a00f66873",
"canvaskit/chromium/canvaskit.wasm": "143af6ff368f9cd21c863bfa4274c406",
"canvaskit/skwasm.js": "87063acf45c5e1ab9565dcf06b0c18b8",
"canvaskit/skwasm.wasm": "2fc47c0a0c3c7af8542b601634fe9674",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"favicon.png": "a93f6d5fe56e068e3fe1368596b27358",
"flutter.js": "59a12ab9d00ae8f8096fffc417b6e84f",
"icons/Icon-192.png": "feb058fa7ea1541ac77ac2e3b4beffe2",
"icons/Icon-512.png": "123da200d7bd56c408d53cf52e7583e4",
"icons/Icon-maskable-192.png": "feb058fa7ea1541ac77ac2e3b4beffe2",
"icons/Icon-maskable-512.png": "123da200d7bd56c408d53cf52e7583e4",
"index.html": "e5e328722e6f24e6fa0efb5e4f74b034",
"/": "e5e328722e6f24e6fa0efb5e4f74b034",
"main.dart.js": "1f19e8ca2144b8698d0f3e8cf189b4a0",
"manifest.json": "8da8ceb88f29d3e1c52d320c4ad1f8d4",
"version.json": "fdd689960a57fd7eed858b044a60773e"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
