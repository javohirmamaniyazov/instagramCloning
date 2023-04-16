import React, { useState } from "react";
import { Popup } from "./popup/popup";
import './style.css';

const Photos = ({ photosCollection }) => {
  const [popup, setPopup] = useState(null);

  return (
    <div>
      {photosCollection.map((photo) => (
        <React.Fragment key={photo.docId}>
          <div
            style={{
              position: "relative",
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => setPopup(photo === popup ? null : photo)}
          >
            <img src={photo.imageSrc} alt={photo.caption} />
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                right: "10px",
                display: "flex",
                alignItems: "center",
                gap: "5px",
                color: "#fff",
              }}
            >
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/images/overlay-like.svg"
                  alt="likes"
                  style={{ height: "15px", marginRight: "5px" }}
                />
                <span>{photo.likes.length} likes</span>
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <img
                  src="/images/comment-overlay.svg"
                  alt="comments"
                  style={{ height: "15px", marginRight: "5px" }}
                />
                <span>{photo.comments.length} comments</span>
              </div>
            </div>
          </div>
          {popup === photo && <Popup photo={popup} setPopup={setPopup} />}
        </React.Fragment>
      ))}
    </div>
  );
};

export default Photos;
