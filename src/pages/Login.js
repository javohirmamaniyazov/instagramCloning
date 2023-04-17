import React, { useCallback, useState } from "react";
import Form from '../Components/Form/Form'
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../Constants/Routes";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isSubmiting, setIsSubmiting] = useState(false);
  const isInvalid = email === "" || password === "";

  const navigate = useNavigate();

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    const auth = getAuth();
    try {
      setIsSubmiting(true);
      await signInWithEmailAndPassword(auth, email, password);
      navigate(ROUTES.DASHBOARD);
    } catch (e) {
      setEmail("");
      setPassword("");
      setIsSubmiting(false);
      setError(e.message);
    }
  }, [email, password]);

  return (
    React.createElement('div', { className: 'wrapper' },
      React.createElement('img', { className: 'phone-image', src: 'images/misc/iphone-with-profile.jpg', alt: 'Iphone profile' }),
      React.createElement(Form, null,
        React.createElement(Form.Wrapper, null,
          React.createElement(Form.Base, { onSubmit: handleSubmit },
            React.createElement(Form.Logo, null),
            React.createElement(Form.Input, {
              type: 'email',
              placeholder: 'Phone number, username or email',
              value: email,
              onChange: ({ target }) => setEmail(target.value)
            }),
            React.createElement(Form.Input, {
              type: 'password',
              placeholder: 'Password',
              value: password,
              onChange: ({ target }) => setPassword(target.value)
            }),
            error && React.createElement(Form.Error, null, error),
            React.createElement(Form.Button, { disabled: isInvalid, type: 'submit' },
              isSubmiting ? "Submiting..." : "Log In"
            ),
          ),
          React.createElement(Form.Divider, null),
          React.createElement(Form.FacebookLogin, null),
          React.createElement(Form.ForgotPassword, null),
        ),
        React.createElement(Form.LoginSignupRedirect, null,
          "Don't have an account?",
          React.createElement(Link, { to: ROUTES.SIGN_UP }, "Sign up")
        ),
        React.createElement(Form.Bottom, null)
      )
    )
  );
};

export default Login;
