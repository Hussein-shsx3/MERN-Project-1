import React, { useContext } from "react";
import SideBar from "./components/sideBar";
import { Navigate, Outlet } from "react-router-dom";
import { User } from "./Context/UserContext";

const App = () => {
  const user = useContext(User);
  return (
    <div className="App" id="App">
      {user.auth.token ? (
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
