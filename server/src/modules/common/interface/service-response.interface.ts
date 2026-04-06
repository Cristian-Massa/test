export interface ServiceResponse<T extends object | null | string> {
  status: number;
  message?: string | undefined;
  data?: T;
  total?: number | null;
}
