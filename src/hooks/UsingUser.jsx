import { FirebaseAuthContext } from "../Context/AuthContext";
import { useState, useEffect, useContext } from "react";
import { getUserById } from "../Services/Firebase";

export const useUser = () => {
  const [activeUser, setActiveUser] = useState({});
  const authUser = useContext(FirebaseAuthContext);

  useEffect(() => {
    const getUserObjByUserId = async () => {
      if (authUser && authUser.uid) {
        const [user] = await getUserById(authUser.uid);
        setActiveUser(user);
      }
    };
    getUserObjByUserId();
  }, [authUser]);

  return { user: activeUser, setActiveUser };
};
