import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { Medicine } from "../models/medicine.js";
import { getUser } from "../controller/userController.js";
import { User } from "../models/user.js";

export const createMedicine = async (request, response) => {
  const medicine = new Medicine({
    name: request.body.name,
    description: request.body.description,
    chemical_composition: request.body.chemical_composition,
    side_effects: request.body.side_effects,
    dosage_form: request.body.dosage_form,
    manufacture_date: request.body.manufacture_date,
    expiry_date: request.body.expiry_date,
    price: request.body.price,
    quantity: request.body.quantity,
    producer: request.body.producer,
    state: "Non valid",
  });

  try {
    //* Await the save operation
    const result = await medicine.save();
    response.status(201).json(result); // Send the saved data as the response
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const getMedicine = async (request, response) => {
  const cookie = request.cookies["jwt"];

  const claims = jwt.verify(cookie, "secret");

  if (!claims) {
    return response.status(401).send("unauthenticated");
  }

  const user = await User.findOne({ _id: claims._id });

  console.log("user: ", user._id);
  try {
    const result = await Medicine.find({ producer: user._id });
    response.status(200).json(result);
  } catch (error) {
    console.error(error); // Log the error to the console
    return response.status(500).send("Internal Server Error");
  }
};

export const deleteMedicine = async (request, response) => {
  try {
    const deletedMedicine = await User.deleteOne({ _id: request.body._id });

    if (deletedUser.deletedCount === 1) {
      response.status(200).json({ message: "Medicine deleted successfully" });
    } else {
      response.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (request, response) => {
  console.log(request.body);
  try {
    //const userEmail = await User.findOne({ email: request.body.email });
    const result = await User.findOneAndUpdate(
      { email: request.body.email },
      { $set: request.body },
      { new: true }
    );
    console.log(result);
    if (result) {
      response.status(200).json({ message: "User updated successfully" });
    } else {
      // User with the specified email not found
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};
