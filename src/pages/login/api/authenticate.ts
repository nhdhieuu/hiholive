import axiosInstance from "@/axiosSetup.ts";

export interface LoginRequest {
  username: string;
  password: string;
}

export interface AccessToken {
  token: string;
  expiredIn: number;
}

export interface LoginResponse {
  accessToken: AccessToken;
}

export async function authenticate(body: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/v1/auth/login/",
      body,
    );
    return response.data.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
