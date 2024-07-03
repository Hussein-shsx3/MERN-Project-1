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
      const accessToken = jwt.sign(
        { id: findUser._id },
        process.env.ACCESS_TOKEN_SECRET,
        {
          expiresIn: "5m",
        }
      );
      const refreshToken = jwt.sign(
        { id: findUser._id },
        process.env.REFRESH_TOKEN_SECRET
      );
      res.clearCookie('accessToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
      });
      res.clearCookie('refreshToken', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'Strict'
      });
      findUser.refreshToken = refreshToken;
      await findUser.save();
      res
        .status(200)
        .json({ userDetails: findUser, accessToken, refreshToken });
    } else {
      res.status(400).send("Wrong email or password!");
    }
  } catch (err) {
    next(err);
  }
});

export default router;
