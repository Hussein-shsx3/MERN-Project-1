import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios, { Axios } from "axios";

const SignIn = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [accept, setAccept] = useState(false);

  const [emailError, setEmailError] = useState("");
  axios.defaults.withCredentials = true;
  async function signIn(e) {
    e.preventDefault();
    setAccept(true);
    let flag = true;
    if (Password.length < 8) {
      flag = false;
    } else {
      flag = true;
    }
    try {
      if (flag) {
        let res = await axios.post("http://localhost:5000/api/login", {
          email: Email,
          password: Password,
        });
        if (res.status === 200) {
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
      <form action="" onSubmit={signIn}>
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
        {accept && emailError === 400 && (
          <p className="error">Error in your email or password</p>
        )}
        <button>SignIn</button>
        <div className="swapSign">
          <Link to="/signUp">SignUp</Link>
          <Link to="">Forgot Password?</Link>
        </div>
      </form>
    </div>
  );
};

export default SignIn;
