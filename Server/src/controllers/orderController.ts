import Order from "../models/OrderSchema";
import Product from "../models/ProductSchema";
import { Request, Response } from "express";

export async function addToOrder(req: Request, res: Response) {
  try {
    const { userId, productId } = req.body;
    if (!userId || !productId) {
      res.status(402).json({ message: "Something Went Wrong" });
    }
    const addedProduct = await Product.findOne({ productId });
    if (!addedProduct) {
      res.status(402).json({ message: "product doesnt exists" });
      return;
    }
    const existOrder = await Order.findOne({ userId });
    if (existOrder) {
      const existProduct = existOrder.items.find(productId);
      if (existProduct) {
        existProduct.quantity += 1;
        existOrder.total += existProduct.quantity * addedProduct.price;
        await existOrder.save();
      }
      if (!existProduct) {
        existOrder.items.push(productId);
      }

      // Find if already in card
      // if so:
      // productId === existOrder.items[x].product
    }
    if (!existOrder) {
    }
  } catch (error) {
    console.log("Error", error);
  }
}
