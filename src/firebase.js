// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Firebase configuration - replace with your own values or load from env
const firebaseConfig = {
  apiKey: "AIzaSyAnaIlTO5WYJfgtmx0Kfb44wdtsDEVxTyM",
  authDomain: "fooddelogindata.firebaseapp.com",
  projectId: "fooddelogindata",
  storageBucket: "fooddelogindata.appspot.com",
  messagingSenderId: "941064772665",
  appId: "1:941064772665:web:e6a63b3082878fabbbc1e8",
  measurementId: "G-172CXVP1L1",
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

export { auth, googleProvider };