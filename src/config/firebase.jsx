// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA5wsz7ppmBKn0QEFQVLqoIgWdThBVCNrA",
  authDomain: "ite-contact.firebaseapp.com",
  projectId: "ite-contact",
  storageBucket: "ite-contact.firebasestorage.app",
  messagingSenderId: "320191766279",
  appId: "1:320191766279:web:20b303d08cb1780523afa2"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);


