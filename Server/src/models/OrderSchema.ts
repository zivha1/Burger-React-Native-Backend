import mongoose, { Schema, SchemaType } from "mongoose";
import { IOrder } from "../types/order";

const orderSchema = new mongoose.Schema<IOrder>(
  {
    items: [
      {
        product: {
          type: Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        productSum: Number,
        quantity: Number,
      },
    ],
    total: Number,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
