import { IProduct } from "../types/product";
import UserModel from "../models/UserSchema";
import { Request, Response } from "express";

export const orderController = {
  addToOrder: async (req: Request, res: Response) => {
    const { userId, productId } = req.body;
    const user = UserModel.findById({ userId });
    if (!user) {
      res.status(404).json({ success: false, message: "User not Found!" });
    }
    console.log(user);
  },

  getUser: async (req: Request, res: Response) => {
    const userId = req.body;
    const _id = userId.userId;
    console.log("id", userId.userId);

    const user = await UserModel.findById({ _id });
    console.log("user", user?._id);
    return res.status(200);
  },
};
