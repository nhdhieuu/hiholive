import axiosInstance from "@/axiosSetup";
import { Channel, UpdateChannel } from "@/types/channel.ts";

interface UpdateChannelResponse {
  data: boolean;
}

interface GetChannelResponse {
  data: Channel;
}

export const updateChannel = async (
  channelId: string,
  body: UpdateChannel,
): Promise<UpdateChannelResponse> => {
  try {
    const response = await axiosInstance.patch<UpdateChannelResponse>(
      `/v1/channel/${channelId}`,
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};

export const getChannel = async (
  username: string,
): Promise<GetChannelResponse> => {
  try {
    const response = await axiosInstance.get<GetChannelResponse>(
      `/v1/channel/user/${username}`,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
};
