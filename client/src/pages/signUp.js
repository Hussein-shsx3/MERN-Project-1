import React, { useState, useRef, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { User } from "../Context/UserContext";

const SignUp = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  const [accept, setAccept] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const userNow = useContext(User);
  console.log(userNow);
  const nav = useNavigate();
  const myRef = useRef(null);

  const [emailError, setEmailError] = useState("");

  const uploadFile = async () => {
    const data = new FormData();
    data.append("file", Image);
    data.append("upload_preset", "images_preset");
    try {
      let cloudName = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
      let resourceType = "image";
      const response = await axios.post(
        `https://api.cloudinary.com/v1_1/${cloudName}/${resourceType}/upload`,
        data
      );
      const secure_url = response.data.secure_url;
      console.log(secure_url);
      return secure_url;
    } catch (err) {
      console.log(err);
    }
  };

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
        console.log("1");
        const imgUrl = await uploadFile();
        console.log("2");
        let res = await axios.post("http://localhost:5000/api/register", {
          name: Name,
          email: Email,
          password: Password,
          image: imgUrl,
        });
        if (res.status === 201) {
          const userDetails = res.data.user;
          const token = res.data.token;
          userNow.setAuth({ token, userDetails });
          nav("/home");
        }
      }
    } catch (err) {
      if (err.response) {
        setEmailError(err.response.status);
      } else {
        console.log("An error occurred:", err.message);
      }
      console.log(err);
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
            setImage(e.target.files[0]);
            setImageUrl(URL.createObjectURL(e.target.files[0]));
          }}
        />
        <div className="setImage">
          <div className="icon" onClick={() => myRef.current.click()}>
            <i className="bx bxs-camera"></i>
            <h4>click here</h4>
          </div>
          {imageUrl && <img src={imageUrl} alt="" />}
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
            I have an account already ? <Link to="/">SignIn</Link>
          </h5>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
