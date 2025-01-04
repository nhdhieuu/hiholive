import axiosInstance from "@/axiosSetup.ts";
import { Stream } from "@/types/stream.ts";
import { Category } from "@/types/category.ts";

interface ListStreamRespones {
  data: Stream[];
}

interface StreamParams {
  state: string;
  [key: string]: unknown;
}
interface CategoryResponse {
  data: Category[];
}

export const getListStream = async (
  params: StreamParams,
): Promise<ListStreamRespones> => {
  try {
    const response = await axiosInstance.get<ListStreamRespones>(
      "/v1/stream/",
      { params },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stream list:", error);
    throw error;
  }
};
export const getCategory = async (): Promise<CategoryResponse> => {
  try {
    const response = await axiosInstance.get<CategoryResponse>("/v1/category/");
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};
