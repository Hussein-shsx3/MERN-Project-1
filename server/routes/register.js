import express from "express";
import Users from "../models/Usres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
const router = express.Router();

dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

//* Register
router.post("/", async (req, res, next) => {
  try {
    //* Find user
    const findUser = await Users.findOne({ email: req.body.email });
    if (findUser) {
      return res.status(400).send("User already exists!");
    } else {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const newUser = new Users({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword,
        image: req.body.image,
        isVerified: false,
      });

      await newUser.save();

      const accessToken = jwt.sign(
        { id: newUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "5m",
        }
      );

      const refreshToken = jwt.sign(
        { id: newUser._id },
        process.env.REFRESH_TOKEN_SECRET
      );

      //* send the email verify
      const url = `https://mern-project-1-frontend.onrender.com/verify/${refreshToken}`;
      await transporter.sendMail({
        to: req.body.email,
        subject: "Verify your email",
        html: `<a href="${url}">Click here to verify your email</a>`,
      });

      newUser.refreshToken = refreshToken;
      await newUser.save();
      res.status(201).json({ userDetails: newUser, accessToken, refreshToken });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
