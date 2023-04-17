import { FirebaseAuthProvider } from "./Helpers/AuthProvider"
import React from "react"
import ReactDOM from "react-dom"
import App from "./App"


ReactDOM.render(
  (
    <FirebaseAuthProvider>
      <App />
     </FirebaseAuthProvider> 
  ),
  document.getElementById("root")
)