import { PlatformType } from "./books.types";

import { APIDataType } from "./books.types";

export const BookFormat = {
  Hardcover: "PRINT_BOOK_HARD_COVER",
  SpecialEdition: "PRINT_BOOK_SPECIAL_EDITION",
  Paperback: "PRINT_BOOK_PAPER_BACK",
  Ebook: "EBOOK",
  Audiobook: "AUDIO_BOOK",
} as const;

export type BookFormat = (typeof BookFormat)[keyof typeof BookFormat];

export interface BookFormatResponse {
  id: number;
  format: BookFormat;
  name: string;
  isbn_number: string;
  stock?: StockResponse;
  sku: string;
  book_cover_image: string;
  spine_image: string;
  status: string;
  price: number;
  api_data: APIDataType;
  cost: number;
  platform: PlatformType;
  lastModDate: Date;
}

export interface StockResponse {
  id: string;
  qty: number;
  createDate: Date;
  lastModDate: Date;
}
