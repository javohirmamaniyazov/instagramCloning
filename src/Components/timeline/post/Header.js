import React from "react";
import { Link } from "react-router-dom";
import './style.css';

const Header = ({ username }) => {
  return (
    <div className="header-container">
      <Link to={`/p/${username}`}>
        <img
          className="avatar"
          src={`/images/avatars/${username}.jpg`}
          alt={`${username}'s profile photo`}
        />
      </Link>
      <Link to={`/p/${username}`}>
        <span className="username">{username}</span>
      </Link>
    </div>
  );
};

export default Header;
