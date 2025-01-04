import axiosInstance from "@/axiosSetup";
import { Stream } from "@/types/stream";

interface ListStreamByCategoryResponse {
  data: Stream[];
}
interface CategoryParams {
  [key: string]: unknown;
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
