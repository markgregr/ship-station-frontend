// authThunks.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Базовый URL API
const API_BASE_URL = "/api";

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        return { email }; // Возвращаем данные о пользователе
      } else {
        throw new Error("Authentication failed");
      }
    } catch (error) {
      throw error;
    }
  }
);
