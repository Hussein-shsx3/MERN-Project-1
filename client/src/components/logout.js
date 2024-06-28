import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../Context/UserContext";

const Logout = () => {
  const userNow = useContext(User);
  const refreshToken = userNow.auth.refreshToken;
  const nav = useNavigate();
  const handleLogout = async () => {
    try {
      let res = await axios.post("http://localhost:5000/api/logout", {
        refreshToken,
      });
      if (res.status === 200) {
        userNow.setAuth(null);
        nav("/signIn");
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };
  return (
    <Link className="logout" onClick={handleLogout}>
      <i className="bx bx-exit"></i>
      <h4>Logout</h4>
    </Link>
  );
};

export default Logout;
