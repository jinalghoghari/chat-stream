import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "chatappstream-51608.firebaseapp.com",
  projectId: "chatappstream-51608",
  storageBucket: "chatappstream-51608.appspot.com",
  messagingSenderId: "451347123093",
  appId: "1:451347123093:web:84b3d897b2943590a2449c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();
