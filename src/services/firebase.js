// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAhY1xITE_s-R3bozZ_nl3KIv0M5pprrsE",
  authDomain: "jobtracker-3dd5a.firebaseapp.com",
  projectId: "jobtracker-3dd5a",
  storageBucket: "jobtracker-3dd5a.firebasestorage.app",
  messagingSenderId: "1035411201583",
  appId: "1:1035411201583:web:ab34a5119eadd73bc630da",
  measurementId: "G-4KXLQG6KSY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app); 