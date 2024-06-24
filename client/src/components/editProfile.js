import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

const EditProfile = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  const myRef = useRef(null);
  const id = localStorage.getItem("id");

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`).then((res) =>
      res.json().then((data) => {
        setEmail(data.email);
        setName(data.name);
        setImage(data.image);
      })
    );
  }, [id]);

  async function update(e) {
    e.preventDefault();
    try {
      const res = await axios.put(`http://localhost:5000/api/users/${id}`, {
        name: Name,
        email: Email,
        password: Password,
        image: Image,
      });
      if (res.status === 200) {
        localStorage.setItem("active", "activePage1");
        window.location.pathname = "/home";
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="profileC" onSubmit={update}>
      <input
        className="file"
        type="file"
        required
        ref={myRef}
        onChange={(e) => setImage(URL.createObjectURL(e.target.files[0]))}
      />
      <div className="setImage">
        <div className="icon" onClick={() => myRef.current.click()}>
          <i className="bx bxs-camera"></i>
          <h4>click here</h4>
        </div>
        <img src={`${Image}`} alt="" />
      </div>
      <div className="InputC">
        <div className="profileInput">
          <label htmlFor="name">Your Name</label>
          <input
            type="text"
            id="name"
            required
            value={Name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="profileInput">
          <label htmlFor="email">Your Email</label>
          <input
            type="email"
            id="email"
            required
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="profileInput">
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            value={Password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <input type="submit" value="Update Profile" className="submit" />
      </div>
    </form>
  );
};

export default EditProfile;
