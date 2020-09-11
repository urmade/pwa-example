# PWA Example application
This app is meant as an implementation example for some common PWA features. These are:
- Installability
- Caching / Offline availability
- Notification sending

The code presented is in no way meant as a template to start developing your own app. If you want to learn more around the concepts and Best Practices around PWAs, I can recommend these resources:
- Introduction to PWAs: [Blog](https://web.dev/what-are-pwas/)
- App Manifests: [W3C reference](https://www.w3.org/TR/appmanifest/), [MDN reference](https://developer.mozilla.org/en-US/docs/Web/Manifest), [Sample](https://web.dev/add-manifest/)
- Caching strategies: [Blog](https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker#storing_resources)
- Push notifications: [Blog](https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications)

## How to run this project
This project is implemented in Typescript. In order to run it, you must have Node.js and Typescript installed on your machine. The easiest way to do so is to download Node.js [here](https://nodejs.org/en/download/) and run `npm install -g typescript`. 

To build the project, clone the project and run `npm install` followed by `tsc` in the root folder of the project. To run it, use `node webserver/build/index` or the debugger of your choice (project contains debugging configuration for VS Code).

## Noteworthy mentions
The project is based of a W3C sample website that you can find [here](https://www.w3schools.com/w3css/tryw3css_templates_fashion_blog.htm).