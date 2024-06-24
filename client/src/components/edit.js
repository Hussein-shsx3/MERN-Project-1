import React, { useState, useEffect } from "react";
import axios from "axios";

const Edit = () => {
  const customerId = window.location.pathname.split("/").slice(-1).join("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [telephone, setTelephone] = useState("");
  const [run, setRun] = useState("");

  useEffect(() => {
    fetch(`http://localhost:5000/api/customers/${customerId}`).then((res) =>
      res.json().then((data) => {
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setGender(data.gender);
        setEmail(data.email);
        setCountry(data.country);
        setBirthDay(data.birthday);
        setTelephone(data.telephone);
      })
    );
  }, [customerId]);
  async function update(e) {
    e.preventDefault();
    try {
      const res = await axios.put(
        `http://localhost:5000/api/customers/${customerId}`,
        {
          firstName: firstName,
          lastName: lastName,
          gender: gender,
          email: email,
          country: country,
          birthday: birthday,
          telephone: telephone,
        }
      );
      if (res.status === 200) {
        localStorage.setItem("active", "activePage1");
        window.location.pathname = "/";
      }
    } catch (err) {
      console.log(err);
    }
  }
  async function deleteCustomer() {
    try {
      const res = await axios.delete(
        `http://localhost:5000/api/customers/${customerId}`
      );
      if (res.status === 200) {
        setRun("deleted was successfully");
        window.location.pathname = "/home";
        console.log(run);
      }
    } catch {
      console.log("none");
    }
  }
  return (
    <div className="Edit">
      <form action="" onSubmit={update}>
        <div className="input">
          <label htmlFor="FName">First Name</label>
          <input
            type="text"
            id="FName"
            value={firstName}
            placeholder="First Name..."
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="LName">Last Name</label>
          <input
            type="text"
            id="LName"
            value={lastName}
            placeholder="Last Name..."
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            value={email}
            placeholder="Email..."
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="Telephone">Telephone</label>
          <input
            type="tel"
            id="Telephone"
            value={telephone}
            placeholder="Telephone..."
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="Age">Birth Day</label>
          <input
            type="date"
            value={birthday.slice(0, 10)}
            placeholder="Age..."
            onChange={(e) => setBirthDay(`${e.target.value}`)}
          />
        </div>
        <div className="input">
          <label htmlFor="Country">Country</label>
          <select
            id="country"
            name="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          >
            <option value=""></option>
            <option value="United States">United States</option>
            <option value="Canada">Canada</option>
            <option value="United Kingdom">United Kingdom</option>
          </select>
        </div>
        <div className="input">
          <label htmlFor="Gender">Gender</label>
          <select
            name="Gender"
            id="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>
        <div className="buttons">
          <input
            type="submit"
            value="Update"
            className="Update"
            onClick={update}
          />
          <input
            type="button"
            value="Delete"
            className="Delete"
            onClick={deleteCustomer}
          />
        </div>
      </form>
    </div>
  );
};

export default Edit;
