import express from "express";
import Users from "../models/Usres.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", async (req, res) => {
  const refreshToken = req.body.refreshToken;
  if (!refreshToken) return res.status(400).send("Access denied");

  try {
    // Verify the refresh token
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    // Find the user by ID from the decoded token
    const User = await Users.findById(decoded.id);
    if (!User || User.refreshToken !== refreshToken)
      return res.status(400).send("Invalid refresh token");
    // Create a new access token
    const accessToken = jwt.sign(
      { id: User._id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    // Send the new access token to the client
    res.json({ accessToken, refreshToken, userDetails: User });
  } catch (error) {
    console.error("Token verification error:", error);
    // Handle verification failure
    res.status(403).send("Invalid refresh token");
  }
});

export default router;
