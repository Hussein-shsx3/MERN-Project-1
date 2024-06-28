import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import { User } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [Name, setName] = useState("");
  const [Image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const myRef = useRef(null);

  const userNow = useContext(User);
  const id = userNow.auth.userDetails._id;

  const nav = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:5000/api/users/${id}`).then((res) =>
      res.json().then((data) => {
        setEmail(data.email);
        setName(data.name);
        setImage(data.image);
      })
    );
  }, [id]);

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

  async function update(e) {
    e.preventDefault();
    try {
      const imgUrl = await uploadFile();
      const res = await axios.put(`http://localhost:5000/api/users/${id}`, {
        name: Name,
        email: Email,
        password: Password,
        image: imgUrl,
      });
      if (res.status === 200) {
        localStorage.setItem("active", "activePage1");
        nav("/")
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <form className="ProfileEdit" onSubmit={update}>
      <input
        className="file"
        type="file"
        ref={myRef}
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
        <img src={imageUrl ? imageUrl : Image} alt="" />
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
