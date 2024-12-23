import axiosInstance from "@/axiosSetup.ts";

export interface LoginRequest {
  email: string;
  password: string;
}
interface AccessToken {
  accessToken: AccessTokenData;
}
interface AccessTokenData {
  token: string;
  expiresIn: number;
}

interface LoginResponse {
  data: AccessToken;
}

export async function authenticate(body: LoginRequest): Promise<LoginResponse> {
  try {
    const response = await axiosInstance.post<LoginResponse>(
      "/v1/auth/login",
      body,
    );
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
