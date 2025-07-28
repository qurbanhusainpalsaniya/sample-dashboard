
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";
import encryptLocalStorage from "localstorage-slim";


export const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

const firebaseCloudMessaging = {
    init: async () => {
        try {
            const app = initializeApp(firebaseConfig);
            const messaging = getMessaging(app);
            const tokenInLocalForage = await encryptLocalStorage.get("fcm_token");
            if (tokenInLocalForage !== null) {
                return tokenInLocalForage;
            }
            const status = await Notification.requestPermission();
            if (status && status === "granted") {
                const currentToken = await getToken(messaging, { vapidKey: process.env.FIREBASE_VAPID_KEY });
                if (currentToken) {
                    console.log('FCM Token:', currentToken);
                    encryptLocalStorage.set('fcm_token', currentToken);
                    return currentToken;
                } else {
                    console.log('No registration token available. Request permission to generate one.');
                    return null;
                }
            } else {
                console.error('Please Enable Notification');
                return null
            }
        } catch (error) {
            console.error('Error initializing FCM:', error);
            throw error;
        }
    },
};
export { firebaseCloudMessaging };
