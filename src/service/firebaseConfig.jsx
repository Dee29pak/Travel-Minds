// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBp4P0nD6r5yfnSE8zCfQ9imgmD7OSpwfU",
  authDomain: "travel-minds-c2cd9.firebaseapp.com",
  projectId: "travel-minds-c2cd9",
  storageBucket: "travel-minds-c2cd9.firebasestorage.app",
  messagingSenderId: "410970760761",
  appId: "1:410970760761:web:939c0d7cee17a18d3e8fe8",
  measurementId: "G-NJPZVK5L6M"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

// const analytics = getAnalytics(app);