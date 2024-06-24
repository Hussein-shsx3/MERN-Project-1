import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

import regRoute from "./routes/register.js";
import loginRoute from "./routes/login.js";
import usersRoute from "./routes/usersRoute.js";
import CustomersRoute from "./routes/customer.js";

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/register", regRoute);
app.use("/api/login", loginRoute);
app.use("/api/users", usersRoute);
app.use("/api/customers", CustomersRoute);

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
