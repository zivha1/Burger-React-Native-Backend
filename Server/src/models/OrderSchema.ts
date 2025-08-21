import mongoose, { Schema, SchemaType } from "mongoose";

interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  items: [
    {
      producut: mongoose.Types.ObjectId;
      quantity: number;
    }
  ];
  total: number;
  userId: mongoose.Types.ObjectId;
}

const orderSchema = new mongoose.Schema(
  {
    items: [
      {
        type: {
          product: {
            type: Schema.Types.ObjectId,
            ref: "Product",
            required: true,
          },
          quantity: Number,
        },
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
