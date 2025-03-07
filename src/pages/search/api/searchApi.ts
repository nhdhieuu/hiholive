import axiosInstance from "@/axiosSetup.ts";
import { Stream } from "@/types/stream.ts";
import { Channel } from "@/types/channel.ts";
import { Category } from "@/types/category.ts";

interface ListStreamRespone {
  data: Stream[];
}
interface ListChannelResponse {
  data: Channel[];
}
interface ListCategoryResponse {
  data: Category[];
}
interface StreamSearchParams {
  [key: string]: unknown;
}

export const getListStreamSearch = async (
  params: StreamSearchParams,
): Promise<ListStreamRespone> => {
  try {
    const response = await axiosInstance.get<ListStreamRespone>("/v1/stream/", {
      params,
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching stream list:", error);
    throw error;
  }
};
export const getListChannelSearch = async (
  params: StreamSearchParams,
): Promise<ListChannelResponse> => {
  try {
    const response = await axiosInstance.get<ListChannelResponse>(
      "/v1/channel/",
      { params },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching channel list:", error);
    throw error;
  }
};

export const getListCategorySearch = async (
  params: StreamSearchParams,
): Promise<ListCategoryResponse> => {
  try {
    const response = await axiosInstance.get<ListCategoryResponse>(
      "/v1/category/",
      { params },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching category list:", error);
    throw error;
  }
};
