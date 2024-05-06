import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


//web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBbNOY9-hAA026miCX0r2WtYQi1mD0UKtE",
  authDomain: "mylifter-social-media-app.firebaseapp.com",
  projectId: "mylifter-social-media-app",
  storageBucket: "mylifter-social-media-app.appspot.com",
  messagingSenderId: "872923883814",
  appId: "1:872923883814:web:66f6f8c760dc01957939e7"
};

// Initializing Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const auth = getAuth();
export default db;