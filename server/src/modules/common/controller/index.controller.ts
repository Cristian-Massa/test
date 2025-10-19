import { OrdersRouter } from "@/modules/orders/controllers/orders.controller.js";
import { Router } from "express";

export class IndexRouter {
  route: Router;
  constructor() {
    this.route = Router();
    this._init();
  }

  private _init() {
    this.route.use("/orders", new OrdersRouter().route);
  }
}
