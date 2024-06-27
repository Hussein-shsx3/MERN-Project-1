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
      await newUser.save();
      const token = jwt.sign({ userId: newUser._id }, process.env.KEY, {
        expiresIn: "1h",
      });
      res.status(201).json({ user: newUser, token: token });
    }
  } catch (err) {
    next(err);
  }
});

export default router;
