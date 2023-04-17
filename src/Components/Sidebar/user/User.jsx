import React, { memo } from "react";
import { Link } from "react-router-dom";

const User = ({ fullName, username }) => {
  return username ? (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <Link to={`/p/${username}`}>
          <img
            src={`/images/avatars/${username}.jpg`}
            style={{ width: "35px", borderRadius: "50%", border: "1px solid lightgrey", marginRight: "15px" }}
          />
        </Link>
        <Link to={`/p/${username}`}>
          <p style={{ fontWeight: 600 }}>{username}</p>
          <p style={{ color: "#94a1b9", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontSize: "14px", lineHeight: "18px", fontWeight: 400, cursor: "text" }}>
            {fullName}
          </p>
        </Link>
      </div>
      <button style={{ color: "#0095f6", justifySelf: "end", fontSize: "12px", fontWeight: 600, cursor: "pointer", background: "none", border: "none", padding: "0" }}>Switch</button>
    </div>
  ) : (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", alignItems: "center", marginBottom: "10px" }}>
      <div style={{ display: "flex", alignItems: "center" }}>
        <div style={{ animation: "skeleton 1s linear infinite alternate", width: "35px", height: "35px", borderRadius: "50%", marginRight: "15px", backgroundColor: "#c7d2d8" }}></div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ animation: "skeleton 1s linear infinite alternate", minWidth: "40px", width: "100%", height: "15px", borderRadius: "4px", marginBottom: "5px", backgroundColor: "#c7d2d8" }}></div>
          <div style={{ animation: "skeleton 1s linear infinite alternate", minWidth: "40px", width: "80%", height: "15px", borderRadius: "4px", marginBottom: "5px", backgroundColor: "#c7d2d8" }}></div>
        </div>
      </div>
    </div>
  );
};

export default memo(User);
