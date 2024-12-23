import axiosInstance from "@/axiosSetup.ts";

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  data: string;
}

export async function register(
  body: RegisterRequest,
): Promise<RegisterResponse> {
  try {
    const response = await axiosInstance.post<RegisterResponse>(
      "/v1/auth/register",
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
