import { Paging } from "@/types/paging.ts";
import axiosInstance from "@/axiosSetup.ts";
import { User } from "@/types/User.ts";

interface AdminUserResponse {
  data: User[];
  paging: Paging;
}

export async function getUsers(page: number): Promise<AdminUserResponse> {
  try {
    const response = await axiosInstance.get<AdminUserResponse>("/v1/user/", {
      params: {
        page,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
