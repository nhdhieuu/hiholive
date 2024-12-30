import { Paging } from "@/types/paging.ts";
import axiosInstance from "@/axiosSetup.ts";
import { Setting } from "@/types/setting.ts";

interface AdminSettingResponse {
  data: Setting[];
  paging: Paging;
}

export async function getAdminSetting(
  page: number,
): Promise<AdminSettingResponse> {
  try {
    const response = await axiosInstance.get<AdminSettingResponse>(
      "/v1/setting/",
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
