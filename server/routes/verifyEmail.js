import express from "express";
import Users from "../models/Usres.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.get("/:token", async (req, res, next) => {
  try {
    const token = req.params.token;
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

    const user = await Users.findById(decoded.id);
    if (!user) {
      return res.status(400).send("Invalid link or user does not exist!");
    }

    user.isVerified = true;
    await user.save();

    res.status(200).send("Email verified successfully!");
  } catch (err) {
    next(err);
  }
});
export default router;
