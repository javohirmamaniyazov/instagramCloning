import { useUser } from "../../hooks/UsingUser";
import React, { useEffect, useState } from "react";
import { getPhotos } from "../../Services/Firebase";
import PostComp from "./post/PostComp";


const Timeline = () => {
  const { user } = useUser();
  const [photos, setPhotos] = useState();

  useEffect(() => {
    if (user) {
      const getFollowedPhotos = async () => {
        const followedPhotos = await getPhotos(user.following);
        if (user.following.length > 0) {
          setPhotos(followedPhotos);
        }
      };
      getFollowedPhotos();
    }
  }, [user]);

  const skeleton = {
    backgroundColor: "#c7d2d8",
    animation: "skeleton 1s linear infinite alternate",
    width: "100%",
    height: "100%",
    borderRadius: "4px",
    marginBottom: "3rem",
  };

  const skeletonAvatar = {
    backgroundColor: "#c7d2d8",
    animation: "skeleton 1s linear infinite alternate",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    margin: "0 10px 20px 20px",
  };

  const skeletonText = {
    backgroundColor: "#c7d2d8",
    animation: "skeleton 1s linear infinite alternate",
    width: "50px",
    height: "15px",
    borderRadius: "4px",
  };

  const skeletonHeader = {
    display: "flex",
    alignItems: "center",
  };

  return photos && user?.following?.length !== 0 ? (
    <>
      <section style={{ maxWidth: "614px", width: "100%", maxHeight: "600px" }}>
        {photos.map((photo) => (
          <PostComp photo={photo} key={photo.docId}/>
        ))}
      </section>
    </>
  ) : user?.following?.length === 0 ? (
    <section style={{ maxWidth: "614px", width: "100%", maxHeight: "600px" }}>
      <p>You not following anyone.</p>
    </section>
  ) : (
    <section style={{ maxWidth: "614px", width: "100%", maxHeight: "600px" }}>
      {Array(9)
        .fill("")
        .map((_, index) => (
          <React.Fragment key={index}>
            <div style={skeletonHeader}>
              <div style={skeletonAvatar}></div>
              <div style={skeletonText}></div>
            </div>
            <div style={skeleton}></div>
          </React.Fragment>
        ))}
    </section>
  );
};

export default Timeline;
