/* eslint-disable @typescript-eslint/no-explicit-any */
const BASE_ERROR = {
  error: "Failed!",
  message: "Unknown error.",
  statusCode: 500,
};

export interface ErrorResponse {
  message: string;
  statusCode?: number;
}

export type ErrorCodes =
  | "CLIENT_ERROR" // 400-499 status codes
  | "SERVER_ERROR" // 500-599 status codes
  | "TIMEOUT_ERROR"
  | "CONNECTION_ERROR"
  | "NETWORK_ERROR"
  | "CANCEL_ERROR"
  | "UNKNOWN_ERROR"
  | "INTERNAL_ERROR"; // error in the http service

export class APIError<T> extends Error {
  public override message: ErrorCodes;
  public data?: T;
  public statusCode?: number;

  constructor(message: ErrorCodes, data?: T, statusCode?: number) {
    super(message);
    this.message = message;
    this.data = data ?? (BASE_ERROR as any);
    this.statusCode = statusCode;
  }
}
