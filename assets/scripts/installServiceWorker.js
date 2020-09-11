//Check if service workers are supported and then register the Service worker file
if ("serviceWorker" in navigator) {
    navigator.serviceWorker
        .register("/serviceWorker.js")
        .then(serviceWorker => {
            console.log("Service Worker registered: ", serviceWorker);
        })
        .catch(error => {
            console.error("Error registering the Service Worker: ", error);
        });
}