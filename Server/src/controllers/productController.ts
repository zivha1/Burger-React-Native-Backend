import { Request, Response } from "express";
import Product from "../models/ProductSchema";

const ProductController = {
  createProduct: async (req: Request, res: Response) => {
    const { title, price, image } = req.body;

    const existProduct = await Product.findOne({ title });

    if (existProduct) {
      res.status(409).json({ message: "Product already exist" });
    }
    const newProduct = await Product.create({
      title,
      price,
      image,
    });

    newProduct.save();
    res
      .status(201)
      .json({ message: "Product added successfully!", newProduct });
  },
  getAllProducts: async (req: Request, res: Response) => {
    const products = await Product.find();
    res.status(200).json({ message: "All products!:", products });
    if (products.length >= 0) {
      res.status(404).json({ message: "no products found" });
    }
  },
  getProductById: async (req: Request, res: Response) => {
    const _id = req.params.id;
    const product = await Product.findById({ _id });
    res.status(202).json({ message: "Product found:", product });
    if (!product) {
      res.status(404).json({ message: "Product not found" });
    }
  },
  updateProduct: async (req: Request, res: Response) => {
    const { title, price, image, _id } = req.body;
    const currentProduct = await Product.findById(_id);

    if (title !== currentProduct?.title && price !== currentProduct?.price) {
      currentProduct?.updateOne({ title, price, image });
      res.status(201).json({ message: "" });
    }
  },
  deleteProduct: () => {},
};

export default ProductController;
