import axiosInstance from "@/axiosSetup";

interface ForgotPasswordResponse {
  data: boolean;
}

export async function sendMail(body: {
  email: string;
}): Promise<ForgotPasswordResponse> {
  try {
    const response = await axiosInstance.post<ForgotPasswordResponse>(
      "/v1/auth/forgot-password",
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}

export async function checkResetPin(body: {
  email: string;
  pin: string;
}): Promise<ForgotPasswordResponse> {
  try {
    const response = await axiosInstance.post<ForgotPasswordResponse>(
      "/v1/auth/check-reset-password-pin",
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
export async function resetPassword(body: {
  email: string;
  pin: string;
  password: string;
}): Promise<ForgotPasswordResponse> {
  try {
    const response = await axiosInstance.post<ForgotPasswordResponse>(
      "/v1/auth/reset-password",
      body,
    );
    return response.data;
  } catch (error) {
    console.error("Fetch error:", error);
    throw error;
  }
}
