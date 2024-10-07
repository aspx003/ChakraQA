import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDRwCJPKOuaV-0LLQjrTfLfBYJQJ578SRc",
    authDomain: "react-firebase-chat-8c246.firebaseapp.com",
    projectId: "react-firebase-chat-8c246",
    storageBucket: "react-firebase-chat-8c246.appspot.com",
    messagingSenderId: "41997725294",
    appId: "1:41997725294:web:1157cb265550e4a036c07f"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);