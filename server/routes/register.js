import express from "express";
import Users from "../models/Usres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

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
      });
      const accessToken = jwt.sign(
        { id: newUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "15m",
        }
      );
      const refreshToken = jwt.sign(
        { id: newUser._id },
        process.env.REFRESH_TOKEN_SECRET,
        {
          expiresIn: "7d",
        }
      );
      findUser.refreshToken = refreshToken;
      await newUser.save();
      res.status(201).json({ userDetails: newUser, accessToken, refreshToken });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
