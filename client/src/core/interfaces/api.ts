export interface BaseResponse<T extends object | null | string> {
  status: number;
  message: string;
  data?: T;
  total?: number | null;
}
