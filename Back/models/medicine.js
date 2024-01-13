//Import mongoose library
import mongoose from "mongoose";

//Destructing Schema and model from mongoose
const { Schema, model } = mongoose;

//Create a schema
const userSchema = new Schema(
  {
    name: { type: String, required: true, minlength: 4 },
    description: { type: String, required: true },
    chemical_composition: { type: String, required: true },
    side_effects: { type: String, required: true },
    dosage_form: { type: String, required: true },
    manufacture_date: { type: Date, required: false },
    expiry_date: { type: Date, required: false },
    price: { type: Number, required: false },
    quantity: { type: Number, required: true },
    producer: { type: Schema.Types.ObjectId, ref: "User", required: true },
    buyers: [
      {
        buyer: { type: Schema.Types.ObjectId, ref: "User" },
        quantity: Number,
        dateOfPurchase: Date,
      },
    ],
    state: { type: String },
  },
  //! KOL MARRA EL USER YET7AT FEL DATABASE, YGENERATI EL MONGOOSE 2 ENTITITIES: createdAt W updatedAt
  { timestamps: true }
);

//Create a model
export const Medicine = model("Medicine", userSchema);
