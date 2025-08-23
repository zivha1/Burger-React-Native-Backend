import mongoose, { Schema } from "mongoose";
import type { IProduct } from "../types/product";

const productSchema = new mongoose.Schema<IProduct>(
  {
    title: { type: String, require: true, trim: true },
    price: { type: Number, require: true, min: 0 },
    image: { type: String },
    isAvailable: { type: Boolean, default: true },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

productSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "items.product",
});

export default mongoose.model<IProduct>("Product", productSchema);
