import express from "express";
import Users from "../models/Usres.js";
import Customer from "../models/Customer.js";

const router = express.Router();

//* Add New Customer
router.post("/", async (req, res, next) => {
  try {
    //* Find Customer
    const newCustomer = new Customer({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      country: req.body.country,
      birthday: req.body.birthday,
      telephone: req.body.telephone,
      customerOwner: req.body.customerOwner,
    });
    await newCustomer.save();
    res.status(201).send("added successfully!");
  } catch (err) {
    next(err);
  }
});
//* Get all Customer
router.get("/", async (req, res, next) => {
  try {
    //* Find users
    const findCustomer = await Customer.find().populate("customerOwner");
    if (!findCustomer) {
      return res.status(400).send("Users not found!");
    } else {
      return res.status(200).json(findCustomer);
    }
  } catch (err) {
    next(err);
  }
});

//* Get all Customer for specific user
router.get("/:userId", async (req, res, next) => {
  const userId = req.params.userId;
  try {
    //* Find users
    const findUser = await Users.findById(userId);
    const findCustomer = await Customer.find({
      customerOwner: findUser,
    }).populate("customerOwner");
    if (!findCustomer) {
      return res.status(400).send("Users not found!");
    } else {
      return res.status(200).json(findCustomer);
    }
  } catch (err) {
    next(err);
  }
});

//*  Get only one Customer information
router.get("/information/:customerId", async (req, res, next) => {
  const customerId = req.params.customerId;
  try {
    //* Find user
    const findCustomer = await Customer.findById(customerId).populate(
      "customerOwner"
    );
    if (!findCustomer) {
      return res.status(400).send("Users not found!");
    } else {
      return res.status(200).json(findCustomer);
    }
  } catch (err) {
    next(err);
  }
});

//* Update Customer
router.put("/:customerId", async (req, res, next) => {
  const customerId = req.params.customerId;
  try {
    //* Find user and update
    const updateCustomer = await Customer.findByIdAndUpdate(customerId, {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      gender: req.body.gender,
      country: req.body.country,
      birthday: req.body.birthday,
      telephone: req.body.telephone,
      lastUpdated: Date.now(),
    });
    if (updateCustomer) {
      res.status(200).send("User updated successfully!"); //? if the user updated is already in the list?
    } else {
      res.status(400).send("User not found!");
    }
  } catch (err) {
    next(err);
  }
});

//* Delete Customer
router.delete("/:customerId", async (req, res, next) => {
  const customerId = req.params.customerId;
  try {
    //* Find user and delete
    const findCustomer = await Customer.findByIdAndDelete(customerId);
    if (!findCustomer) {
      return res.status(400).send("User not found!");
    } else {
      return res.status(200).send(`Deleted successfully`);
    }
  } catch (err) {
    next(err);
  }
});

export default router;
