import axiosInstance from "@/axiosSetup.ts";

export interface CreateStreamRequest {
  title: string;
  description: string;
  notification: string;
  isRerun: boolean;
  scheduledStartTime: Date;
}
interface CreateStreamResponseData {
  streamKey: string;
  rtmpLink: string;
}
interface CreateStreamResponse {
  data: CreateStreamResponseData;
}
export async function createStream(
  body: CreateStreamRequest,
): Promise<CreateStreamResponse> {
  try {
    const response = await axiosInstance.post<CreateStreamResponse>(
      "/v1/stream/",
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
