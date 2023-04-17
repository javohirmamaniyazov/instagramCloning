import React from "react";
import "./Form.css";

const Form = () => {
  return (
    <div className="form-container">
      <div className="form-wrapper">
        <form className="form">
          <img className="form-logo" src="/images/misc/logo.png" alt="Logo" />
          <input className="form-input" type="text" placeholder="Email or phone number" />
          <input className="form-input" type="password" placeholder="Password" />
          <button className="form-button" type="submit">Sign In</button>
          <span className="form-divider">OR</span>
          <a className="form-fb-login" href="/">
            <img src="/images/icons/facebook.png" alt="Facebook Logo" />
            Log in with Facebook
          </a>
          <span className="form-forgot-password">Forgotten your password?</span>
        </form>
        <div className="form-login-signup-redirect">
          <span className="form-text">New to Netflix? </span>
          <a className="form-signup-link" href="/register">Sign up now.</a>
        </div>
        <div className="form-bottom">
          <span>Get the app.</span>
          <div>
            <img src="images/icons/apple.png" alt="Apple Store Logo" />
            <img src="images/icons/google-play.png" alt="Google Play Store Logo" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Form;
