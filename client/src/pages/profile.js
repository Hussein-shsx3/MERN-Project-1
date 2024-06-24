import React from "react";
import { Outlet } from "react-router-dom";

const Profile = () => {
  return (
    <div className="Profile">
      <Outlet />
    </div>
  );
};

export default Profile;
