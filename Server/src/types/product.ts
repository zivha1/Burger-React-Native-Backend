import { Document, Types } from "mongoose";

export interface IProduct extends Document {
  _id: Types.ObjectId;
  title: string;
  price: number;
  image?: string;
  isAvailable?: boolean;
}
