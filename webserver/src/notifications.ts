import webpush from "web-push";
import parser from "body-parser";
import express from "express";

var vapidPublicKey = 'BHCeWSSH4hK7PZ33ft93B645av7M7Y8qOoX2tVus9SlFs-6Xg2jJ-4ElSjFhjmfu2uclnb0L2ZrXo_OkRZgVw3c';
var vapidPrivateKey = 'GweacNS3OPduU3XFg57XpkiRfOby26UaUuf1PJOCT8w';
let subscriptions:Array<any> = [];

webpush.setVapidDetails(
    'mailto:turban2009@live.de',
    vapidPublicKey,
    vapidPrivateKey
);

const router = express.Router();

router.get('/key', function (req, res) {
    res.send({
        key: vapidPublicKey
    });
});
router.post('/save-subscription', parser.json(), function (req, res) {
    // save req.body.subscription to a database
    subscriptions.push((req.body as any).subscription);
    res.send('Success');
});

router.get("/push", (req, res) => {
    subscriptions.forEach(subscription => {
        webpush.sendNotification(subscription, JSON.stringify({
            body: "Hey, we have a new article that will blow you away!",
            icon: 'https://image.flaticon.com/icons/png/512/70/70535.png',
            //badge: 'https://image.flaticon.com/icons/png/512/70/70535.png',
            vibrate: [100, 50, 100],
            actions: [
                {
                    action: 'view', title: 'View'
                },
                {
                    action: 'dismiss', title: 'Dismiss'
                }
            ]
        }))
            .then(function (response) {
                console.log('sent');
                res.send();
            });
    })

})

export default router;