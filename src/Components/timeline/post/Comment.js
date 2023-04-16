import { format, formatDistance } from "date-fns";
import { updateComments } from "../../../Services/Firebase";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import './style.css';

export const Comment = ({ comments: allComments, docId, username, dateCreated, popup }) => {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(allComments);
  const isDisabled = comment === "";

  const handleComments = async (e) => {
    e.preventDefault();
    if (username) {
      await updateComments(username, comment, docId);
      setComments([...comments, { comment, displayName: username }]);
      setComment("");
    }
  };

  return !popup ? (
    <>
      <button onClick={() => setShowComments(!showComments)}>
        View all {comments.length} comments
      </button>
      <p>{formatDistance(dateCreated, new Date())} ago</p>
      {showComments && (
        <div>
          {comments.map((comment, index) => (
            <div key={index}>
              <Link to={`/p/${comment.displayName}`}>
                <p>{comment.displayName}</p>
              </Link>
              <p>{comment.comment}</p>
            </div>
          ))}
        </div>
      )}
      <form onSubmit={handleComments}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button disabled={isDisabled} type="submit">
          Post
        </button>
      </form>
    </>
  ) : (
    <>
      <p style={{ marginLeft: "15px" }}>{format(dateCreated, "MMMM dd")}</p>
      <form onSubmit={handleComments}>
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a comment..."
        />
        <button disabled={isDisabled} type="submit">
          Post
        </button>
      </form>
    </>
  );
};
