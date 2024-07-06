import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { User } from "./Context/UserContext";
import RefreshToken from "./components/refreshToken";
import SideBar from "./components/sideBar";
import { Outlet } from "react-router-dom";
import Cookie from "universal-cookie";

const App = () => {
  const cookie = new Cookie();
  const refreshToken = cookie.get("refreshToken");
  const isVerified = cookie.get("isVerified");
  const context = useContext(User);
  return (
    <div className="App" id="App">
      {refreshToken && isVerified ? (
        <RefreshToken>
          {context.auth.accessToken ? (
            <>
              <SideBar />
              <Outlet />
            </>
          ) : (
            <Navigate to="/signIn" />
          )}
        </RefreshToken>
      ) : (
        <Navigate to="/signIn" />
      )}
    </div>
  );
};

export default App;
