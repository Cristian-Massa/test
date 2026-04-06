export type OrderStatus = "pending" | "completed" | "cancelled";

export interface Order {
  id: string;
  customerName: string;
  item: string;
  quantity: number;
  status: OrderStatus;
}
