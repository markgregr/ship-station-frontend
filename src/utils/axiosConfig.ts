// utils/axiosConfig.js
import axios, { AxiosError } from "axios";

const instance = axios.create({
  baseURL: "/api", // ваш базовый URL API
});

instance.interceptors.request.use(
  (config) => {
    const authStateString = localStorage.getItem("authState");
    const authState = authStateString ? JSON.parse(authStateString) : null;
    const token =
      authState && typeof authState === "object" ? authState.token : null;

    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
// Функция для проверки, является ли объект AxiosError
export function isAxiosError(error: any): error is AxiosError {
  return error.isAxiosError === true;
}

export default instance;
