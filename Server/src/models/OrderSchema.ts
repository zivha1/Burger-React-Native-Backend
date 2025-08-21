import mongoose, { Schema, SchemaType } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    items: { type: Schema.Types.ObjectId, ref: "Product", required: true },
    total: Number,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

export const order = mongoose.model("Order", orderSchema);
