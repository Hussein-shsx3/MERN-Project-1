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
import "./css/profile.css";
import "./css/verify.css";
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
import UserProvider from "./Context/UserContext";
import Verify from "./pages/verify";
import "./css/loading.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/edit/:id",
        element: <Edit />,
      },
      {
        path: "/show/:id",
        element: <Show />,
      },
      {
        path: "/addCustomers",
        element: <AddCustomers />,
      },
      {
        path: "/profile",
        element: <Profile />,
        children: [
          {
            path: "/profile",
            element: <ProfileInfo />,
          },
          {
            path: "/profile/editProfile",
            element: <EditProfile />,
          },
        ],
      },
    ],
  },
  {
    path: "/signIn",
    element: <SignIn />,
  },
  {
    path: "/verify/:token",
    element: <Verify />,
  },
  {
    path: "/signUp",
    element: <SignUp />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <UserProvider>
      <RouterProvider router={router} />
    </UserProvider>
  </React.StrictMode>
);
