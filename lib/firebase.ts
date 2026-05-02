import { initializeApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyB6FYH-Lp--hQMfGFg8_HbyQIi-ajYyaMM",
  authDomain: "mentora-b8de4.firebaseapp.com",
  projectId: "mentora-b8de4",
  storageBucket: "mentora-b8de4.firebasestorage.app",
  messagingSenderId: "501479282184",
  appId: "1:501479282184:web:50bf110c20bd5fc9bc63bd",
}

const app = initializeApp(firebaseConfig)

export const db = getFirestore(app)
export const auth = getAuth(app)