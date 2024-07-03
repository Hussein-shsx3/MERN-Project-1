import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";
import Logout from "./logout";
import Cookie from "universal-cookie";

const SideBar = () => {
  const cookie = new Cookie();
  const [swap, setSwap] = useState(false);
  const [checked, setChecked] = React.useState(false);

  const id = cookie.get("userId");

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  function responsive() {
    const sideBar = document.getElementById("sideBar");
    const res = document.getElementById("res");
    if (swap === false) {
      sideBar.classList.add("active");
      res.style.transform = "rotate(180deg)";
      setSwap(true);
    } else {
      sideBar.classList.remove("active");
      res.style.transform = "rotate(0deg)";
      setSwap(false);
    }
  }

  function removeActive() {
    document.getElementById("sideBar").classList.remove("active");
  }

  const [userName, setUserName] = useState(null);
  const [Image, setImage] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`).then((res) =>
      res.json().then((data) => {
        setUserName(data.name);
        setImage(data.image);
      })
    );
  }, [userName, id]);

  return (
    <div className="sideBar" id="sideBar">
      <i
        className="bx bx-chevron-down-circle"
        id="res"
        onClick={responsive}
      ></i>
      <Link to="/profile" className="myAccount" onClick={removeActive}>
        <img src={Image} alt="" />
        <div className="accountInfo">
          <h4>{userName}</h4>
          <h5>Web developer</h5>
        </div>
      </Link>
      <nav>
        <div className="search">
          <i className="bx bx-search"></i>
          <input type="search" placeholder="Search..." />
        </div>
        <Link to="/" onClick={removeActive}>
          <i className="bx bx-group"></i>
          <h4>My Customers</h4>
        </Link>
        <Link to="/addCustomers" onClick={removeActive}>
          <i className="bx bx-user-plus"></i>
          <h4>Add Customer</h4>
        </Link>
      </nav>
      <Logout />
      <div className="darkMode">
        <i className="bx bx-moon"></i>
        <h4>Dark mode</h4>
        <Switch
          checked={checked}
          onChange={handleChange}
          inputProps={{ "aria-label": "controlled" }}
          className="switch"
          onClick={() => {
            document.querySelector("body").classList.toggle("dark");
          }}
        />
      </div>
    </div>
  );
};

export default SideBar;
