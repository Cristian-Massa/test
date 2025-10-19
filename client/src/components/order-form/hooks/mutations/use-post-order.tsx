import { api } from "@/core/lib/api";
import type { Order } from "@/core/types/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const usePostOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: postOrder, isPending } = useMutation({
    mutationFn: async (data: Omit<Order, "id">) => {
      await api("/orders", {
        method: "POST",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    postOrder,
    isPending,
  };
};
