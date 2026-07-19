import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDO-QiZd6t347xyEGkKfd4nN2NgiBNKQr0",
  authDomain: "kabil-crackers-2205.firebaseapp.com",
  projectId: "kabil-crackers-2205",
  storageBucket: "kabil-crackers-2205.firebasestorage.app",
  messagingSenderId: "212916347075",
  appId: "1:212916347075:web:59b5b09ac0606d06c68276",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;