import React from "react";
import SideBar from "./components/sideBar";
import { Outlet } from "react-router-dom";

const App = () => {
  return (
    <div className="App" id="App">
      <SideBar />
      <Outlet />
    </div>
  );
};

export default App;
