import mongoose from "mongoose";

interface IProduct extends Document {
  _id: mongoose.Types.ObjectId;
  title: string;
  price: number;
  image?: string;
}

const productSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  price: { type: Number, required: true },
  image: { type: String, required: false },
});

const Product = mongoose.model<IProduct>("Product", productSchema);
export default Product;
