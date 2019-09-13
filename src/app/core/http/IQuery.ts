export interface IQueryRequest {
  amount: number;
  offset: number;
  q?: string;
}

export interface IQueryResponce<T> {
  total: number;
  items: T[];
}
