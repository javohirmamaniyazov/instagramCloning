import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBxISZd0IbDVN8OEO7GlN0qCbwYBi_Fqtw",
    authDomain: "instagram-clone-36358.firebaseapp.com",
    projectId: "instagram-clone-36358",
    storageBucket: "instagram-clone-36358.appspot.com",
    messagingSenderId: "406669608193",
    appId: "1:406669608193:web:ddafbefa57bead7c3ec700",
}

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { app, db, auth };

