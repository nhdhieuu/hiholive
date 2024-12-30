import { UserUpdate } from "@/types/user.ts";
import axiosInstance from "@/axiosSetup.ts";

export interface UpdateProfileResponse {
  data: boolean;
}

export async function updateProfile(
  id: string,
  userUpdate: UserUpdate,
): Promise<UpdateProfileResponse> {
  try {
    const response = await axiosInstance.put<UpdateProfileResponse>(
      `/v1/user/${id}/`,
      userUpdate,
    );
    return response.data;
  } catch (error) {
    console.error("Update profile failed:", error);
    throw error;
  }
}
