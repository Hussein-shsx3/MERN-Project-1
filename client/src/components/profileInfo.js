import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { User } from "../Context/UserContext";

const ProfileInfo = () => {
  const [user, setUser] = useState("");

  const userNow = useContext(User);
  const id = userNow.auth.userDetails._id;

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`).then((res) =>
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
