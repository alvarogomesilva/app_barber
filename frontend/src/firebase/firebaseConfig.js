import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyAErv7S4AFbPHoYn3XJ0jJI2pazmI_3658",
  authDomain: "barber-a0ff0.firebaseapp.com",
  projectId: "barber-a0ff0",
  storageBucket: "barber-a0ff0.appspot.com",
  messagingSenderId: "433474731368",
  appId: "1:433474731368:web:7e4846ff2e7fc9e4b86add"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { app, auth, firestore, storage };