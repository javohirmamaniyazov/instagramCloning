import React, { FormEvent, useCallback, useState } from "react";
import { Form } from "components";
import { Link, useNavigate } from "react-router-dom";
import * as ROUTES from "constants/routes";
import { createUserWithEmailAndPassword, getAuth, updateProfile } from "firebase/auth";
import { doesUsernameExist } from "services/firebase";
import { addDoc, collection } from "firebase/firestore";
import { db } from "firebase/firebase";

const SignUp = () => {
    const [fullName, setfullName] = useState("");
    const [username, setUsername] = useState("");
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isSubmiting, setIsSubmiting] = useState(false);
    const isInvalid = emailAddress === "" || password === "" || fullName === "" || username === "";

    const navigate = useNavigate();

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        const auth = getAuth();
        setIsSubmiting(true);
        const usernameExist = await doesUsernameExist(username);
        if (!usernameExist) {
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
                setfullName("");
                setIsSubmiting(false);
                setError(e.message);
            }
        } else {
            setUsername("");
            setIsSubmiting(false);
            setError("This username already exist, please try another.");
        }
    }, [emailAddress, password]);

    return (
        <div style={{ display: "flex", justifyContent: "center", width: "100vw", height: "100vh", marginTop: "2.5rem" }}>
            <Form>
                <Form.Wrapper>
                    <Form.Base onSubmit={handleSubmit}>
                        <Form.Logo />
                        <Form.Text>Sign up to see photos and videos from your friends.</Form.Text>
                        <Form.Button>Log in with Facebook</Form.Button>
                        <Form.Divider />
                        <Form.Input
                            type="email"
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) => setEmailAddress(target.value)}
                        />
                        <Form.Input
                            type="text"
                            placeholder="Full name"
                            value={fullName}
                            onChange={({ target }) => setfullName(target.value)}
                        />
                        <Form.Input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                        <Form.Input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        {error && <Form.Error>{error}</Form.Error>}
                        <Form.Button disabled={isInvalid} type="submit">
                            {isSubmiting ? "Submiting..." : "Sign Up"}
                        </Form.Button>
                        <Form.SmallText>
                            By signing up, you agree to our <span>Terms, Data Policy and Cookie Policy.</span>
                        </Form.SmallText>
                    </Form.Base>
                </Form.Wrapper>
                <Form.LoginSignupRedirect>
                    Have an account?
                    <Link to={ROUTES.LOGIN}>Log in
                    </Link>
                </Form.LoginSignupRedirect>
            </Form>
        </div>
    );
};
export default SignUp;