import { initializeApp } from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDYbwsQkXVxnGCOSexbKF9BdDfqlGigIaI",
  authDomain: "bug-tracker-9f416.firebaseapp.com",
  projectId: "bug-tracker-9f416",
  storageBucket: "bug-tracker-9f416.appspot.com",
  messagingSenderId: "1047877329316",
  appId: "1:1047877329316:web:e2fc9edc757b230c21e131",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export default app;
