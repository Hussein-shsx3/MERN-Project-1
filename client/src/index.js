import React from "react";
import ReactDOM from "react-dom/client";
import "./css/addCusromers.css";
import "./css/App.css";
import "./css/edit.css";
import "./css/form.css";
import "./css/header.css";
import "./css/Home.css";
import "./css/sideBar.css";
import "./css/show.css";
import "./css/sign.css";
import "./css/editProfile.css";
import SignIn from "./pages/signIn";
import SignUp from "./pages/signUp";
import App from "./App";
import Home from "./pages/Home";
import AddCustomers from "./pages/addCustomers";
import Edit from "./components/edit";
import Show from "./components/show";
import Profile from "./pages/profile";
import ProfileInfo from "./components/profileInfo";
import EditProfile from "./components/editProfile";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/home",
    element: <App />,
    children: [
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/home/edit/:id",
        element: <Edit />,
      },
      {
        path: "/home/show/:id",
        element: <Show />,
      },
      {
        path: "/home/addCustomers",
        element: <AddCustomers />,
      },
      {
        path: "/home/profile",
        element: <Profile />,
        children: [
          {
            path: "/home/profile/hi",
            element: <ProfileInfo />,
          },
          {
            path: "/home/profile/",
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "/",
    element: <SignIn />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
