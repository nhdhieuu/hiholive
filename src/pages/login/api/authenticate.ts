import axiosInstance from "@/axiosSetup.ts";
import { UserProfile } from "@/types/userProfile.ts";

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
interface UserProfileResponse {
  data: UserProfile;
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
export async function getProfile(): Promise<UserProfileResponse> {
  try {
    const response = await axiosInstance.get("/v1/user/profile");
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
