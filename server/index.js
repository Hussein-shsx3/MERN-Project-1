import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import regRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import usersRoute from "./routes/usersRoute.js";
import CustomersRoute from "./routes/customer.js";
import tokenRoute from "./routes/token.js";
import logoutRoute from "./routes/logout.js";
import VerifyEmailRoute from "./routes/verifyEmail.js";
import GoogleAuthRoute from "./routes/googleAuth.js";

const app = express();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());
dotenv.config();

app.use("/api/register", regRoute);
app.use("/api/login", loginRoute);
app.use("/api/users", usersRoute);
app.use("/api/customers", CustomersRoute);
app.use("/api/token", tokenRoute);
app.use("/api/logout", logoutRoute);
app.use("/api/verify", VerifyEmailRoute);
app.use("/api/auth/google", GoogleAuthRoute);

//* for this error popup.ts:302 Cross-Origin-Opener-Policy policy would block the window.closed call.
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin-allow-popups");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});

app.use((err, req, res, next) => {
  const statusCode = 500;
  const message = err.message || "Internal Server Error";
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});

mongoose
  .connect(process.env.MONGODB)
  .then(() => {
    console.log("App connected to database");
    //* http://localhost:5000
    app.listen(process.env.PORT, () => {
      console.log(`App is listening to port: ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
