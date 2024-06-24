import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/Home.css";

const Home = () => {
  const userId = localStorage.getItem("id");
  const [Customers, setCustomers] = useState([]);
  const [run, setRun] = useState("");

  async function deleteCustomer(id) {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/customers/${id}`
      );
      if (res.status === 200) {
        setRun("deleted was successfully");
        console.log(run);
      }
    } catch {
      console.log("none");
    }
  }

  useEffect(() => {
    fetch(`http://localhost:5000/api/customers/${userId}`).then((res) =>
      res.json().then((data) => setCustomers(data))
    );
  }, [userId]);
  const showCustomers = Customers.map((Customer, index) => (
    <tr key={index}>
      <td className="id">{index + 1}</td>
      <td className="fullName">
        {Customer.firstName} {Customer.lastName}
      </td>
      <td className="email">{Customer.email}</td>
      <td className="lastUpdate">{Customer.lastUpdated.slice(0, 10)}</td>
      <td className="action">
        <Link to={`/home/show/${Customer._id}`}>
          <i className="bx bx-show"></i>
        </Link>
        <Link to={`/home/edit/${Customer._id}`}>
          <i className="bx bx-edit-alt"></i>
        </Link>
        <Link to=".">
          <i
            className="bx bx-trash"
            onClick={() => deleteCustomer(Customer._id)}
          ></i>
        </Link>
      </td>
    </tr>
  ));
  return (
    <div className="Home">
      <table>
        <tbody>
          <tr>
            <th className="id">#</th>
            <th className="fullName">Full Name</th>
            <th className="email">Email</th>
            <th className="lastUpdate">Last Update</th>
            <th className="action">Action</th>
          </tr>
          {showCustomers}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
