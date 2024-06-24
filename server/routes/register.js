import express from "express";
import Users from "../models/Usres.js";
import bcrypt from "bcrypt";

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
      res.status(201).json(newUser);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
