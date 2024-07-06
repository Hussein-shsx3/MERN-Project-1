import React, { useContext } from "react";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { app } from "../firebase";
import Cookie from "universal-cookie";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const OAuth = () => {
  const auth = getAuth(app);

  const cookie = new Cookie();
  const userNow = useContext(User);

  const nav = useNavigate();

  const handleGoogleClick = async () => {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    try {
      const resultsFormGoogle = await signInWithPopup(auth, provider);
      const user = resultsFormGoogle.user;
      let res = await axios.post(`${process.env.REACT_APP_BACKEND_API}/api/auth/google`, {
        name: user.displayName,
        email: user.email,
        image: user.photoURL,
      });
      if (res.status === 200 || res.status === 201) {
        const { userDetails, accessToken, refreshToken } = res.data;
        const userId = userDetails._id;
        cookie.set("refreshToken", refreshToken);
        cookie.set("accessToken", accessToken);
        cookie.set("userId", userId);
        userNow.setAuth({ accessToken, refreshToken, userId });
        cookie.set("isVerified", true);
        nav("/");
      }
    } catch (err) {
      console.error("Error during login", err);
    }
  };

  return (
    <button
      type="button"
      className="login-with-google-btn"
      onClick={handleGoogleClick}
    >
      Sign in with Google
    </button>
  );
};

export default OAuth;
