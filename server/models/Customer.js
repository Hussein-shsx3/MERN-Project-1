import mongoose from "mongoose";

const CustomerSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  gender: { type: String, required: true },
  email: { type: String, required: true },
  country: { type: String, required: true },
  telephone: { type: String, required: true },
  birthday: { type: Date, required: true },
  createdOn: { type: Date, default : Date.now },
  lastUpdated: { type: Date, default: Date.now },
  customerOwner: {
    type: mongoose.Types.ObjectId,
    required: true,
    ref: "User",
  },
});

const Customer = new mongoose.model("Customer", CustomerSchema);

export default Customer;
