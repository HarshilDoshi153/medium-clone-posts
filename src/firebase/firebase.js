// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getauth, GoogleAuthProvider} from 'firebase/auth';
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDQDQNwzWwkH9yc0Bc1ZqNHNcshtHtsFGM",
  authDomain: "medium-clone-e756b.firebaseapp.com",
  projectId: "medium-clone-e756b",
  storageBucket: "medium-clone-e756b.appspot.com",
  messagingSenderId: "291015938739",
  appId: "1:291015938739:web:95c4f661d684885e4256c6",
  measurementId: "G-76897CH6D4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getauth();
export const provider = new GoogleAuthProvider();
export const storage = getStorage();
export const db = getFirestore(app);