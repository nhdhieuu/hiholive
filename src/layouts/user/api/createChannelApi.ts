import axiosInstance from "@/axiosSetup";
import { CreateChannel } from "@/types/channel";

interface CreateChannelResponse {
  data: string;
}
export async function createChannelApi(
  channel: CreateChannel,
): Promise<CreateChannelResponse> {
  try {
    const response = await axiosInstance.post<CreateChannelResponse>(
      "/v1/channel/",
      channel,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
