import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookie from "universal-cookie";

const AddCustomers = () => {
  const cookie = new Cookie();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");
  const [birthday, setBirthDay] = useState("");
  const [telephone, setTelephone] = useState("");

  const id = cookie.get("userId");

  const nav = useNavigate();

  async function addCustomer(e) {
    e.preventDefault();
    try {
      let res = await axios.post("https://mern-project-1-zpur.onrender.com/api/customers", {
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        email: email,
        country: country,
        birthday: birthday,
        telephone: telephone,
        customerOwner: id,
      });
      if (res.status === 201) {
        nav("/");
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="AddCustomers">
      <form action="" onSubmit={addCustomer}>
        <div className="input">
          <label htmlFor="FName">First Name</label>
          <input
            type="text"
            id="FName"
            placeholder="First Name..."
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="LName">Last Name</label>
          <input
            type="text"
            id="LName"
            placeholder="Last Name..."
            required
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            placeholder="Email..."
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="Telephone">Telephone</label>
          <input
            type="tel"
            id="Telephone"
            placeholder="Telephone..."
            required
            onChange={(e) => setTelephone(e.target.value)}
          />
        </div>
        <div className="input">
          <label htmlFor="Birthday">Birthday</label>
          <input
            type="date"
            placeholder="Age..."
            required
            id="Birthday"
            onChange={(e) => setBirthDay(`${e.target.value}`)}
          />
        </div>
        <div className="input">
          <label htmlFor="Country">Country</label>
          <select
            id="country"
            name="country"
            required
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
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
            required
            onChange={(e) => setGender(e.target.value)}
            placeholder="Gender"
          >
            <option value=""></option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
          <input type="submit" value="Submit" className="submit" />
        </div>
      </form>
    </div>
  );
};

export default AddCustomers;
