import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SignUp = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  const [accept, setAccept] = useState(false);

  const myRef = useRef(null);

  const [emailError, setEmailError] = useState("");
  async function signUp(e) {
    e.preventDefault();
    setAccept(true);
    let flag = true;
    if (Password.length < 8 || Image.length <= 0) {
      flag = false;
    } else {
      flag = true;
    }
    try {
      if (flag) {
        let res = await axios.post("http://localhost:5000/api/register", {
          name: Name,
          email: Email,
          password: Password,
          image: Image,
        });
        if (res.status === 201) {
          localStorage.setItem("id", res.data._id);
          window.location.pathname = "/home";
        }
      }
    } catch (err) {
      setEmailError(err.response.status);
    }
  }
  return (
    <div className="Sign">
      <form action="" onSubmit={signUp}>
        <input
          className="file"
          type="file"
          ref={myRef}
          hidden
          accept="image/*"
          onChange={(e) => {
            setImage(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <div className="setImage">
          <div className="icon" onClick={() => myRef.current.click()}>
            <i className="bx bxs-camera"></i>
            <h4>click here</h4>
          </div>
          <img src={`${Image}`} alt="" />
        </div>
        {accept && Image.length <= 0 && (
          <p className="error">click here to upload image</p>
        )}
        <div className="signInput">
          <h3>Name</h3>
          <div className="signIcon">
            <i className="bx bx-user"></i>
            <input
              type="text"
              required
              placeholder="Your Name..."
              value={Name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
        </div>
        <div className="signInput">
          <h3>Email Address</h3>
          <div className="signIcon">
            <i className="bx bx-envelope"></i>
            <input
              type="email"
              required
              placeholder="Email..."
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
        <div className="signInput">
          <h3>Password</h3>
          <div className="signIcon">
            <i className="bx bx-lock-alt"></i>
            <input
              type="password"
              required
              placeholder="Passwrod..."
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </div>
        {accept && Password.length < 8 && (
          <p className="error">Your password is weak</p>
        )}
        {accept && emailError === 400 && (
          <p className="error">Eamil Is already been taken</p>
        )}
        {accept && emailError === 500 && (
          <p className="error">Error in your email</p>
        )}
        <button>SignUp</button>
        <div className="swapSign">
          <h5>
            I have an account already ? <Link to="/signIn">SignIn</Link>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
