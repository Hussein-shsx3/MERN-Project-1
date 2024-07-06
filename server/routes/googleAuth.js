import express from "express";
import Users from "../models/Usres.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res, next) => {
  try {
    let user;
    // Check if user exists
    const findUser = await Users.findOne({ email: req.body.email });

    if (findUser) {
      // Existing user: update details and generate tokens
      user = findUser;
      user.name = req.body.name;
      user.email = req.body.email;
    } else {
      // New user: create and save, then generate tokens
      user = new Users({
        name: req.body.name,
        email: req.body.email,
        image: req.body.image,
        isVerified: true,
      });
      await user.save();
    }

    const accessToken = jwt.sign(
      { id: user._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "5m",
      }
    );

    const refreshToken = jwt.sign(
      { id: user._id },
      process.env.REFRESH_TOKEN_SECRET
    );
    user.refreshToken = refreshToken;
    await user.save();

    // Send response
    res
      .status(findUser ? 200 : 201)
      .json({ userDetails: user, accessToken, refreshToken });
  } catch (err) {
    next(err);
  }
});

export default router;
