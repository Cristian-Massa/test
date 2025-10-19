import { HttpException } from "@/core/exceptions/http-exception";
import { httpNotificationEmitter } from "@/core/lib/http-notification-observer";
import { type BaseResponse } from "@/core/interfaces/api";
const BASE_URL = import.meta.env.VITE_BASE_URL;
type Methods = "POST" | "GET" | "PUT" | "DELETE";

interface ApiOptionsProps {
  method: Methods;
  body?: Record<string, unknown>;
}
export const api = async <T extends object>(
  url: string,
  options: ApiOptionsProps,
  headers?: Record<string, string>,
): Promise<BaseResponse<T> | null> => {
  const response = await fetch(`${BASE_URL ? `${BASE_URL}/` : "/"}api${url}`, {
    method: options.method,
    body: options.body ? JSON.stringify(options.body) : undefined,
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) {
    const error = await response.json();
    httpNotificationEmitter.emitError(new HttpException(error.message));
    return null;
  }

  const data = (await response.json()) as BaseResponse<T>;

  if (data.message) {
    httpNotificationEmitter.emitNotifcation(data.message);
  }

  return data;
};
