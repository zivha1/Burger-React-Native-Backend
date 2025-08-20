import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  userId: {
    type: String,
  },
  password: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    required: true,
    unique: true,
    type: String,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },
});

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

export const user = mongoose.model("User", userSchema);
