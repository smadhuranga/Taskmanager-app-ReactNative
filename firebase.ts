// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuhFBoxeI5vQ2Y3Ka8gsE7r3L9QdZxQl8",
  authDomain: "taskmanager-6e2b5.firebaseapp.com",
  projectId: "taskmanager-6e2b5",
  storageBucket: "taskmanager-6e2b5.firebasestorage.app",
  messagingSenderId: "251395526003",
  appId: "1:251395526003:web:14c4649c0b5c01f1b28906",
  measurementId: "G-D9J06CFZ1J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);

