import { User } from "../models/user.js";
import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import validor from "validator";

export const createUser = async (request, response) => {
  const salt = await bcrypt.genSalt(10);

  const hashedPassword = await bcrypt.hash(request.body.password, salt);
  //Test here
  const user = new User({
    email: request.body.email,
    password: hashedPassword,
    name: request.body.name,
    address: request.body.address,
    role: request.body.role,
    state: "Non valid",
  });

  if (
    !validor.isEmail(request.body.email, { domain_specific_validation: true })
  ) {
    console.log("Email not valid");
    return response.status(404).json({ message: "Email not valid" });
  }

  const userEmail = await User.findOne({ email: request.body.email });

  if (userEmail) {
    return response.status(404).json({ message: "Email already used" });
  }

  if (
    !validor.isStrongPassword(request.body.password, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    console.log("Weak ahhh password");
    return response.status(404).json({ message: "Weak password" });
  }

  try {
    //* AWAIT = wait for the function to finish executing
    //insert
    const resultat = await user.save();

    const { password, ...data } = await resultat.toJSON();
    response.status(201).send(data);
  } catch (error) {
    console.log(error);
    response.status(500).json({ Message: " Internal Server Error." });
  }
};

export const login = async (request, response) => {
  if (
    !validor.isEmail(request.body.email, { domain_specific_validation: true })
  ) {
    console.log("Email not valid");
    return response.status(404).json({ message: "Email not valid" });
  }

  const user = await User.findOne({ email: request.body.email });

  if (!user) {
    return response.status(404).json({ message: "User not found" });
  }

  if (!(await bcrypt.compare(request.body.password, user.password))) {
    return response.status(400).json({ message: "Incorrect password" });
  }

  const token = jwt.sign({ _id: user._id }, "secret");
  response.cookie("jwt", token, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000, //1 day
  });

  response.send({
    message: "Logged in successfully.",
  });
};

export const getUser = async (request, response) => {
  try {
    const cookie = request.cookies["jwt"];

    const claims = jwt.verify(cookie, "secret");

    if (!claims) {
      return response.status(401).send("unauthenticated");
    }

    const user = await User.findOne({ _id: claims._id });

    const { password, ...data } = await user.toJSON();

    response.send(data);
  } catch (error) {
    return response.status(401).send("unauthenticated");
  }
};

export const logout = (request, response) => {
  response.cookie("jwt", "", { maxAge: -1 });

  response.send({
    message: "Logged out successfully.",
  });
};

export const pharmacies = async (request, response) => {
  try {
    // Fetch all users with role 'pharmacy' from the database
    const pharmacies = await User.find({ role: "pharmacy" }, { password: 0 });

    response.send(pharmacies);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }
};

export const laboratories = async (request, response) => {
  try {
    // Fetch all users with role 'laboratory' from the database
    const lab = await User.find({ role: "laboratory" }, { password: 0 });
    response.send(lab);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }
};

export const deleteUser = async (request, response) => {
  try {
    const deletedUser = await User.deleteOne({ email: request.body.email });

    if (deletedUser.deletedCount === 1) {
      response.status(200).json({ message: "User deleted successfully" });
    } else {
      // User with the specified email not found
      response.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error" });
  }
};

export const updateUser = async (request, response) => {
  try {
    //const userEmail = await User.findOne({ email: request.body.email });
    const result = await User.findOneAndUpdate(
      { email: request.body.email },
      { $set: request.body },
      { new: true }
    );
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

export const getUserById = async (request, response) => {
  try {
    const producerId = request.query.producerId;

    // Assuming User is your Mongoose model for producers
    const producer = await User.findOne({ _id: producerId });

    if (!producer) {
      return response.status(404).json({ error: "Producer not found" });
    }

    return response.status(200).json({ producer });
  } catch (error) {
    console.error("Error in getUserById:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export const getUserByBuyerId = async (request, response) => {
  console.log(request.query.buyerId);
  try {
    const buyerId = request.query.buyerId;

    const buyer = await User.findOne({ _id: buyerId });
    console.log("sex: ", buyer);

    if (!buyer) {
      return response.status(404).json({ error: "User not found" });
    }

    return response.status(200).json({ buyer });
  } catch (error) {
    console.error("Error in getUserByBuyerId:", error);
    return response.status(500).json({ error: "Internal server error" });
  }
};

export const filterLaboratoryByName = async (request, response) => {
  try {
    const textName = request.query.text;

    const lab = await User.find({
      name: { $regex: textName },
      role: "laboratory",
      state: "Valid",
    });
    console.log("lab");
    console.log(lab);

    response.status(200).json({ lab });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: "Internal Server Error." });
  }
};
