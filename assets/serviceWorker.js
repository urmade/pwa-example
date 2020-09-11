//This event is fired when the Service worker first installs onto a new client
self.addEventListener('install', function (event) {
	const offlineResources = [
		"manifest.json",
		"css/w3.css",
		"/"
	]
	//event.waitUntil waits until a Promise and all following operations is finished before completing
	event.waitUntil(
		//Open a cache, fetch all offline resources specified and store them on the device
		caches.open('offline-cache').then(function (cache) {
			return cache.addAll(offlineResources);
		})
	);
});

//This event is fired whenever the client does a network request
self.addEventListener('fetch', function (event) {
	event.respondWith(
		//Cache-first pattern. For every request the service worker will check if it exists in the cache, and fall back to making the actual request.
		caches.match(event.request)
			.then(function (response) {
				if (response) return response;

				return fetch(event.request)
				.then(
					function (response) {
						//If the network request fetched something from the image directory, cache that requets
						if (event.request.url.startsWith("http://localhost:5000/img")) {
							// Check if we received a valid response
							if (!response || response.status !== 200 || response.type !== 'basic') {
								return response;
							}
							var responseToCache = response.clone();
							caches.open('offline-cache')
								.then(function (cache) {
									cache.put(event.request, responseToCache);
								});
						}
						return response;
					}
				);

			})
	);
});

//Event fires whenever a server sends a push request to the service worker
self.addEventListener('push', function (event) {
	//In this case the service worker assumes that the actual notification payload is sent over by the server
	const pushData = event.data.json();
	event.waitUntil(
		registration.showNotification("Jane's Blog", pushData)
	);
});

//Event fires whenever an action in a notification is clicked
self.addEventListener('notificationclick', function (e) {
	var notification = e.notification;
	var action = e.action;

	if (action === 'view') {
		clients.openWindow('http://localhost:5000/');
		notification.close();
	} else {
		notification.close();
	}
});