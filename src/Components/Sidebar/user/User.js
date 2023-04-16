import { checkImage } from "../../../Helpers/CheckImage";
import React, { memo, useEffect, useState } from "react";
import { Link } from "react-router-dom";

const User = ({ fullName, username }) => {
  const [isImageExist, setIsMageExist] = useState(false);
  useEffect(() => {
    checkImage(`/images/avatars/${username}.jpg`, setIsMageExist);
  }, [username]);
  return username ? (
    <div style="display: grid; grid-template-columns: 1fr 1fr; align-items: center; margin-bottom: 10px;">
      <div style="display: flex; align-items: center;">
        <Link to={`/p/${username}`}>
          {isImageExist ? (
            <img
              src={`/images/avatars/${username}.jpg`}
              style="width: 35px; border-radius: 50%; border: 1px solid lightgrey; margin-right: 15px;"
            />
          ) : (
            <img
              src={"/images/avatars/default.png"}
              style="width: 35px; border-radius: 50%; border: 1px solid lightgrey; margin-right: 15px;"
            />
          )}
        </Link>
        <Link to={`/p/${username}`}>
          <p style="font-weight: 600;">
            {username}
          </p>
          <p style="color: #94a1b9; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; font-size: 14px; line-height: 18px; font-weight: 400; cursor: text;">
            {fullName}
          </p>
        </Link>
      </div>
      <button style="color: #0095f6; justify-self: end; font-size: 12px; font-weight: 600; cursor: pointer; background: none; border: none; padding: 0;">Switch</button>
    </div>
  ) : (
    <div style="display: grid; grid-template-columns: 1fr 1fr; align-items: center; margin-bottom: 10px;">
      <div style="display: flex; align-items: center;">
        <div style="animation: skeleton 1s linear infinite alternate; width: 35px; height: 35px; border-radius: 50%; margin-right: 15px; background-color: #c7d2d8;"></div>
        <div style="display: flex; flex-direction: column;">
          <div style="animation: skeleton 1s linear infinite alternate; min-width: 40px; width: 100%; height: 15px; border-radius: 4px; margin-bottom: 5px; background-color: #c7d2d8;"></div>
          <div style="animation: skeleton 1s linear infinite alternate; min-width: 40px; width: 80%; height: 15px; border-radius: 4px; margin-bottom: 5px; background-color: #c7d2d8;"></div>
        </div>
      </div>
    </div>
  );
};

export default memo(User);
