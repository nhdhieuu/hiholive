import axiosInstance from "@/axiosSetup";
import { Stream } from "@/types/stream";
import { Category } from "@/types/category.ts";

interface ListStreamByCategoryResponse {
  data: Stream[];
}
interface CategoryParams {
  [key: string]: unknown;
}
interface CategoryResponse {
  data: Category;
}
export const getListStreamByCategory = async (
  params: CategoryParams,
): Promise<ListStreamByCategoryResponse> => {
  try {
    const response = await axiosInstance.get<ListStreamByCategoryResponse>(
      `/v1/stream/`,
      { params },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stream list by category:", error);
    throw error;
  }
};
export const getCategory = async (id: string): Promise<CategoryResponse> => {
  try {
    const response = await axiosInstance.get<CategoryResponse>(
      `/v1/category/${id}`,
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category:", error);
    throw error;
  }
};
