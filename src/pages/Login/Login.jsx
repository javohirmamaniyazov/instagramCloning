import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../../Constants/Routes";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isInvalid = email === "" || password === "";

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      setIsSubmitting(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (e) {
      setEmail("");
      setPassword("");
      setIsSubmitting(false);
      setError(e.message);
    }
  }, [email, password, navigate]);

  return (
    <div className="wrapper">
      <div className="form-wrapper">
        <form onSubmit={handleSubmit}>
          <div className="logo"></div>
          <input
            type="email"
            placeholder="Phone number, username or email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button className="button" disabled={isInvalid} type="submit">
            {isSubmitting ? "Submitting..." : "Log In"}
          </button>
        </form>
        <br/>
        <div className="login-signup-redirect">
        Don't have an account? <Link to={ROUTES.SIGN_UP}>Sign up</Link>
      </div>
      </div>

      <div className="bottom"></div>
    </div>
  );
};

export default Login;
