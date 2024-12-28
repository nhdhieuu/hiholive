import axiosInstance from "@/axiosSetup.ts";
import { Stream } from "@/types/stream.ts";

interface ListStreamRespones {
  data: Stream[];
}

interface StreamSearchParams {
  [key: string]: unknown;
}

export const getListStreamSearch = async (
  params: StreamSearchParams,
): Promise<ListStreamRespones> => {
  try {
    const response = await axiosInstance.get<ListStreamRespones>(
      "/v1/stream/",
      { params },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching stream list:", error);
    throw error;
  }
};
