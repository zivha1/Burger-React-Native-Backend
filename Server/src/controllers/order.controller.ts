import { IProduct } from "../types/product";
import UserModel from "../models/UserSchema";
import ProductModel from "../models/ProductSchema";
import OrderModel from "../models/OrderSchema";
import { Request, Response } from "express";

export const orderController = {
  addToOrder: async (req: Request, res: Response) => {
    const { userId, productId }: { userId: string; productId: string } =
      req.body;
    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(productId);
    if (!user || !product) {
      return res
        .status(404)
        .json({ success: false, message: "User or Product not Found!" });
    }

    let order = await OrderModel.findOne({ userId });
    if (!order) {
      order = await OrderModel.create({
        userId,
        items: [],
        totalPrice: 0,
        totalQuantity: 0,
      });
    }
    // add or increase the items to the cart

    const productInOrder = order.items.find(
      (p) => p.product._id.toString() === productId
    );

    if (!productInOrder) {
      order.items.push({
        product: product._id,
        quantity: 1,
        productSum: product.price,
      });
      await order.save();
      return res
        .status(202)
        .json({ success: true, message: "Order created successfully" });
    }
    if (productInOrder) {
      productInOrder.quantity++;
      productInOrder.productSum = productInOrder.quantity * product.price;
    }
    await order.save();
    return res.status(200).json({ success: true, message: "Ok" });
  },
  decreaseFromOrder: async (req: Request, res: Response) => {
    const { userId, productId }: { userId: string; productId: string } =
      req.body;
    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(productId);
    if (!user || !product) {
      return res
        .status(404)
        .json({ success: false, message: "User or Product not Found!" });
    }

    let order = await OrderModel.findOne({ userId });
    if (!order) {
      res.status(404).json({ success: false, message: "No order found" });
      return;
    }
    // remove or decrease the items to the cart

    const productInOrder = order.items.find(
      (p) => p.product._id.toString() === productId
    );

    if (!productInOrder) {
      return res
        .status(404)
        .json({ success: true, message: "No product found in order" });
    }
    if (productInOrder) {
      productInOrder.quantity = productInOrder.quantity - 1;
      const productQuntity = productInOrder.quantity;
      console.log(productInOrder);
      if (productQuntity <= 0) {
        order.items = order.items.filter(
          (it) => it.product._id.toString() !== productId
        );
        await order.save();
        return res
          .status(200)
          .json({ success: true, message: "Product removed!" });
      }
      productInOrder.productSum = productInOrder.quantity * product.price;
      productInOrder.quantity = productQuntity;
    }
    await order.save();
    return res.status(200).json({ success: true, message: "Decreased Item!" });
  },
  removeFromOrder: async (req: Request, res: Response) => {
    const { userId, productId }: { userId: string; productId: string } =
      req.body;
    const user = await UserModel.findById(userId);
    const product = await ProductModel.findById(productId);
    if (!user || !product) {
      return res
        .status(404)
        .json({ success: false, message: "User or Product not Found!" });
    }

    let order = await OrderModel.findOne({ userId });
    if (!order) {
      res.status(404).json({ success: false, message: "No order found" });
      return;
    }
    // remove  the item to the cart

    const productInOrder = order.items.find(
      (p) => p.product._id.toString() === productId
    );

    if (!productInOrder) {
      return res
        .status(404)
        .json({ success: true, message: "No product found in order" });
    }
    if (productInOrder) {
      order.items = order.items.filter(
        (it) => it.product._id.toString() !== productId
      );
      await order.save();
      return res
        .status(200)
        .json({ success: true, message: "Product removed!" });
    }
    await order.save();
    return res.status(404).json({ success: true, message: "Error!" });
  },
  clearOrder: async (req: Request, res: Response) => {
    const { userId }: { userId: string } = req.body;
    const user = await UserModel.findById(userId);
    console.log(user);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User order not Found!" });
    }

    let order = await OrderModel.findOne({ userId });
    if (!order) {
      res.status(404).json({ success: false, message: "No order found" });
      return;
    }
    // remove all items from the cart

    const productsInOrder = order.items.length;

    if (productsInOrder === 0) {
      return res
        .status(200)
        .json({ success: true, message: "order already clear" });
    }
    if (productsInOrder > 0) {
      order.items = [];
      order.totalQuantity = 0;
      order.totalPrice = 0;

      await order.save();
      return res.status(200).json({ success: true, message: "Order Canceled" });
    }
  },
  getOrder: async (req: Request, res: Response) => {
    const userId = req.params.id;

    const user = await UserModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User order not Found!" });
    }

    let order = await OrderModel.findOne({ userId });
    if (!order) {
      res.status(404).json({ success: false, message: "No order found" });
      return;
    }
    // get user order
    console.log(order);
    return res
      .status(202)
      .json({ success: true, message: "User order!:", order });
  },
};
