import { db } from "../firebase/firebase"
import {
    collection,
    query,
    where,
    getDocs,
    updateDoc,
    doc,
    arrayUnion,
    arrayRemove,
} from "firebase/firestore"

export const doesUsernameExist = async (username) => {
    const q = query(collection(db, "users"), where("username", "==", username))
    const querySnapshot = await getDocs(q)

    return querySnapshot.docs.length > 0
}

export const getUserById = async (userId) => {
    const q = query(collection(db, "users"), where("userId", "==", userId))
    const querySnapshot = await getDocs(q)
    const loggedUser = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
    }))

    return loggedUser
}

export const getSuggestedProfiles = async (docId, following) => {
    const q = query(collection(db, "users"), where("userId", "!=", docId))
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs
        .map((doc) => ({
            ...doc.data(),
            docId: doc.id,
        }))
        .filter((profile) => !following.includes(profile.userId))
}

export const updateLoggedUserProfile = async (
    userId,
    username,
    fullName,
    emailAddress,
    password
) => {
    const loggedUserRef = doc(db, "users", userId)
    await updateDoc(loggedUserRef, {
        username,
        fullName,
        emailAddress,
        password,
    })
}

export const updateLoggedUserFollowing = async (
    loggedUserDocId,
    profileId,
    isFollowing
) => {
    const loggedUserRef = doc(db, "users", loggedUserDocId)
    !isFollowing
        ? await updateDoc(loggedUserRef, {
            following: arrayUnion(profileId),
        }).then(() => console.log("add to following"))
        : await updateDoc(loggedUserRef, {
            following: arrayRemove(profileId),
        }).then(() => console.log("remove from following"))
}

export const updateFollowedUserFollowing = async (
    loggedUserId,
    profileDocId,
    isFollowers
) => {
    const loggedUserRef = doc(db, "users", profileDocId)
    !isFollowers
        ? await updateDoc(loggedUserRef, {
            followers: arrayUnion(loggedUserId),
        }).then(() => console.log("add to followers"))
        : await updateDoc(loggedUserRef, {
            followers: arrayRemove(loggedUserId),
        }).then(() => console.log("remove from followers"))
}

export const getPhotos = async (following) => {
    const q = query(collection(db, "photos"), where("userId", "in", following))
    const querySnapshot = await getDocs(q)
    const userFollowedPhotos = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id,
    }))

    const photosWithUserDetails = await Promise.all(
        userFollowedPhotos.map(async (photo) => {
            const user = await getUserById(photo.userId)

            const { username } = user[0]

            return { username, ...photo }
        })
    )

    return photosWithUserDetails
}

export const updateLike = async (
    userId,
    docId,
    toggleLike
) => {
    const loggedUserRef = doc(db, "photos", docId)
    await updateDoc(loggedUserRef, {
        likes: toggleLike ? arrayUnion(userId) : arrayRemove(userId)
    })
}

export const getUserPhotosByUsername = async (username) => {
    const [user] = await getDocs(
        query(collection(db, "users"), where("username", "==", username))
    ).then((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    )
    const photos = await getDocs(
        query(collection(db, "photos"), where("userId", "==", user.userId))
    ).then((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    )

    return { user, photos }
}

export const getUserByUserId = async (userId) => {
    const [user] = await getDocs(
        query(collection(db, "users"), where("userId", "==", userId))
    ).then((querySnapshot) =>
        querySnapshot.docs.map((doc) => ({ ...doc.data(), docId: doc.id }))
    )
    return user
}

export const updateComments = async (displayName, comment, docId) => {
    const loggedUserRef = doc(db, "photos", docId);
    await updateDoc(loggedUserRef, {
        comments: arrayUnion({ comment, displayName }),
    });
}


