import { Card } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Badge } from "@/core/components/ui/badge";
import { X, Trash2 } from "lucide-react";
import type { OrderStatus } from "@/core/types/orders";
import { useGetDetailedOrder } from "@/components/shared/hooks/mutations/queries/use-get-detailed-order";
import { useDeleteOrder } from "@/components/shared/hooks/mutations/use-delete-order";

interface OrderDetailsProps {
  id: string;
  onClose: () => void;
}

export function OrderDetails({ id, onClose }: OrderDetailsProps) {
  const { order, isPending: isFetching } = useGetDetailedOrder(id);
  const { deleteOrder, isPending: isDeleting } = useDeleteOrder();
  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case "completed":
        return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
      case "pending":
        return "bg-amber-500/10 text-amber-500 border-amber-500/20";
      case "cancelled":
        return "bg-red-500/10 text-red-500 border-red-500/20";
    }
  };

  if (isFetching) {
    return <div className="p-6">Loading...</div>;
  }
  if (!order) {
    return <div className="p-6">Order not found</div>;
  }

  const handleDelete = async () => {
    deleteOrder(id);
    onClose();
  };

  return (
    <Card className="bg-card border-border">
      <div className="p-6 border-b border-border flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Order Details</h2>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      <div className="p-6 space-y-6">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Order ID
          </label>
          <p className="mt-1 text-sm font-mono text-foreground">#{order.id}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Customer Name
          </label>
          <p className="mt-1 text-base font-medium text-foreground">
            {order.customerName}
          </p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Item
          </label>
          <p className="mt-1 text-base text-foreground">{order.item}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Quantity
          </label>
          <p className="mt-1 text-base text-foreground">{order.quantity}</p>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Status
          </label>
          <div className="mt-2">
            <Badge variant="outline" className={getStatusColor(order.status)}>
              {order.status}
            </Badge>
          </div>
        </div>
      </div>

      <div className="p-6 border-t border-border flex gap-3">
        <Button
          variant="destructive"
          disabled={isDeleting}
          onClick={handleDelete}
          className="gap-2"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </Button>
      </div>
    </Card>
  );
}
