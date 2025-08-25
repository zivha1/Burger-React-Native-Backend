import mongoose from "mongoose";

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  items: [
    {
      producut: mongoose.Types.ObjectId;
      quantity: number;
      productSum: number;
    }
  ];
  total: number;
  userId: mongoose.Types.ObjectId;
}
