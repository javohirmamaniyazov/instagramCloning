import { useUser } from "../../hooks/UsingUser"
import React, { useEffect, useState } from "react"
import { getUserByUserId } from "../../Services/Firebase"
import  Header  from "./Header"
import Photos  from "./Photos"

const UserProfile = ({ user: { followers, following, fullName, username, userId, docId } }) => {
  const [photosCollection, setPhotosCollection] = useState([]);
  const { user } = useUser()

  useEffect(() => {
    getUserByUserId(userId)
      .then((photos) => {
        setPhotosCollection(photos)
      })
      .catch((error) => {
        console.log(error.message)
      })
  }, [username])

  if (!username || !photosCollection) {
    return null
  }

  return (
    <div>
      <Header
        photosQuantity={photosCollection.length}
        followers={followers}
        following={following}
        fullName={fullName}
        username={username}
        userId={userId}
        docId={docId}
      />

      {photosCollection.length === 0 && username === user.username ? (
        <div>
          <img src="/images/misc/collage.jpg" alt="collage" />
          <div>
            <span>Start capturing and sharing your moments.</span>
            <p>Get the app to share your first photo or video.</p>
            <div>
              <img src="/images/icons/apple.png" alt="apple" />
              <img src="/images/icons/google-play.png" alt="google play" />
            </div>
          </div>
        </div>
      ) : photosCollection.length === 0 ? (
        <div style={{ flexDirection: "column", alignItems: "center" }}>
          <img
            style={{ width: "30px", height: "30px", margin: "40px" }}
            src="/images/icons/camera-icon.png"
            alt="camera icon"
          />
          <h1 style={{ fontWeight: "300" }}>No post yet</h1>
        </div>
      ) : (
        <Photos photosCollection={photosCollection} />
      )}

      
    </div>
  )
}

export default UserProfile;
