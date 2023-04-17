import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";


const firebaseConfig = {
    apiKey: "AIzaSyBxISZd0IbDVN8OEO7GlN0qCbwYBi_Fqtw",
    authDomain: "instagram-clone-36358.firebaseapp.com",
    projectId: "instagram-clone-36358",
    storageBucket: "instagram-clone-36358.appspot.com",
    messagingSenderId: "406669608193",
    appId: "1:406669608193:web:ddafbefa57bead7c3ec700",
}

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export const auth = firebase.auth();



