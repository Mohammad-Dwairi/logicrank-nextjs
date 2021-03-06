import {initializeApp, getApps} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage, ref} from 'firebase/storage';

const firebaseBackupConfig = {
    apiKey: "AIzaSyAdAUIScuwM171gPfLVFpir78kFa66flyg",
    authDomain: "logickrank2.firebaseapp.com",
    projectId: "logickrank2",
    storageBucket: "logickrank2.appspot.com",
    messagingSenderId: "1089431055294",
    appId: "1:1089431055294:web:c8c8300b112b08df0867ef"
}

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

let app = undefined;

if (!getApps.length) {
    app = initializeApp(firebaseBackupConfig);
}

export default app;
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);