/* eslint-disable no-unused-vars */
import React from "react";
import { Suggestions } from "./Suggestions/Suggestions";
import User from "./user/User";
import styled from "styled-components";
import { useUser } from "hooks/use-user";
import { useWindowSize } from "hooks/useWindowSize";

export const Sidebar = () => {
    const { user } = useUser();
    const { width } = useWindowSize();

    return user ? (
        <Container width={width}>
            <User username={user.username} fullName={user.fullName} />
            <Suggestions
                loggedUserDocId={user.docId}
                loggedUserId={user.userId}
                following={user.following}
            />
        </Container>
    ) : null;
};

const Container = styled.nav(({ width }) => ({
    justifySelf: "flex-end",
    maxWidth: "293px",
    marginTop: "1rem",
    position: "fixed",
    left: `${width / 2 + 167}px`,
}));
