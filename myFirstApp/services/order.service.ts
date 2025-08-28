import { useAuth } from "@/context/authContext";
import { api } from "./api.service";
import { Order } from "@/types/order";

export const orderService = {
  async getUserOrder(userId: string): Promise<Order | null> {
    try {
      if (!userId) {
        throw new Error("missihn user id");
      }
      const res = await api.get<{ success: boolean; data: Order }>(
        `/order/${userId}`
      );
      return res.data.data;
    } catch (error) {
      console.error(error);
      return null;
    }
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
  async clearOrder(userId: string): Promise<any> {
    const res = await api.delete<{ success: boolean }>(`/order/${userId}`);
    return res.data;
  },
};
