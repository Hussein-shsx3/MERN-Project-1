import React from "react";
import "./css/App.css";
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
