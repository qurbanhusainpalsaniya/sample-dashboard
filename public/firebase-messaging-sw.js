/* eslint-disable no-undef */

// Scripts for firebase and firebase messaging
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js');


const firebaseConfig = { 
    apiKey: "AIzaSyD4RaVjeVGAbTXGv-RfxR9cWSx7drtHNDs",
    authDomain: "reownx.firebaseapp.com",
    projectId: "reownx",
    storageBucket: "reownx.appspot.com",
    messagingSenderId: "620496633375",
    appId: "1:620496633375:web:dd982f39e126cbf44d1f2a",
    measurementId: "G-ZDGHKKZZVZ"
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();


messaging.onBackgroundMessage(function (payload) {
    console.log('Received Background Notification', payload);
    const { title, description, img_url } = payload.data;
    const notificationOptions = {
        body: description,
        icon: 'favicon/favicon.ico',
        image: img_url,
        data: payload.data,
        // lang: "",
        // badge: "",
        // tag: "",
        // vibrate: "",
        // timestamp: "",
        // renotify: "",
        // actions: [{ action: "", title: "replay", icon: 'favicon/favicon.ico' }, { action: "", title: "close", icon: 'favicon/favicon.ico' }]
    };
    self.registration.showNotification(title, notificationOptions);
});


self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    // if (event.notification.data.navigate_to == 'ORDER_DETAILS') {
    //     event.waitUntil(
    //         clients.openWindow(`https://bhxyz.autobay.me/orders/${btoa(event.notification.data.navigate_id)}`) 
    //       );
    // }
    // if (event.notification.data.navigate_to == 'REQUEST_QUOTE_DETAILS') {
    //     event.waitUntil(
    //         clients.openWindow(`https://bhxyz.autobay.me/requestquote/${btoa(event.notification.data.navigate_id)}`) 
    //       );
    // }
    // if (event.notification.data.navigate_to == 'ESTIMATE_DETAILS') {
    //     event.waitUntil(
    //         clients.openWindow(`https://bhxyz.autobay.me/estimate/${btoa(event.notification.data.navigate_id)}`) 
    //       );
    // }
});

