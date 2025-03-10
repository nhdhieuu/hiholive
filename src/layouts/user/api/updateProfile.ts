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
    const response = await axiosInstance.patch<UpdateProfileResponse>(
      `/v1/user/${id}`,
      userUpdate,
    );
    return response.data;
  } catch (error) {
    console.error("Update profile failed:", error);
    throw error;
  }
}

interface UpdateUsernameBody {
  user_name: string;
  display_name: string;
}

export async function updateUsername(
  id: string,
  body: UpdateUsernameBody,
): Promise<UpdateProfileResponse> {
  try {
    const response = await axiosInstance.patch<UpdateProfileResponse>(
      `/v1/user/${id}?type=name`,
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Update profile failed:", error);
    throw error;
  }
}
