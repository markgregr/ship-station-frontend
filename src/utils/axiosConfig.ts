// utils/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // ваш базовый URL API
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token"); // предполагается, что вы сохраняете токен в localStorage после успешной авторизации
  if (token) {
    config.headers.Authorization = `${token}`;
  }
  return config;
});

export default instance;
