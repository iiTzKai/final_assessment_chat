// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjWDVsGVutMEXuiw6B92COL4OERbwfF4s",
  authDomain: "assesment-chat.firebaseapp.com",
  projectId: "assesment-chat",
  storageBucket: "assesment-chat.appspot.com",
  messagingSenderId: "314594384508",
  appId: "1:314594384508:web:500c4127831e0e76f6c7f9",
  measurementId: "G-S4BJL3MBZG",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
provider.setCustomParameters({ prompt: "Select_account" });
