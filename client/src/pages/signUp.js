import React, { useState, useRef, useContext } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { User } from "../Context/UserContext";
import Cookie from "universal-cookie";
import OAuth from "../components/OAuth";

const SignUp = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  const [accept, setAccept] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const userNow = useContext(User);

  const cookie = new Cookie();

  const myRef = useRef(null);

  const [emailError, setEmailError] = useState("");
  const [verifyEmail, setVerifyEmail] = useState(false);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    setLoading(true);
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
      return secure_url;
    } catch (err) {
      setLoading(false);
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
        const imgUrl = await uploadFile();
        let res = await axios.post("https://mern-project-1-cr1m.onrender.com/api/register", {
          name: Name,
          email: Email,
          password: Password,
          image: imgUrl,
        });
        if (res.status === 201) {
          const userId = res.data.userDetails._id;
          const accessToken = res.data.accessToken;
          const refreshToken = res.data.refreshToken;
          cookie.set("refreshToken", refreshToken);
          cookie.set("userId", userId);
          userNow.setAuth({ accessToken, refreshToken, userId });
          setLoading(false);
          setVerifyEmail(true);
        }
      }
    } catch (err) {
      setLoading(false);
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
      {verifyEmail ? (
        <p className="success">
          A verification request has been sent to your Gmail
        </p>
      ) : loading ? (
        <span className="loader"></span>
      ) : (
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
          <OAuth />
          <div className="swapSign">
            <h5>
              I have an account already ? <Link to="/">SignIn</Link>
            </h5>
          </div>
        </form>
      )}
    </div>
  );
};

export default SignUp;
