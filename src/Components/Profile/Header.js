import { useUser } from "hooks/use-user"
import React, { useEffect, useState } from "react"
import './style.css';
import { updateFollowedUserFollowing, updateLoggedUserFollowing } from "services/firebase"

function ProfileHeader(props) {
    const { followers, following, fullName, username, photosQuantity, docId, userId } = props
    const { user } = useUser()

    const initialIsFollowing = user?.following?.includes(userId)
    const initialIsFollowers = followers.includes(user.userId)

    const [isFollowing, setIsFollowing] = useState(initialIsFollowing)
    const [isFollowers, setIsFollowers] = useState(initialIsFollowers)
    const [followersQuantity, setFollowersQuantity] = useState(followers.length)

    const toggleFollowing = async () => {
        await updateLoggedUserFollowing(user.docId, userId, isFollowing)
        await updateFollowedUserFollowing(user.userId, docId, isFollowers)
        setIsFollowing(!isFollowing)
        setIsFollowers(!isFollowers)
        setFollowersQuantity((followersQuantity) =>
            isFollowing ? followersQuantity - 1 : followersQuantity + 1
        )
    }

    useEffect(() => {
        setIsFollowing(initialIsFollowing)
        setIsFollowers(initialIsFollowers)
    }, [initialIsFollowing, initialIsFollowers])

    return (
        <div className="header-container">
            <img className="avatar" src={`/images/avatars/${username}.jpg`} />
            <div className="profile-info">
                {userId !== user.userId ? (
                    <div className="top">
                        <p>{username}</p>
                        {isFollowing ? (
                            <button onClick={toggleFollowing}>Unfollow</button>
                        ) : (
                            <button onClick={toggleFollowing}>Follow</button>
                        )}
                    </div>
                ) : (
                    <div className="top">
                        <p>{username}</p>
                        <button>Edit Profile</button>
                    </div>
                )}
                <ul className="statistics">
                    <li>
                        <span>{photosQuantity}</span> posts
                    </li>
                    <li>
                        <span>{followersQuantity}</span> followers
                    </li>
                    <li>
                        <span>{following.length}</span> following
                    </li>
                </ul>
                <p className="full-name">{fullName}</p>
            </div>
        </div>
    )
}

export default ProfileHeader;
