import {
  InvalidateQueryFilters,
  QueryClient,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { Order } from "@/types/order";
import { orderService } from "@/services/order.service";

export const useOrder = (userId: string) => {
  return useQuery<Order, Error>({
    queryKey: ["order", userId],
    queryFn: () => orderService.getUserOrder(userId),
  });
};

export const useAddProduct = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) =>
      orderService.addToOrder(productId, userId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["order", userId] }),
  });
};

export const useRemoveProduct = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) =>
      orderService.removeFromOrder(productId, userId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["order", userId] }),
  });
};

export const useDecreaseProduct = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (productId: string) =>
      orderService.decreaseFromOrder(productId, userId),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["order", userId] }),
  });
};
