
// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
import { getFirestore } from 'firebase/firestore'
import { getDatabase } from 'firebase/database'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: 'AIzaSyC3Qas2U2gJ0dQo-5wToLuRAykY7dYL2A0',
  authDomain: 'parcial2-17fee.firebaseapp.com',
  databaseURL: 'https://parcial2-17fee-default-rtdb.firebaseio.com/',
  projectId: 'parcial2-17fee',
  storageBucket: 'parcial2-17fee.firebasestorage.app',
  messagingSenderId: '237646531358',
  appId: '1:237646531358:web:785b152c36ba596085d70f',
  measurementId: 'G-21PBCYEHJP'
}
// Initialize Firebase
const app = initializeApp(firebaseConfig)
const auth = getAuth(app)
const firebaseStorage = getStorage(app)
const db = getFirestore(app)
const realtimeDb = getDatabase(app)

export { app, auth, firebaseStorage, db, realtimeDb }