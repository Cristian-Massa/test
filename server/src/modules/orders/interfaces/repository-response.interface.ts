export interface RepositoryResponse<T> {
  data: T | null;
  total?: number;
  error: string | null;
}
