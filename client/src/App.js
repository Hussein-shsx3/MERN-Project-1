import React, { useContext, useEffect } from "react";
import SideBar from "./components/sideBar";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "./Context/UserContext";
import axios from "axios";

const App = () => {
  const user = useContext(User);

  const refreshToken = user.auth.refreshToken;
  const Token = async () => {
    try {
      const res = await axios.post("http://localhost:5000/api/token", {
        refreshToken, // Send refreshToken to server
      });
      // Update the access token in context/state
      if (res.data.accessToken) {
        user.setAuth((prevAuth) => ({
          ...prevAuth,
          accessToken: res.data.accessToken,
        }));
      }
    } catch (error) {
      console.error("Failed to refresh token:", error);
      // Handle token refresh failure (e.g., redirect to login page)
    }
  };
  useEffect(() => {
    Token();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="App" id="App">
      {user.auth.accessToken ? (
        <>
          <SideBar />
          <Outlet />
        </>
      ) : (
        <Navigate to="/signIn" />
      )}
    </div>
  );
};

export default App;
