import { api } from "@/core/lib/api";
import type { Order } from "@/core/types/orders";
import { useQuery } from "@tanstack/react-query";

export const useGetDetailedOrder = (id: string | null) => {
  const { data: order, isPending } = useQuery({
    queryKey: ["order", id],
    queryFn: async () => {
      const response = await api<Order>(`/orders/${id}`, {
        method: "GET",
      });

      return response?.data ?? null;
    },
    enabled: !!id,
  });

  return { order, isPending };
};
