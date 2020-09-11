self.addEventListener('install', function (event) {
	const offlineResources = [
		"manifest.json",
		"css/w3.css",
		"/"
	]
	event.waitUntil(
		caches.open('offline-cache').then(function (cache) {
			return cache.addAll(offlineResources);
		})
	);
});

self.addEventListener('fetch', function (event) {
	event.respondWith(
		caches.match(event.request)
			.then(function (response) {
				if (response) return response;

				return fetch(event.request)
				
				.then(
					function (response) {
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

self.addEventListener('push', function (event) {
	const pushData = event.data.json();
	event.waitUntil(
		registration.showNotification("Jane's Blog", pushData)
	);
});

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