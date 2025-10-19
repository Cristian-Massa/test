import { api } from "@/core/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteOrder = () => {
  const queryClient = useQueryClient();
  const { mutate: deleteOrder, isPending } = useMutation({
    mutationFn: async (id: string) => {
      await api(`/orders/${id}`, { method: "DELETE" });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });

  return {
    deleteOrder,
    isPending,
  };
};
