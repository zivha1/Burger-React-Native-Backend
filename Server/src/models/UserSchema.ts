import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "../types/user";

const userSchema = new mongoose.Schema({
  password: {
    type: String,
    required: true,
    select: false,
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

userSchema.pre<IUser>("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(user.password, 10);
    next();
  } catch (err: any) {
    next(err);
  }
});

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});

export default mongoose.model("User", userSchema);
