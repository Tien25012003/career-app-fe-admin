export type BaseResponse<T> = {
  data: T;
  message?: string;
  code?: string;
};

export type TPaginationRESP = {
  size: number;
  page: number;
  totalPages: number;
  totalCounts: number;
};

export type TPagingResponse<T> = {
  data: T;
  message?: string;
  code?: string;
  pagination?: TPaginationRESP;
};
