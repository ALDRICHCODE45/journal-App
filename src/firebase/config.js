/* eslint-disable no-unused-vars */

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDfcUjn72aZrqQIXhiVeyT70QcXgBDDlg0",
  authDomain: "journall-app-e3790.firebaseapp.com",
  projectId: "journall-app-e3790",
  storageBucket: "journall-app-e3790.appspot.com",
  messagingSenderId: "74448632524",
  appId: "1:74448632524:web:8faf7e8207616bc2a1e069",
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);
