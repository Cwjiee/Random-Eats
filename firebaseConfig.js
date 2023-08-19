// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyDcs5NP4TT0d8EvkIfEOsu-sHX4m4bY1KU",
  authDomain: "makan-mana-25ff6.firebaseapp.com",
  projectId: "makan-mana-25ff6",
  storageBucket: "makan-mana-25ff6.appspot.com",
  messagingSenderId: "157955525025",
  appId: "1:157955525025:web:42b0d392b37cb7e01e63e0",
  measurementId: "G-8T0K7R1EX0"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

