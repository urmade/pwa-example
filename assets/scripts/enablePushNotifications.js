function registerPush() {
    //Check if the browser supports Service Workers
    if (navigator.serviceWorker) {
        //Get a public key from your backend
        fetch('./api/key')
            .then(function (res) {
                res.json().then(function (data) {
                    //Make sure that the service worker is running
                    navigator.serviceWorker.ready.then(function (registration) {
                        //Check if a subscription for that user already exists
                        return registration.pushManager.getSubscription()
                            .then(function (subscription) {
                                //If the subscription already existed, return
                                if (subscription) {
                                    return subscription;
                                }
                                //Else create new subscription
                                return registration.pushManager.subscribe({
                                    userVisibleOnly: true,
                                    applicationServerKey: urlBase64ToUint8Array(data.key)
                                });
                            })
                            .then(function (subscription) {
                                //Send subscription to backend to store and reference it
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
