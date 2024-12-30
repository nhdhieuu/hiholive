import { Channel } from "@/types/channel.ts";
import axiosInstance from "@/axiosSetup.ts";

interface ChannelResponse {
  data: Channel;
}

export async function getChannelByUsername(
  username: string,
): Promise<ChannelResponse> {
  try {
    const response = await axiosInstance.get<ChannelResponse>(
      `/v1/channel/user/${username}`,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
