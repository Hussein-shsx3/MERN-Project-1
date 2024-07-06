import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Cookie from "universal-cookie";

const Verify = () => {
  const { token } = useParams();
  const nav = useNavigate();
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    const cookie = new Cookie();
    // تعريف دالة غير متزامنة داخل useEffect
    const verifyEmail = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_API}/api/verify/${token}`
        );
        if (response.status === 200) {
          cookie.set("isVerified", true);
          nav("/signIn");
        } else {
          setMessage("Verification failed. Please try again.");
        }
      } catch (err) {
        console.error("Error verifying email:", err);
        setMessage(
          "An error occurred while verifying your email. Please try again."
        );
      }
    };
    verifyEmail();
  }, [token, nav]);
  console.log(message);
  return (
    <div className="Verify">
      <i className="bx bx-user-check"></i>
      <h2>Your email address has been successfully verifed</h2>
    </div>
  );
};

export default Verify;
