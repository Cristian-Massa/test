import { handleRequest } from "@/modules/common/helpers/handle-request.helper.js";
import { OrdersService } from "@/modules/orders/services/orders.service.js";
import type { OrderStatus } from "@/modules/orders/types/orders.type.js";
import { Router, type Request } from "express";
import { body, param, query, validationResult } from "express-validator";

export class OrdersRouter {
  route: Router;
  service: OrdersService;

  constructor() {
    this.service = new OrdersService();
    this.route = Router();
    this._init();
  }

  private _init() {
    /**
     * ✅ GET /orders?page=1&pageSize=10
     * Lista paginada de órdenes
     */
    this.route.get(
      "/",
      query("page").optional().isInt({ gt: 0 }).toInt(),
      query("pageSize").optional().isInt({ gt: 0 }).toInt(),
      query("status").optional(),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        return next();
      },
      handleRequest(async (req: Request) => {
        const page = req.query.page ? Number(req.query.page) : 1;
        const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
        const status = req.query.status as OrderStatus | undefined;
        return this.service.getOrders(page, pageSize, status);
      }),
    );

    /**
     * ✅ GET /orders/:id
     * Obtiene una orden por su ID
     */
    this.route.get(
      "/:id",
      param("id").isString().withMessage("Invalid ID"),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        return next();
      },
      handleRequest(async (req: Request) => {
        const { id } = req.params;
        return this.service.getOrderById(id!);
      }),
    );

    /**
     * ✅ POST /orders
     * Crea una nueva orden
     */
    this.route.post(
      "/",
      body("customerName")
        .isString()
        .withMessage("customerName must be a string"),
      body("item").isString().withMessage("item must be a string"),
      body("quantity")
        .isInt({ gt: 0 })
        .withMessage("quantity must be a positive integer"),
      body("status")
        .isIn(["pending", "completed", "cancelled"])
        .withMessage("Invalid order status"),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        return next();
      },
      handleRequest(async (req: Request) => {
        const data = req.body;
        return this.service.createOrder(data);
      }),
    );

    /**
     * ✅ PUT /orders/:id
     * Actualiza una orden existente
     */
    this.route.put(
      "/:id",
      param("id").isString().withMessage("Invalid ID"),
      body("customerName")
        .optional()
        .isString()
        .withMessage("customerName must be a string"),
      body("item").optional().isString().withMessage("item must be a string"),
      body("quantity")
        .optional()
        .isInt({ gt: 0 })
        .withMessage("quantity must be a positive integer"),
      body("status")
        .optional()
        .isIn(["pending", "completed", "cancelled"])
        .withMessage("Invalid order status"),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        return next();
      },
      handleRequest(async (req: Request) => {
        const { id } = req.params;
        const data = req.body;
        return this.service.updateOrder(id!, data);
      }),
    );

    /**
     * ✅ DELETE /orders/:id
     * Elimina una orden por su ID
     */
    this.route.delete(
      "/:id",
      param("id").isString().withMessage("Invalid ID"),
      (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        return next();
      },
      handleRequest(async (req: Request) => {
        const { id } = req.params;
        return this.service.deleteOrder(id!);
      }),
    );
  }
}
