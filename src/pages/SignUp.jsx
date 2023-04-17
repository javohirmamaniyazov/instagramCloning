import React, { useCallback, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "../Constants/Routes";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { doesUsernameExist } from "../Services/Firebase"
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebase";

const SignUp = () => {
    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const isInvalid = !emailAddress || !password || !fullName || !username;

    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const auth = getAuth();
        setIsSubmitting(true);
        const usernameExists = await doesUsernameExist(username);
        if (!usernameExists) {
            try {
                const createdUserResult = await createUserWithEmailAndPassword(auth, emailAddress, password);
                auth.currentUser && await updateProfile(auth.currentUser, { displayName: username });
                await addDoc(collection(db, "users"), {
                    userId: createdUserResult.user.uid,
                    username: username.toLowerCase(),
                    fullName,
                    emailAddress: emailAddress.toLowerCase(),
                    following: ["2"],
                    followers: [],
                    dateCreated: Date.now(),
                });
                navigate(ROUTES.DASHBOARD);
            } catch (e) {
                setEmailAddress("");
                setPassword("");
                setFullName("");
                setIsSubmitting(false);
                setError(e.message);
            }
        } else {
            setUsername("");
            setIsSubmitting(false);
            setError("This username already exists, please try another.");
        }
    }, [emailAddress, password, fullName, username]);

    return (
        <div style={{ display: "flex", justifyContent: "center",  marginTop: "2.5rem" }}>
            <div style={{ maxWidth: "350px", width: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", marginBottom: "1.5rem" }}>
                    <h1 style={{ fontSize: "1.5rem" }}>Instagram</h1>
                </div>
                <div style={{ backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)", padding: "2rem" }}>
                    <h2 style={{ marginBottom: "1.5rem" }}>Sign up to see photos and videos from your friends.</h2>
                    {error && <p style={{ color: "red" }}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <input
                            type="email"
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                            style={{ padding: "0.5rem", borderRadius: "5px", marginBottom: "1rem" }}
                        />
                        <input
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={({ target }) => setFullName(target.value)}
                            style={{ padding: "0.5rem", borderRadius: "5px", marginBottom: "1rem" }}
                        />
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={({ target }) => setUsername(target.value.toLowerCase())}
                            style={{ padding: "0.5rem", borderRadius: "5px", marginBottom: "1rem" }}
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            style={{ padding: "0.5rem", borderRadius: "5px", marginBottom: "1rem" }}
                        />
                        <button
                            type="submit"
                            disabled={isInvalid || isSubmitting}
                            style={{ backgroundColor: isInvalid || isSubmitting ? "rgba(0, 149, 246, 0.5)" : "#0095f6", color: "white", borderRadius: "5px", padding: "0.5rem", border: "none", width: "100%" }}
                        >
                            {isSubmitting ? "Signing up..." : "Sign up"}
                        </button>
                    </form>
                </div>
                <div style={{ backgroundColor: "white", borderRadius: "5px", boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.25)", padding: "1rem", marginTop: "1rem" }}>
                    <p style={{ textAlign: "center" }}>
                        Have an account? <Link to={ROUTES.LOGIN}>Log in</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignUp;      
