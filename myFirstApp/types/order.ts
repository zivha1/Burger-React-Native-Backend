import { Product } from "./product";

export interface OrderItem {
  product: Product;
  quantity: number;
  productSum: number;
}

export interface Order {
  _id: string;
  items: OrderItem[];
  totalQuantity: number;
  totalPrice: number;
  userId: string;
}
