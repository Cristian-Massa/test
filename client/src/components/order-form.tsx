import { useEffect, useState, type MouseEvent } from "react";
import { Card } from "@/core/components/ui/card";
import { Button } from "@/core/components/ui/button";
import { Input } from "@/core/components/ui/input";
import { Label } from "@/core/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/core/components/ui/select";
import type { Order, OrderStatus } from "@/core/types/orders";
import { usePostOrder } from "@/components/order-form/hooks/mutations/use-post-order";
import { useGetDetailedOrder } from "@/components/shared/hooks/mutations/queries/use-get-detailed-order";
import { usePutOrder } from "@/components/order-form/hooks/mutations/us-put-order";
import { validationErrorEmitter } from "@/core/lib/validation-error-observer";
import { ValidationException } from "@/core/exceptions/validation-exception";

interface OrderFormProps {
  id: string | null;
  mode: "create" | "edit";
  onClose: () => void;
}

interface OrderErrorProps {
  customerName: string | null;
  item: string | null;
  quantity: string | null;
  status: string | null;
}

export function OrderForm({ onClose, id, mode }: OrderFormProps) {
  const { order } = useGetDetailedOrder(id);
  const { postOrder, isPending: isPosting } = usePostOrder();
  const { putOrder, isPending: isPutting } = usePutOrder();
  const [formData, setFormData] = useState<Omit<Order, "id">>({
    customerName: "",
    item: "",
    quantity: 0,
    status: "pending",
  });
  const [errors, setErrors] = useState<OrderErrorProps>({
    customerName: null,
    item: null,
    quantity: null,
    status: null,
  });

  useEffect(() => {
    if (order) {
      setFormData({
        customerName: order.customerName,
        item: order.item,
        quantity: order.quantity,
        status: order.status,
      });
    }
  }, [order]);

  const handleSubmit = (e: MouseEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.customerName ||
      !formData.item ||
      !formData.quantity ||
      !formData.status
    ) {
      const validationErrors = {
        customerName: formData.customerName
          ? null
          : "Customer name is required",
        item: formData.item ? null : "Item is required",
        quantity: formData.quantity ? null : "Quantity is required",
        status: formData.status ? null : "Status is required",
      };

      setErrors(validationErrors);

      Object.values(validationErrors).forEach((error) => {
        console.log(error);
        if (error) validationErrorEmitter.emit(new ValidationException(error));
      });

      return;
    }

    if (id) {
      console.log(formData);
      putOrder({
        data: formData,
        id,
      });
    }

    postOrder(formData);
  };

  return (
    <Card className="bg-card border-border">
      <div className="p-6 border-b border-border">
        <h2 className="text-lg font-semibold text-foreground">
          {mode === "create" ? "Create New Order" : "Edit Order"}
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-4">
        <div className="space-y-2">
          <Label htmlFor="customerName">Customer Name</Label>
          <Input
            id="customerName"
            value={formData.customerName}
            onChange={(e) =>
              setFormData({ ...formData, customerName: e.target.value })
            }
            placeholder="Enter customer name"
            className={errors.customerName ? "border-destructive" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="item">Item</Label>
          <Input
            id="item"
            value={formData.item}
            onChange={(e) => setFormData({ ...formData, item: e.target.value })}
            placeholder="Enter item name"
            className={errors.item ? "border-destructive" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) =>
              setFormData({
                ...formData,
                quantity: Number.parseInt(e.target.value) || 1,
              })
            }
            className={errors.quantity ? "border-destructive" : ""}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={formData.status}
            onValueChange={(value: OrderStatus) =>
              setFormData({ ...formData, status: value })
            }
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-3 pt-4">
          <Button
            type="submit"
            className="flex-1"
            disabled={isPosting || isPutting}
          >
            {isPosting
              ? "Saving..."
              : mode === "create"
                ? "Create Order"
                : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={onClose}>
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  );
}
