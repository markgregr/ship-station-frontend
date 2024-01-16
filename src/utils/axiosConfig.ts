// utils/axiosConfig.js
import axios from "axios";

const instance = axios.create({
  baseURL: "/api", // ваш базовый URL API
});

instance.interceptors.request.use(
  (config) => {
    const authStateString = localStorage.getItem("authState");
    const authState = authStateString ? JSON.parse(authStateString) : null;
    const token =
      authState && typeof authState === "object" ? authState.token : null;
    console.log(token);
    if (token) {
      config.headers.Authorization = `${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;
