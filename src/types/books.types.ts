import { BookFormatResponse } from "./formats.types";

export interface GetBooksParams {
  page?: number;
  limit?: number;
  search?: string;
  orderBy?: string;
}

export interface GetBooksByIDsParams {
  bookIds?: string;
}

export interface GenreResponse {
  id: number;
  value: string;
}

export interface GetBooksResponse {
  id: number;
  title: string;
  description: string;
  type: string;
  status: string;
  createDate: Date;
  lastModDate: Date;
  genres: GenreResponse[];
  formats: BookFormatResponse[];
  tags: string[];
  cover_image: string;
}

export interface CreateBookRequest {
  title: string;
  description: string;
  type: string;
  genres: number[];
  formats: Array<{
    formatId: number;
    price: number;
  }>;
  tags?: string[];
  cover_image?: string;
}

export type APIDataType = LuluAPIData | object;

export type LuluAPIData = {
  cover_source_url: string;
  interior_source_url: string;
  pod_package_id: string;
};

export enum PlatformType {
  LULU = "LULU",
  BOOKFUNNEL = "BOOKFUNNEL",
  MANUAL = "MANUAL",
}
