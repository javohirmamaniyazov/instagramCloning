import React, { useEffect, useState } from "react";
import { getSuggestedProfiles } from "services/firebase";
import './style.css'

export const Suggestions = ({ loggedUserDocId, loggedUserId, following }) => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    async function suggestedProfiles() {
      const profiles = await getSuggestedProfiles(loggedUserId, following);
      setProfiles(profiles);
    }

    if (loggedUserDocId) {
      suggestedProfiles();
    }
  }, [loggedUserId]);

  return profiles.length ? (
    <div>
      <h2>Suggestions for you</h2>
      <ul>
        {profiles.map((profile) => (
          <li key={profile.docId}>
            <div>
              <img src={profile.avatar} alt={`${profile.username} avatar`} />
              <div>
                <h3>{profile.username}</h3>
                <p>{profile.fullName}</p>
              </div>
            </div>
            <button>Follow</button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <div>Loading...</div>
  );
};
