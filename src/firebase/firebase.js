// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDsiTxaCvm71SzvJ6tcC9Zxb0EB7EJLppg",
  authDomain: "task-list-9c207.firebaseapp.com",
  projectId: "task-list-9c207",
  storageBucket: "task-list-9c207.appspot.com",
  messagingSenderId: "1065497400288",
  appId: "1:1065497400288:web:b9dc841cdb522445a49185",
  measurementId: "G-CXCG3J5B03",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };
