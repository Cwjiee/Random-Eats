// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAh-FH6aj1A4aTolHnX_d4HaBqplRRApGQ",
  authDomain: "where-to-eat-4cbb5.firebaseapp.com",
  projectId: "where-to-eat-4cbb5",
  storageBucket: "where-to-eat-4cbb5.appspot.com",
  messagingSenderId: "631384321097",
  appId: "1:631384321097:web:33d49bf36eb83d1b97a398",
  measurementId: "G-9J3WXMJ0MT",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
