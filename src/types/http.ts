export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export interface HttpResponse<T = unknown> {
  data: T;
  error: null;
  status: number;
}

export interface HttpError {
  data: null;
  error: {
    code: string;
    message: string;
    details?: unknown;
  };
  status: number;
}

export type ApiResponse<T> = HttpResponse<T> | HttpError; 