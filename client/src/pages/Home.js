import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Cookie from "universal-cookie";

const Home = () => {
  const cookie = new Cookie();
  const [Customers, setCustomers] = useState([]);
  const [run, setRun] = useState("");

  const id = cookie.get("userId");

  async function deleteCustomer(id) {
    try {
      const res = await axios.delete(
        `${process.env.REACT_APP_BACKEND_API}/api/customers/${id}`
      );
      if (res.status === 200) {
        setRun("deleted was successfully");
      } else {
        setRun("deleted was successfully");
      }
    } catch (err) {
      console.log(err.status);
    }
  }
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BACKEND_API}/api/customers/${id}`).then((res) =>
      res.json().then((data) => setCustomers(data))
    );
  }, [id, run]);

  const showCustomers = Customers.map((Customer, index) => (
    <tr key={index}>
      <td className="id">{index + 1}</td>
      <td className="fullName">
        {Customer.firstName} {Customer.lastName}
      </td>
      <td className="email">{Customer.email}</td>
      <td className="lastUpdate">{Customer.lastUpdated.slice(0, 10)}</td>
      <td className="action">
        <Link to={`/show/${Customer._id}`}>
          <i className="bx bx-show"></i>
        </Link>
        <Link to={`/edit/${Customer._id}`}>
          <i className="bx bx-edit-alt"></i>
        </Link>
        <Link to="/">
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
      {Customers ? (
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
      ) : (
        <h1>No Data available</h1>
      )}
    </div>
  );
};

export default Home;
