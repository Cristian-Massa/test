import type { orders } from "@/modules/orders/schema/orders.schema.js";
import type { InferInsertModel, InferSelectModel } from "drizzle-orm";

export type Order = InferSelectModel<typeof orders>;
export type NewOrder = InferInsertModel<typeof orders>;

export type OrderStatus = "pending" | "completed" | "cancelled";
