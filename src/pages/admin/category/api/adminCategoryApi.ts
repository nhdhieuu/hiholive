import { Paging } from "@/types/paging.ts";
import axiosInstance from "@/axiosSetup.ts";
import { Category } from "@/types/category.ts";

interface AdminCategoryResponse {
  data: Category[];
  paging: Paging;
}

export async function getCategories(
  page: number,
): Promise<AdminCategoryResponse> {
  try {
    const response = await axiosInstance.get<AdminCategoryResponse>(
      "/v1/category/",
      {
        params: {
          page,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
