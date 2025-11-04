// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyAnaIlTO5WYJfgtmx0Kfb44wdtsDEVxTyM",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "fooddelogindata.firebaseapp.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "fooddelogindata",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "fooddelogindata.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "941064772665",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:941064772665:web:e6a63b3082878fabbbc1e8",
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-172CXVP1L1",
};

const app = initializeApp(firebaseConfig);
// analytics is optional
let analytics;
try {
  analytics = getAnalytics(app);
} catch (e) {
  // getAnalytics can fail in some environments; ignore
}

// Auth exports used by the app
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleProvider, db };