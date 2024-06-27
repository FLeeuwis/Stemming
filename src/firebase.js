import { initializeApp } from "firebase/app";
import { getAuth, OAuthProvider } from "firebase/auth";

import {
  doc,
  onSnapshot,
  addDoc,
  collection,
  query,
  updateDoc,
  deleteDoc,
  getFirestore,
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB1vn7sEDa5mj3c5ctWV7hsOeiX0A0HWO8",
  authDomain: "stemming-e4a6e.firebaseapp.com",
  projectId: "stemming-e4a6e",
  storageBucket: "stemming-e4a6e.appspot.com",
  messagingSenderId: "16411106869",
  appId: "1:16411106869:web:4a8e205f1c775acbb39b7c",
  measurementId: "G-RJ295FQMVS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const spotifyProvider = new OAuthProvider("spotify.com");

export default app;
export const db = getFirestore(app);
export const auth = getAuth(app);
// Exporting everything that we need from firebase
export {
  doc,
  onSnapshot,
  addDoc,
  collection,
  query,
  updateDoc,
  deleteDoc,
  spotifyProvider,
};
