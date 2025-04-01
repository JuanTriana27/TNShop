import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage'; // Agrega esta importación

const firebaseConfig = {
    apiKey: "AIzaSyD61Qvr0cAqK7b_j0hJlAFNvS-t7gSxZMQ",
    authDomain: "tnshop-c3fed.firebaseapp.com",
    projectId: "tnshop-c3fed",
    storageBucket: "tnshop-c3fed.firebasestorage.app", // Este está correcto
    messagingSenderId: "838388964915",
    appId: "1:838388964915:web:03fd41c6d5d2d0dd948d46",
    measurementId: "G-Q8LL59BV3S"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app); // Exporta storage correctamente

export default app;