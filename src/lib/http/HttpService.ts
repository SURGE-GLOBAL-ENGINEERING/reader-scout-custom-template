import { APIError, ErrorResponse } from "../errors/APIError";

const BASE_ERROR: ErrorResponse = {
  message: "Unknown error.",
  statusCode: 500,
};

export class HttpService {
  private baseUrl: string;
  private domain: string;

  constructor(baseUrl: string, domain: string) {
    this.baseUrl = baseUrl;
    this.domain = domain;
  }

  private getHeaders(
    customHeaders?: Record<string, string>
  ): Record<string, string> {
    return {
      "Content-Type": "application/json",
      "x-rs-domain": this.domain,
      ...customHeaders,
    };
  }

  private async fetchData<T>(
    endpoint: string,
    options: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    try {
      const res = await fetch(url, {
        ...options,
        headers: {
          ...this.getHeaders(),
          ...options.headers,
        },
      });

      if (!res.ok) {
        let errorData: ErrorResponse = BASE_ERROR;
        try {
          errorData = await res.json();
        } catch (error) {
          console.error("Error parsing JSON response:", error);
        }
        throw new APIError(
          res.status >= 500 ? "SERVER_ERROR" : "CLIENT_ERROR",
          errorData,
          res.status
        );
      }

      return res.json() as Promise<T>;
    } catch (error) {
      if (error instanceof APIError) {
        throw error;
      }

      if (error instanceof TypeError && error.message === "Failed to fetch") {
        throw new APIError("NETWORK_ERROR", {
          message: "Network error occurred",
          statusCode: 0,
        });
      }

      throw new APIError("UNKNOWN_ERROR", {
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
        statusCode: 500,
      });
    }
  }

  public async get<T>(
    endpoint: string,
    {
      params,
      headers,
    }: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    return this.fetchData<T>(`${endpoint}${queryString}`, {
      method: "GET",
      headers: this.getHeaders(headers),
    });
  }

  public async post<TResponse, TData>(
    endpoint: string,
    data: TData,
    {
      params,
      headers,
    }: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<TResponse> {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    const fetchOptions: RequestInit = {
      method: "POST",
      headers: this.getHeaders(headers),
      body: JSON.stringify(data),
    };
    return this.fetchData<TResponse>(`${endpoint}${queryString}`, fetchOptions);
  }

  public async put<TResponse, TData = undefined>(
    endpoint: string,
    data?: TData,
    {
      params,
      headers,
    }: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<TResponse> {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    const fetchOptions: RequestInit = {
      method: "PUT",
      headers: this.getHeaders(headers),
      body: JSON.stringify(data),
    };
    return this.fetchData<TResponse>(`${endpoint}${queryString}`, fetchOptions);
  }

  public async patch<TResponse, TData>(
    endpoint: string,
    data: TData,
    {
      params,
      headers,
    }: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<TResponse> {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    const fetchOptions: RequestInit = {
      method: "PATCH",
      headers: this.getHeaders(headers),
      body: JSON.stringify(data),
    };
    return this.fetchData<TResponse>(`${endpoint}${queryString}`, fetchOptions);
  }

  public async delete<T>(
    endpoint: string,
    {
      params,
      headers,
    }: {
      params?: Record<string, string>;
      headers?: Record<string, string>;
    } = {}
  ): Promise<T> {
    const queryString = params ? `?${new URLSearchParams(params)}` : "";
    const fetchOptions: RequestInit = {
      method: "DELETE",
      headers: this.getHeaders(headers),
    };
    return this.fetchData<T>(`${endpoint}${queryString}`, fetchOptions);
  }
}
