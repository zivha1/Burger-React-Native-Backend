import mongoose, { Schema } from "mongoose";
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
        quantity: Number,
        productSum: Number,
      },
    ],
    totalQuantity: Number,
    totalPrice: Number,
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model<IOrder>("Order", orderSchema);
export default Order;
