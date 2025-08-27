import { useAuth } from "@/context/authContext";
import { api } from "./api.service";
import { Order } from "@/types/order";

export const orderService = {
  async getUserOrder(userId: string): Promise<Order> {
    const res = await api.get<{ success: boolean; data: Order }>(
      `/order/${userId}`
    );
    return res.data.data;
  },

  async addToOrder(productId: string, userId: string): Promise<void> {
    const res = await api.post("/order", { productId, userId });
    return res.data.data;
  },

  async removeFromOrder(productId: string, userId: string): Promise<void> {
    const res = await api.post("/order/item", { productId, userId });
    return res.data.data;
  },
  async decreaseFromOrder(productId: string, userId: string): Promise<void> {
    const res = await api.patch("/order/item", { productId, userId });
    return res.data.data;
  },
};
