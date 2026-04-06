import type { ServiceResponse } from "@/modules/common/interface/service-response.interface.js";
import { OrdersRepository } from "@/modules/orders/repositories/orders.repository.js";
import type {
  NewOrder,
  Order,
  OrderStatus,
} from "@/modules/orders/types/orders.type.js";

export class OrdersService {
  orderRepository = new OrdersRepository();

  // Obtener orders paginados
  async getOrders(
    page: number = 1,
    pageSize: number = 10,
    status?: OrderStatus,
  ): Promise<ServiceResponse<Order[]>> {
    const { data, total, error } = await this.orderRepository.getOrders(
      page,
      pageSize,
      status,
    );

    if (error) {
      return {
        status: 500,
        message: error,
        data: [],
        total: null,
      };
    }

    return {
      status: 200,
      data: data ?? [],
      total: total ?? null,
    };
  }

  // Obtener order por ID
  async getOrderById(id: string): Promise<ServiceResponse<Order | null>> {
    const { data } = await this.orderRepository.findById(id);
    return {
      status: data ? 200 : 404,
      message: data ? undefined : "Order not found",
      data,
    };
  }

  // Crear un nuevo order
  async createOrder(
    orderData: Omit<Order, "id" | "createdAt">,
  ): Promise<ServiceResponse<Order | null>> {
    const { data } = await this.orderRepository.create(orderData);
    return {
      status: data ? 201 : 400,
      message: data ? "Order created successfully" : "Failed to create order",
      data,
    };
  }

  // Actualizar un order existente
  async updateOrder(
    id: string,
    updateData: Partial<Omit<NewOrder, "id">>,
  ): Promise<ServiceResponse<Order | null>> {
    const { data } = await this.orderRepository.update(id, updateData);
    if (!data) {
      return { status: 404, message: "Order not found", data: null };
    }

    return {
      status: 200,
      message: "Order updated successfully",
      data,
    };
  }

  // Eliminar un order
  async deleteOrder(id: string): Promise<ServiceResponse<null>> {
    const { data } = await this.orderRepository.delete(id);
    if (!data) {
      return { status: 404, message: "Order not found" };
    }
    return { status: 200, message: "Order deleted successfully" };
  }
}
