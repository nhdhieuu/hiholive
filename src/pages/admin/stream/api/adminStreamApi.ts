import { Stream } from "@/types/stream.ts";
import { Paging } from "@/types/paging.ts";
import axiosInstance from "@/axiosSetup.ts";

interface AdminStreamResponse {
  data: Stream[];
  paging: Paging;
}

export async function getAdminStreams(
  page: number,
): Promise<AdminStreamResponse> {
  try {
    const response = await axiosInstance.get<AdminStreamResponse>(
      "/v1/stream/",
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
