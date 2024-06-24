import React, { useState, useEffect } from "react";
import { Switch } from "@mui/material";
import { Link } from "react-router-dom";

const SideBar = () => {
  const [swap, setSwap] = useState(false);
  const [checked, setChecked] = React.useState(false);

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

  const [userName, setUserName] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("id");
    fetch(`http://localhost:5000/api/users/${id}`).then((res) =>
      res.json().then((data) => {
        setUserName(data.name);
      })
    );
  }, [userName]);

  return (
    <div className="sideBar" id="sideBar">
      <i
        className="bx bx-chevron-down-circle"
        id="res"
        onClick={responsive}
      ></i>
      <Link to="/home/profile" className="myAccount">
        <img src="./Images/img-1.jpg" alt="" />
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
        <Link to="/home">
          <i className="bx bx-group"></i>
          <h4>My Customers</h4>
        </Link>
        <Link to="/home/addCustomers">
          <i className="bx bx-user-plus"></i>
          <h4>Add Customer</h4>
        </Link>
      </nav>
      <Link to="/" className="logout">
        <i className="bx bx-exit"></i>
        <h4>Logout</h4>
      </Link>
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
