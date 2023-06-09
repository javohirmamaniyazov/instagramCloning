import React from "react";
import { Suggestions } from "./Suggestions/Suggestions";
import User from "./user/User";
import { useUser } from "../../hooks/UsingUser";
import useWindowSize from "../../hooks/UsingWindowSize";

const SidebarSection = () => {
  const { user } = useUser();
  const { width } = useWindowSize();

  return user ? (
    <nav style={{ 
      justifySelf: "flex-end",
      maxWidth: "293px",
      marginTop: "1rem",
      position: "fixed",
      left: `${width / 2 + 167}px`,
    }}>
      <User username={user.username} fullName={user.fullName} />
      <Suggestions
        loggedUserDocId={user.docId}
        loggedUserId={user.userId}
        following={user.following}
      />
    </nav>
  ) : null;
};

export default SidebarSection;
