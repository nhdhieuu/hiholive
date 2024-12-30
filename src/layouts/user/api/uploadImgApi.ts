import { Image } from "@/types/image.ts";
import axiosInstance from "@/axiosSetup.ts";

interface ImageResponse {
  data: Image;
}

export async function uploadImg(file: File): Promise<ImageResponse> {
  try {
    const formData = new FormData();
    formData.append("file", file);
    const response = await axiosInstance.post<ImageResponse>(
      "/v1/upload/image",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
