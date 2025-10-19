import { IndexRouter } from "@/modules/common/controller/index.controller.js";
import {
  FRONT_URL,
  // FRONT_URL,
  HOST,
  NODE_ENV,
  PORT,
} from "@/modules/config/enviroments.config.js";
import cors from "cors";
import express from "express";
class App {
  app: express.Express;
  router: express.Express;
  constructor() {
    this.app = express();
    // Middlewares first
    this._middlewares();

    // Then routes
    this.router = this.app.use("/api", new IndexRouter().route);

    // Initialize the app
    this._init();
  }

  _middlewares() {
    this.app.use(express.json());
    const config = {
      origin: FRONT_URL,
      credentials: true,
      exposedHeaders: ["Authorization"],
      allowedHeaders: ["Authorization", "Content-Type"],
      methods: ["POST", "PUT", "PATCH", "OPTIONS", "DELETE", "GET"],
      optionsSuccessStatus: 204,
    };
    this.app.use(cors(config));
  }

  _init() {
    this.app.listen(PORT, () => {
      console.log(
        `App running in: ${NODE_ENV === "production" ? HOST : `${HOST}:${PORT}`}`,
      );
    });
  }
}

new App();
