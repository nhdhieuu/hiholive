import { Paging } from "@/types/paging.ts";
import axiosInstance from "@/axiosSetup.ts";
import { Setting } from "@/types/setting.ts";

interface AdminSettingResponse {
  data: Setting[];
  paging: Paging;
}
interface AdminSettingUpdateResponse {
  data: boolean;
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

export async function updateAdminSetting(
  name: string,
  value: string,
): Promise<AdminSettingUpdateResponse> {
  try {
    const response = await axiosInstance.patch<AdminSettingUpdateResponse>(
      `/v1/setting/${name}`,
      {
        value,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Update error:", error);
    throw error;
  }
}
