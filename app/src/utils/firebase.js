// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCcFOhaKtqCwI5FpJjD8379NVBIjZlJO0M",
  authDomain: "upbeat-resolver-342516.firebaseapp.com",
  projectId: "upbeat-resolver-342516",
  storageBucket: "upbeat-resolver-342516.appspot.com",
  messagingSenderId: "480328642115",
  appId: "1:480328642115:web:a841f9409079e4893baef6",
  measurementId: "G-XQ2E1ER2F8"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore(app);