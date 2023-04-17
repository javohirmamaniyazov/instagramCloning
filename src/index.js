import { FirebaseAuthProvider } from "./Helper/AuthProvider"
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