import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../Context/UserContext";
import Cookie from "universal-cookie";

const Logout = () => {
  const cookie = new Cookie();
  const userNow = useContext(User);
  const refreshToken = cookie.get("refreshToken");
  const nav = useNavigate();
  const handleLogout = async () => {
    try {
      let res = await axios.post("http://localhost:5000/api/logout", {
        refreshToken,
      });
      if (res.status === 200) {
        userNow.setAuth(null);
        cookie.remove("refreshToken");
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
