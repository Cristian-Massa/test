import {
  pgTable,
  varchar,
  integer,
  timestamp,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";

/**
 * Enum type for status (Drizzle helper)
 * The name 'order_status' should match the DB enum name created in the migration.
 */
export const orderStatus = pgEnum("order_status", [
  "pending",
  "completed",
  "cancelled",
]);

export const orders = pgTable("orders", {
  id: uuid("id")
    .default(sql`gen_random_uuid()`)
    .primaryKey(),
  customerName: varchar("customer_name", { length: 255 }).notNull(),
  item: varchar("item", { length: 255 }).notNull(),
  quantity: integer("quantity").notNull(),
  status: orderStatus("status").notNull().default("pending"),
  createdAt: timestamp("created_at", { mode: "date" }).defaultNow().notNull(),
});
