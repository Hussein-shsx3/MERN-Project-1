import express from "express";
import Users from "../models/Usres.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  // Example: Remove or invalidate refresh token
  try {
    const refreshToken = req.body.refreshToken; // Assuming you send the refresh token in the request body
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET); // Verify the token

    // Find user and remove refresh token
    const User = await Users.findById(decoded.id);
    if (!User) return res.status(400).send("User not found");

    User.refreshToken = null; // Invalidate refresh token (set to null or remove from database)
    await User.save();

    res.status(200).send("Logout successful");
  } catch (error) {
    res.status(500).send("Server error");
  }
});

export default router;
