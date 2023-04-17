import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { updateLike } from "../../../Services/Firebase";
import './style.css';

function Footer(props) {
  const {
    caption,
    totalLikes,
    userLikedPhoto,
    username,
    docId,
    userId,
    children,
  } = props;

  const [toggleLike, setToggleLike] = useState(userLikedPhoto);
  const [likesQuantity, setLikesQuantity] = useState(totalLikes);

  const handleLike = () => {
    setToggleLike(!toggleLike);
    setLikesQuantity((likesQuantity) =>
      toggleLike ? likesQuantity - 1 : likesQuantity + 1
    );
  };

  useEffect(() => {
    const updateUserLike = async () => {
      if (userId) {
        await updateLike(userId, docId, toggleLike);
      }
    };
    updateUserLike();
  }, [userId, toggleLike]);

  return (
    <div className="footer">
      <div className="actions">
        {toggleLike ? (
          <button className="action-button" onClick={handleLike}>
            <img src="/images/liked-icon.svg" alt="Liked" />
          </button>
        ) : (
          <button className="action-button" onClick={handleLike}>
            <img src="/images/unliked-icon.svg" alt="Not liked" />
          </button>
        )}
        <button className="action-button">
          <img src="/images/comment.svg" alt="Comment" />
        </button>
      </div>
      <p className="likes-quantity">{likesQuantity} likes</p>
      {caption && (
        <p className="caption">
          <Link to={`/p/${username}`}>
            <span className="username">{username}</span>
          </Link>{" "}
          {caption}
        </p>
      )}
      {children}
    </div>
  );
}

export default Footer;
