import axiosInstance from "@/axiosSetup";
import { StreamDetailResponse } from "@/types/streamDetail.ts";

export async function getStreamDetail(
  streamId: string,
): Promise<StreamDetailResponse> {
  try {
    const response = await axiosInstance.get<StreamDetailResponse>(
      `/v1/stream/${streamId}`,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
