import { HttpServiceInstance } from "@/lib/http/HttpServiceInstance";
import { GetBooksByIDsParams, GetBooksResponse } from "@/types/books.types";
import { filterAndConvertParams } from "@/utils/helpers";
import { API } from "./constants";
import { ApiCommonResponse } from "@/types/api";

const http = HttpServiceInstance.getInstance();

export const booksApi = {
  getBooksByIds: async (
    payload: GetBooksByIDsParams
  ): Promise<GetBooksResponse[]> => {
    const filteredParams = filterAndConvertParams(payload);
    const response = await http.get<ApiCommonResponse<GetBooksResponse[]>>(
      API.GET_BOOKS_BY_IDS.path,
      {
        params: filteredParams,
      }
    );
    return response.data;
  },
};
