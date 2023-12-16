// authMiddleware.ts
import { Middleware } from "redux";
import { login, logout } from "./authActions";
import { loginSuccess, loginFailure } from "./authSlice";
import axios from "axios";

// Базовый URL API
const API_BASE_URL = "/api";

const authMiddleware: Middleware = (store) => (next) => async (action) => {
  if (login.match(action)) {
    try {
      const { email, password } = action.payload;
      const response = await axios.post(`${API_BASE_URL}/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        store.dispatch(loginSuccess());
      } else {
        store.dispatch(loginFailure());
      }
    } catch (error) {
      console.error("Error during login:", error);
      store.dispatch(loginFailure());
    }
  } else if (logout.match(action)) {
    // Обработка логики для выхода
    // Например, очистка данных о пользователе в состоянии
  }

  return next(action);
};

export default authMiddleware;
