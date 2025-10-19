import { useState } from "react";
import { Button } from "@/core/components/ui/button";
import { Card } from "@/core/components/ui/card";
import { Badge } from "@/core/components/ui/badge";
import { ChevronLeft, ChevronRight, Plus, Pencil, Trash2 } from "lucide-react";
import type { OrderStatus } from "@/core/types/orders";
import { useGetOrders } from "@/components/order-list/hooks/queries/use-get-orders";
import { useDeleteOrder } from "@/components/shared/hooks/mutations/use-delete-order";
import { ITEMS_PER_PAGE } from "@/components/order-list/hooks/constants/orders-per-page";

interface OrderListProps {
  handleSelectOrder: (id: string) => void;
  handleSelectMode: (mode: "create" | "edit" | null) => void;
}

export function OrderList({
  handleSelectMode,
  handleSelectOrder,
}: OrderListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<OrderStatus | "all">("all");
  const {
    orders,
    total,
    isPending: isFetching,
  } = useGetOrders(currentPage, statusFilter);
  const { deleteOrder, isPending: isDeleting } = useDeleteOrder();
  const pages = Math.ceil((total ?? 1) / ITEMS_PER_PAGE);
  const handleNext = () => {
    if (currentPage >= pages) return;
    setCurrentPage(currentPage + 1);
  };

  const handlePrevious = () => {
    if (currentPage === 1) return;
    setCurrentPage(currentPage - 1);
  };

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

  const handleCreateNew = () => {
    handleSelectMode("create");
  };

  const handleEdit = (id: string) => {
    handleSelectOrder(id);
    handleSelectMode("edit");
  };

  if (isFetching) return <div>Loading...</div>;

  return (
    <Card className="bg-card border-border  h-[80vh] relative">
      <div className="p-6 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Orders</h2>
          <Button onClick={handleCreateNew} size="sm" className="gap-2">
            <Plus className="h-4 w-4" />
            New Order
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant={statusFilter === "all" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("all")}
          >
            All
          </Button>
          <Button
            variant={statusFilter === "pending" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "completed" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("completed")}
          >
            Completed
          </Button>
          <Button
            variant={statusFilter === "cancelled" ? "default" : "outline"}
            size="sm"
            onClick={() => setStatusFilter("cancelled")}
          >
            Cancelled
          </Button>
        </div>
      </div>

      <div className="divide-y divide-border  overflow-auto ">
        {orders && orders.length === 0 ? (
          <div className="p-8 text-center text-muted-foreground">
            No orders found
          </div>
        ) : (
          orders &&
          orders.map((order) => (
            <div
              key={order.id}
              className="p-4 hover:bg-accent/50 transition-colors cursor-pointer group"
              onClick={() => handleSelectOrder(order.id)}
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-sm font-mono text-muted-foreground">
                      #{order.id}
                    </span>
                    <Badge
                      variant="outline"
                      className={getStatusColor(order.status)}
                    >
                      {order.status}
                    </Badge>
                  </div>
                  <h3 className="font-medium text-foreground mb-1">
                    {order.customerName}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span>{order.item}</span>
                    <span>•</span>
                    <span>Qty: {order.quantity}</span>
                  </div>
                </div>

                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleEdit(order.id);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    disabled={isDeleting}
                    variant="ghost"
                    size="sm"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteOrder(order.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {(total ?? 0 > 1) ? (
        <>
          <div className="mt-4" />
          <div className="p-4 border-t border-border flex items-center justify-between  absolute bottom-0 left-0 right-0 bg-white ">
            <p className="text-sm text-muted-foreground">
              Page {currentPage} of {pages} ({total} total orders)
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handlePrevious}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleNext}
                disabled={currentPage >= pages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        </>
      ) : null}
    </Card>
  );
}
