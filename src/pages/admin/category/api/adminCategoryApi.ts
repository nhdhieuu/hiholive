import { Paging } from "@/types/paging.ts";
import axiosInstance from "@/axiosSetup.ts";
import { Category, CreateCategory } from "@/types/category.ts";

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

interface CreateCategoryResponse {
  data: boolean;
}

export async function createCategory(
  body: CreateCategory,
): Promise<CreateCategoryResponse> {
  try {
    const response = await axiosInstance.post<CreateCategoryResponse>(
      "/v1/category/",
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

interface DeleteCategoryResponse {
  data: boolean;
}

export async function deleteCategory(
  categoryId: string,
): Promise<DeleteCategoryResponse> {
  try {
    const response = await axiosInstance.delete<DeleteCategoryResponse>(
      `/v1/category/${categoryId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
