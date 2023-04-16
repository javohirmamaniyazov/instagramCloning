import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getUserByUsername } from "services/firebase";
import { UserProfile, Header } from "components";
import * as ROUTES from "constants/routes";

const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const checkIsUserExists = async () => {
      const user = await getUserByUsername(username);
      if (user?.userId) {
        setUser(user);
      } else {
        setError(true);
      }
    };
    checkIsUserExists();
  }, [username, error]);

  useEffect(() => {
    if (username) {
      document.title = username;
    }
  }, [username]);

  return (
    <div>
      <Header />
      {error ? (
        <div style={{ marginTop: "6rem", width: "100%", height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <h1 style={{ fontSize: "25px", fontWeight: 500, marginBottom: "3rem" }}>Sorry, this page isn&apos;t available.</h1>
          <p style={{ fontSize: "16px" }}>
            The link you followed may be broken, or the page may have been removed.
            <Link to={ROUTES.DASHBOARD} style={{ color: "#00376b" }}> Go back to Instagram.</Link>
          </p>
        </div>
      ) : (
        user && <UserProfile user={user} />
      )}
    </div>
  );
};

export default Profile;
