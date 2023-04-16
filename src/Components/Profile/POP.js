import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useParams } from "react-router-dom";
import { formatDistance } from "date-fns";
import { Comment as CommentComponent } from "../timeline/post/Comment";
import { useUser } from "../../Hooks/UsingUser";
import './style.css';

export const Popup = ({ photo, setPopup }) => {
  const [toggleLike, setToggleLike] = useState(photo.userLikedPhoto);
  const [likesQuantity, setLikesQuantity] = useState(photo.likes.length);
  const { username } = useParams();
  const { user } = useUser();

  const handleLike = () => {
    setToggleLike((prevState) => !prevState);
    setLikesQuantity((prevState) =>
      prevState.toggleLike ? prevState.likesQuantity - 1 : prevState.likesQuantity + 1
    );
  };

  const {
    caption,
    comments,
    dateCreated,
    likes,
    userLikedPhoto,
    imageSrc,
    docId,
  } = photo;

  return ReactDOM.createPortal(
    <div className="popup-overlay">
      <button className="popup-close-btn" onClick={() => setPopup(null)}>
        <img src="/images/close.svg" alt="Close" />
      </button>
      <div className="popup-inner">
        <img src={imageSrc} alt={caption} />
        <div className="popup-post-info">
          <div className="popup-header">
            <div className="popup-avatar">
              <img src={`/images/avatars/${username}.jpg`} alt={username} />
            </div>
            <h2 className="popup-username">{username}</h2>
          </div>
          <div className="popup-comments-section">
            <div className="popup-caption">
              <div className="popup-avatar">
                <img src={`/images/avatars/${username}.jpg`} alt={username} />
              </div>
              <div className="popup-text">
                <h2 className="popup-username">{username}</h2>
                <p>{caption}</p>
              </div>
            </div>
            <p className="popup-posted">{formatDistance(dateCreated, new Date())}</p>
            {comments.map(({ comment, displayName }, index) => (
              <div key={index} className="popup-comment">
                <div className="popup-avatar">
                  <img
                    src={`/images/avatars/${displayName}.jpg`}
                    alt={displayName}
                  />
                </div>
                <div className="popup-text">
                  <h2 className="popup-username">{displayName}</h2>
                  <p>{comment}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <CommentComponent
          docId={docId}
          comments={comments}
          setComments={(comments) => photo.comments = comments}
        />
      </div>
    </div>,
    document.body
  );
};

export default Popup;
