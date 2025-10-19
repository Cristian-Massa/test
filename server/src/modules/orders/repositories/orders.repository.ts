import { eq, sql } from "drizzle-orm";
import { db } from "@/modules/database/db.js";
import { orders } from "@/modules/orders/schema/orders.schema.js";
import type {
  Order,
  NewOrder,
  OrderStatus,
} from "@/modules/orders/types/orders.type.js";

type RepositoryResponse<T> = {
  data: T | null;
  total?: number | null;
  error: string | null;
};

export class OrdersRepository {
  async getOrders(
    page: number = 1,
    pageSize: number = 10,
    status?: OrderStatus,
  ): Promise<RepositoryResponse<Order[]>> {
    const offset = (page - 1) * pageSize;
    try {
      const result = await db
        .select()
        .from(orders)
        .where(status ? eq(orders.status, status) : undefined)
        .limit(pageSize)
        .offset(offset);
      console.log(result);
      const total = await this.getOrdersCount(status);

      return {
        data: result,
        total,
        error: null,
      };
    } catch (error: any) {
      console.error("getOrders error:", error);
      return { data: null, total: 0, error: error.message };
    }
  }

  async getOrdersCount(status?: OrderStatus): Promise<number | null> {
    try {
      const result = await db
        .select({ count: sql<number>`count(*)` })
        .from(orders)
        .where(status ? eq(orders.status, status) : undefined);
      return Number(result[0]?.count ?? 0);
    } catch (error: any) {
      console.error("getOrdersCount error:", error);
      return null;
    }
  }

  async findById(id: string): Promise<RepositoryResponse<Order>> {
    try {
      const [order] = await db.select().from(orders).where(eq(orders.id, id));
      return { data: order ?? null, error: null };
    } catch (error: any) {
      console.error("findById error:", error);
      return { data: null, error: error.message };
    }
  }

  async create(data: NewOrder): Promise<RepositoryResponse<Order>> {
    try {
      const [created] = await db.insert(orders).values(data).returning();
      return { data: created ?? null, error: null };
    } catch (error: any) {
      console.error("create error:", error);
      return { data: null, error: error.message };
    }
  }

  async update(
    id: string,
    data: Partial<NewOrder>,
  ): Promise<RepositoryResponse<Order>> {
    try {
      const [updated] = await db
        .update(orders)
        .set(data)
        .where(eq(orders.id, id))
        .returning();
      return { data: updated ?? null, error: null };
    } catch (error: any) {
      console.error("update error:", error);
      return { data: null, error: error.message };
    }
  }

  async delete(id: string): Promise<RepositoryResponse<boolean>> {
    try {
      const result = await db
        .delete(orders)
        .where(eq(orders.id, id))
        .returning();
      return { data: result.length > 0, error: null };
    } catch (error: any) {
      console.error("delete error:", error);
      return { data: false, error: error.message };
    }
  }
}
