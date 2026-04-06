import { ITEMS_PER_PAGE } from "@/components/order-list/hooks/constants/orders-per-page";
import { api } from "@/core/lib/api";
import { type Order, type OrderStatus } from "@/core/types/orders";
import { useQuery } from "@tanstack/react-query";

export const useGetOrders = (
  currentPage: number,
  statusFilter: OrderStatus | "all",
) => {
  const { data, isPending } = useQuery({
    queryKey: ["orders", currentPage, statusFilter],

    queryFn: async () => {
      const result = await api<Order[]>(
        `/orders?page=${currentPage}&pageSize=${ITEMS_PER_PAGE}&status=${statusFilter === "all" ? "" : statusFilter}`,
        {
          method: "GET",
        },
      );
      return { orders: result?.data, total: result?.total };
    },
  });

  return {
    ...data,
    isPending,
  };
};
