import type { ServiceResponse } from "@/modules/common/interface/service-response.interface.js";
import { type Request, type Response } from "express";

export function handleRequest<T extends object | null | string>(
  serviceFn: (req: Request, ...args: unknown[]) => Promise<ServiceResponse<T>>,
) {
  return async (req: Request, res: Response) => {
    try {
      const result = await serviceFn(req);
      res.json(result);
    } catch (error: any) {
      res
        .status(error.status || 500)
        .json({ message: error.message || "Internal server error" });
    }
  };
}
