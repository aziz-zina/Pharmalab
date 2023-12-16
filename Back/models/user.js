//Import mongoose library
import mongoose from "mongoose";

//Destructing Schema and model from mongoose
const { Schema, model } = mongoose;

//Create a schema
const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true, minlength: 8 },
    password: { type: String, required: true, minlength: 8 },
    name: { type: String, required: false, minlength: 5 },
    address: { type: String, required: false, minlength: 8 },
    role: { type: String, required: false },
    state: { type: String },
    medicines_bought: [
      {
        medicine: { type: Schema.Types.ObjectId, ref: "medicine" },
        quantity: Number,
        state: String,
      },
    ],
    /*medicines_produced: [{ type: Schema.Types.ObjectId, ref: 'Medicine' }],*/
  },
  //! KOL MARRA EL USER YET7AT FEL DATABASE, YGENERATI EL MONGOOSE 2 ENTITITIES: createdAt W updatedAt
  { timestamps: true }
);

//Create a model
export const User = model("User", userSchema);
