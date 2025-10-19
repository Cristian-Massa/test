import { api } from "@/core/lib/api";
import type { Order } from "@/core/types/orders";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface PutOrderParams {
  data: Omit<Order, "id">;
  id: string;
}

export const usePutOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: putOrder, isPending } = useMutation({
    mutationFn: async ({ data, id }: PutOrderParams) => {
      await api(`/orders/${id}`, {
        method: "PUT",
        body: data,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    putOrder,
    isPending,
  };
};
