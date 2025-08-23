import { Request, Response } from "express";
import ProductModel from "../models/ProductSchema";
import { IProduct } from "../types/product";

export const ProductController = {
  //GET / - return all the products!
  getAll: async (req: Request, res: Response): Promise<void> => {
    try {
      const products = await ProductModel.find().lean();
      res.status(200).json({
        success: true,
        data: products,
      });
    } catch (error) {
      res.status(500).json({ success: false, message: `error: ${error}` });
    }
  },

  //POST / - creating a product
  create: async (req: Request, res: Response): Promise<void> => {
    try {
      const { title, price, image, isAvailable } = req.body as Omit<
        IProduct,
        "_id"
      >;

      const priceNum = typeof price === "string" ? Number(price) : price;
      if (!title || priceNum === null || Number.isNaN(price) || priceNum < 0) {
        res.status(400).json({
          success: false,
          message: "title and valid price are required!",
        });
      }

      const product = await ProductModel.create({
        title,
        price: priceNum,
        image,
        isAvailable,
      });
      res.status(201).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "server error",
        error,
      });
    }
  },

  //PUT / - updating a product
  update: async (req: Request, res: Response): Promise<void> => {
    try {
      const { _id } = req.params;
      const { title, price, image, isAvailable } = req.body as IProduct;
      const product = await ProductModel.findByIdAndUpdate(
        _id,
        { title, price, image, isAvailable },
        { new: true }
      );
      if (!product) {
        res.status(404).json({
          success: false,
          message: "product not found",
        });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "server error",
        error,
      });
    }
  },

  //DELETE / - deleting a product
  delete: async (req: Request, res: Response): Promise<void> => {
    try {
      const { _id } = req.params;
      const product = await ProductModel.findByIdAndDelete(_id);
      if (!product) {
        res.status(404).json({
          success: false,
          message: "product not found",
        });
      }
      res.status(200).json({
        success: true,
        data: product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "server error",
        error,
      });
    }
  }
};
