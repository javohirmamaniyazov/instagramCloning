import { getAuth, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { FirebaseAuthContext } from "../Context/AuthContext";
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBxISZd0IbDVN8OEO7GlN0qCbwYBi_Fqtw",
  authDomain: "instagram-clone-36358.firebaseapp.com",
  projectId: "instagram-clone-36358",
  storageBucket: "instagram-clone-36358.appspot.com",
  messagingSenderId: "406669608193",
  appId: "1:406669608193:web:ddafbefa57bead7c3ec700",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const FirebaseAuthProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("authUser")));

  useEffect(() => {
    const listener = onAuthStateChanged(auth, (authUser) => {
      if (authUser) {
        localStorage.setItem("authUser", JSON.stringify(authUser));
        setUser(authUser);
      } else {
        localStorage.removeItem("authUser");
        setUser(null);
      }
    });

    return () => listener();
  }, [auth]);

  return (
    <FirebaseAuthContext.Provider value={user}>
      {children}
    </FirebaseAuthContext.Provider>
  );
};

export { FirebaseAuthProvider };
