
import express from 'express';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { Medicine } from '../models/medicine.js';

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
}

export const getMedicine = async (request, response) => {
    const _id = request.body.medicines_bought._id
    try {
        const result = await Medicine.find({ _id });
        response.status(200).json(result);
    } catch (error) {
        return response.status(401).send('unauthenticated');
    }
}

export const logout = (request, response) => {
    response.cookie('jwt', '', { maxAge: -1 });

    response.send({
        message: "Logged out successfully."
    });
}

export const pharmacies = async (request, response) => {
    try {
        // Fetch all users with role 'pharmacy' from the database
        const pharmacies = await User.find({ role: 'pharmacy' }, { password: 0 });

        response.send(pharmacies);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal Server Error." });
    }
}

export const laboratories = async (request, response) => {
    try {
        // Fetch all users with role 'laboratory' from the database
        const lab = await User.find({ role: 'laboratory' }, { password: 0 });
        response.send(lab);
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: "Internal Server Error." });
    }
}

export const deleteUser = async (request, response) => {
    try {
        const deletedUser = await User.deleteOne({ email: request.body.email });

        if (deletedUser.deletedCount === 1) {
            response.status(200).json({ message: 'User deleted successfully' });
        } else {
            // User with the specified email not found
            response.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
}

export const updateUser = async (request, response) => {
    console.log(request.body);
    try{
        //const userEmail = await User.findOne({ email: request.body.email });
        const result = await User.findOneAndUpdate({ email: request.body.email }, { $set: request.body } , { new: true });
        console.log(result);
        if (result) {
            response.status(200).json({ message: 'User updated successfully' });
        } else {
            // User with the specified email not found
            response.status(404).json({ message: 'User not found' });
        }
    } catch (error) {
        console.error(error);
        response.status(500).json({ message: 'Internal Server Error' });
    }
}