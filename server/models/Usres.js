import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  image: { type: String},
  refreshToken: { type: String },
  isVerified: { type: Boolean, default: false },
});

const User = new mongoose.model("User", UsersSchema);

export default User;
