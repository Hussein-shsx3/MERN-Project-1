import mongoose from "mongoose";

const UsersSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  image: { type: String, required: true },
  refreshToken: { type: String },
});

const User = new mongoose.model("User", UsersSchema);

export default User;
