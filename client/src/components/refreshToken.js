import React, { useContext, useEffect, useState } from "react";
import { User } from "../Context/UserContext";
import axios from "axios";
import LoadingScreen from "./loadingScreen";
import Cookie from "universal-cookie";

const RefreshToken = ({ children }) => {
  const cookie = new Cookie();
  const context = useContext(User);
  const refreshToken = cookie.get("refreshToken");
  const accessToken = context.auth.accessToken;

  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    try {
      const res = await axios.post("https://mern-project-1-zpur.onrender.com/api/token", {
        refreshToken: refreshToken, // Send refreshToken to server
      });
      // Update the access token in context/state
      if (res.data.refreshToken) {
        context.setAuth((prevAuth) => ({
          ...prevAuth,
          accessToken: res.data.accessToken,
        }));
      } else {
        console.error("No access token in response"); // Debugging line
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Handle token refresh failure (e.g., redirect to login page)
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (!accessToken && refreshToken) {
      refresh();
    } else {
      setLoading(false);
    }
  },[]);

  return loading ? <LoadingScreen /> : children;
};

export default RefreshToken;
