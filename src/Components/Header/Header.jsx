import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { FirebaseAuthContext } from "../../Context/AuthContext";

const Header = () => {
  const user = useContext(FirebaseAuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const signOutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <header className="container">
      <div className="wrapper">
        <Link to="/">
          <img src="/images/misc/logo.png" alt="Logo" className="logo" />
        </Link>
        {user ? (
          <div className="icons">
            <Link to="/">
              <img src="/images/home.svg" alt="Home" />
            </Link>
            <div className="dropdown">
              <button
                className="avatar"
                onClick={() => setIsOpen((isOpen) => !isOpen)}
              >
                <img src={`/images/avatars/${user.displayName}.jpg`} alt="User" />
              </button>
              {isOpen && (
                <div className="dropdown-menu">
                  <Link to={`/p/${user.displayName}`}>
                    <div>
                      <img src="/images/profile.svg" alt="Profile" />
                      Profile
                    </div>
                  </Link>
                  <div>
                    <img src="/images/settings.svg" alt="Settings" />
                    Settings
                  </div>
                  <div onClick={signOutHandler}>
                    <img src="/images/logout.svg" alt="Logout" />
                    Log Out
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div>
            <Link to="/login">
              <button className="btn bg">Log In</button>
            </Link>
            <Link to="/register">
              <button className="btn">Sign Up</button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
