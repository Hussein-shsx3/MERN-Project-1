import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProfileInfo = () => {
  const [user, setUser] = useState("");

  useEffect(() => {
    const id = localStorage.getItem("id");
    fetch(`http://localhost:5000/api/users/${id}`).then((res) =>
      res.json().then((data) => setUser(data))
    );
  }, [user]);
  return (
    <div className="ProfileInfo">
      <img src={user.image} alt="" />
      <h2>{user.name}</h2>
      <Link to="/home/profile/editProfile">Edit Profile</Link>
    </div>
  );
};

export default ProfileInfo;
