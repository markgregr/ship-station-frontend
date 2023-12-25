import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { logoutSuccess } from "./authSlice";

interface LoginResponse {
  access_token: string;
  email: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post<LoginResponse>(`/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        return {
          token: response.data.access_token,
          email: response.data.email,
        };
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      throw error;
    }
  }
);

// Синхронный экшен для выхода из системы
export const logout = () => {
  return (dispatch: any) => {
    dispatch(logoutSuccess());
  };
};
