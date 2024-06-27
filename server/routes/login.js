import express from "express";
import Users from "../models/Usres.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

//* Login
router.post("/", async (req, res, next) => {
  try {
    //* Find user
    const findUser = await Users.findOne({ email: req.body.email });
    if (!findUser) {
      return res.status(400).send("User not found!");
    }
    const passwordMatch = await bcrypt.compare(
      req.body.password,
      findUser.password
    );
    if (passwordMatch) {
      const token = jwt.sign({ userId: findUser._id }, process.env.KEY, {
        expiresIn: "1h",
      });
      res.status(200).json({ user: findUser, token: token });
    } else {
      res.status(400).send("Wrong email or password!");
    }
  } catch (err) {
    next(err);
  }
});

export default router;
