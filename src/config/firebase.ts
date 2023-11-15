// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBwLYW24xeuRgDuzlY_ZkOkJv7eie0Bn4Y",
    authDomain: "react-project-1-ef2f1.firebaseapp.com",
    projectId: "react-project-1-ef2f1",
    storageBucket: "react-project-1-ef2f1.appspot.com",
    messagingSenderId: "150427537290",
    appId: "1:150427537290:web:c9ef277d6870e5b23a0273"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app)