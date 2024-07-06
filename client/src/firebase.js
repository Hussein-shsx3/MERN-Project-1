// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "mern-auth-cdb07.firebaseapp.com",
  projectId: "mern-auth-cdb07",
  storageBucket: "mern-auth-cdb07.appspot.com",
  messagingSenderId: "385468708204",
  appId: "1:385468708204:web:9649318d25db696de2ef49",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
