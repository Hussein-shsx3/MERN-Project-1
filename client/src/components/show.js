import React, { useState, useEffect } from "react";

const Show = () => {
  const customerId = window.location.pathname.split("/").slice(-1).join("");
  const [Customer, setCustomer] = useState(null);
  useEffect(() => {
    fetch(`http://localhost:5000/api/customers/information/${customerId}`).then((res) =>
      res.json().then((data) => setCustomer(data))
    );
  }, [customerId]);
  return (
    <div className="Show">
      <h1>Customer Information</h1>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{Customer && Customer._id ? Customer._id : "Loading..."}</td>
          </tr>
          <tr>
            <th>First Name</th>
            <td>
              {Customer && Customer.firstName
                ? Customer.firstName
                : "Loading..."}
            </td>
          </tr>
          <tr>
            <th>Last Name</th>
            <td>
              {Customer && Customer.lastName ? Customer.lastName : "Loading..."}
            </td>
          </tr>
          <tr>
            <th>Email</th>
            <td>
              {Customer && Customer.email ? Customer.email : "Loading..."}
            </td>
          </tr>
          <tr>
            <th>Telephone</th>
            <td>
              {Customer && Customer.telephone
                ? Customer.telephone
                : "Loading..."}
            </td>
          </tr>
          <tr>
            <th>Gender</th>
            <td>
              {Customer && Customer.gender ? Customer.gender : "Loading..."}
            </td>
          </tr>
          <tr>
            <th>Birthday</th>
            <td>
              {Customer && Customer.birthday
                ? Customer.birthday.slice(0, 10)
                : "Loading..."}
            </td>
          </tr>
          <tr>
            <th>Country</th>
            <td>
              {Customer && Customer.country ? Customer.country : "Loading..."}
            </td>
          </tr>
          <tr>
            <th>Created On</th>
            <td>
              {Customer && Customer.createdOn
                ? Customer.createdOn
                : "Loading..."}
            </td>
          </tr>
          <tr>
            <th>Last Update</th>
            <td>
              {Customer && Customer.lastUpdated
                ? Customer.lastUpdated
                : "Loading..."}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Show;
