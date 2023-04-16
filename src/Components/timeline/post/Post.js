import React from "react";
import { useUser } from "hooks/use-user";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Comment } from "./Comment";
import './style.css';

export const Post = ({ photo }) => {
    const { user } = useUser();

    const { imageSrc, caption, comments, username, likes, userLikedPhoto, docId, dateCreated } = photo;

    if (!user) {
        return null;
    }

    return (
        <div className="post-container">
            <Header username={username} />
            <img src={imageSrc} alt={`${username}'s post content`} className="post-image" />
            <Footer
                userId={user.userId}
                docId={docId}
                caption={caption}
                totalLikes={likes.length}
                userLikedPhoto={userLikedPhoto}
                username={username}
            >
                <Comment
                    dateCreated={dateCreated}
                    comments={comments}
                    docId={docId}
                    username={user.username}
                />
            </Footer>
        </div>
    );
};
