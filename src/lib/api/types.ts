export type IdRequest<T> = {
  id: string;
  data: T;
};

export type PaginationResponse<T> = {
  data: T[];
  total: number;
};

export type PaginationRequest = {
  limit: number;
  offset: number;
};
