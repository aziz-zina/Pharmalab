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
    const deletedMedicine = await Medicine.deleteOne({ _id: request.body._id });

    if (deletedMedicine.deletedCount === 1) {
      return response
        .status(200)
        .json({ message: "Medicine deleted successfully" });
    } else {
      return response.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateMedicine = async (request, response) => {
  //console.log(request.body);
  console.log(request.body._id);
  try {
    //const userEmail = await User.findOne({ email: request.body.email });
    const result = await Medicine.findOneAndUpdate(
      { _id: request.body._id },
      { $set: request.body },
      { new: true }
    );
    console.log(result);
    if (result) {
      return response
        .status(200)
        .json({ message: "Medicine updated successfully" });
    } else {
      // User with the specified email not found
      return response.status(404).json({ message: "Medicine not found" });
    }
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
};

export const medicines = async (request, response) => {
  try {
    // Fetch all users with role 'pharmacy' from the database
    const medicines = await Medicine.find({ state: "Valid" });

    response.send(medicines);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }
};

export const labs = async (request, response) => {
  try {
    // Fetch all users with role 'laboratory' from the database
    const lab = await User.find(
      { role: "laboratory", state: "Valid" },
      { password: 0 }
    );
    response.send(lab);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }
};

export const meds = async (request, response) => {
  try {
    const medicines = await Medicine.find();
    response.send(medicines);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }
};

export const purchaseMedicine = async (request, response) => {
  console.log(request.body);
  try {
    const cookie = request.cookies["jwt"];

    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return response.status(401).send("unauthenticated");
    }

    const user = await User.findOne({ _id: claims._id });
    console.log(user);
    const newQuantity = request.body.medicine.quantity - request.body.quantity;

    const response_medicine = await Medicine.findOneAndUpdate(
      { _id: request.body.medicine._id },
      {
        $push: {
          buyers: {
            medicine: user._id,
            quantity: request.body.quantity,
            dateOfPurchase: Date.now(),
          },
        },
        $set: {
          quantity: newQuantity,
        },
      },
      { new: true }
    );

    const response_user = await User.findOneAndUpdate(
      { _id: user._id },
      {
        $push: {
          medicines_bought: {
            medicine: request.body.medicine._id,
            quantity: request.body.quantity,
            dateOfPurchase: Date.now(),
          },
        },
      },
      { new: true }
    );

    response.status(200).json({ message: "Medicine purchased successfully" });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }
};
