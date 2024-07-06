import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookie from "universal-cookie";

const ProfileInfo = () => {
  const cookie = new Cookie();
  const [user, setUser] = useState("");

  const id = cookie.get("userId");

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/api/users/${id}`).then((res) =>
      res.json().then((data) => setUser(data))
    );
  }, [user, id]);
  return (
    <div className="ProfileInfo">
      <img src={user.image} alt="" />
      <h2>{user.name}</h2>
      <Link to="/profile/editProfile">Edit Profile</Link>
    </div>
  );
};

export default ProfileInfo;
