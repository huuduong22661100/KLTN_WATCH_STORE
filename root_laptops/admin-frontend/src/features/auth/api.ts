import { LoginPayload, AuthSuccessResponse } from "./types";

const API_BASE_URL = "http://localhost:5000/api/v1/users"; // Backend API URL

export const loginApi = async (payload: LoginPayload): Promise<AuthSuccessResponse> => {
  const res = await fetch(`${API_BASE_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  const data: AuthSuccessResponse = await res.json();

  if (!res.ok) {
    // Backend sends success: false and message on error
    throw new Error(data.message || "Đăng nhập thất bại");
  }
  return data;
};
