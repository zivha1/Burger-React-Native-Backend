import mongoose, { Schema } from "mongoose";

const productSchema = new mongoose.Schema({
  title: String,
  id: Number,
  price: Number,
  image: Image,
});

productSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "items.product",
});

export const product = mongoose.model("Product", productSchema);
