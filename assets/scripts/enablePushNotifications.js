function registerPush() {
    if (navigator.serviceWorker) {
        fetch('./api/key')
            .then(function (res) {
                res.json().then(function (data) {
                    navigator.serviceWorker.ready.then(function (registration) {
                        return registration.pushManager.getSubscription()
                            .then(function (subscription) {
                                if (subscription) {
                                    return subscription;
                                }

                                return registration.pushManager.subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: urlBase64ToUint8Array(data.key)
                                });
                            })
                            .then(function (subscription) {
                                return fetch('./api/save-subscription', {
                                    method: 'post',
                                    headers: { 'Content-type': 'application/json' },
                                    body: JSON.stringify({ subscription: subscription })
                                });
                            });
                    });
                });
            });
    }
}

function urlBase64ToUint8Array(base64String) {
    var padding = '='.repeat((4 - base64String.length % 4) % 4);
    var base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');

    var rawData = window.atob(base64);
    var outputArray = new Uint8Array(rawData.length);

    for (var i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }

    return outputArray;
}
