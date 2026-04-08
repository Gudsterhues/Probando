// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBP0HGppZ07youXI3hrF_eJupsSGUhZwgA",
  authDomain: "clase08-92555.firebaseapp.com",
  databaseURL: "https://clase08-92555-default-rtdb.firebaseio.com",
  projectId: "clase08-92555",
  storageBucket: "clase08-92555.firebasestorage.app",
  messagingSenderId: "439981927170",
  appId: "1:439981927170:web:f26002650018725ec1f01b",
  measurementId: "G-09CEPE3FEB"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firebaseStorage = getStorage(app);
const db = getFirestore(app);


export {app,auth,firebaseStorage,db };