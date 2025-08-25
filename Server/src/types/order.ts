import mongoose from "mongoose";
import { Types } from "mongoose";

export interface IOrderItem {
  product: Types.ObjectId; // if you populate, consider: Types.ObjectId | IProduct
  quantity: number;
  productSum: number;
}

export interface IOrder extends Document {
  _id: mongoose.Types.ObjectId;
  items: IOrderItem[];
  totalQuantity: number;
  totalPrice: number;
  userId: mongoose.Types.ObjectId;
}
