// authMiddleware.ts
import { Middleware } from "redux";
import { login, logout, register } from "./authActions";
import {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  registerSuccess,
} from "./authSlice";
import axios from "../../utils/axiosConfig";

const authMiddleware: Middleware = (store) => (next) => async (action) => {
  if (login.match(action)) {
    try {
      const { email, password } = action.payload;
      const response = await axios.post(`/user/login`, {
        email,
        password,
      });

      if (response.status === 200) {
        store.dispatch(
          loginSuccess({ token: response.data.access_token, email })
        );
      } else {
        store.dispatch(loginFailure());
      }
    } catch (error) {
      console.error("Error during login:", error);
      store.dispatch(loginFailure());
    }
  } else if (logout.match(action)) {
    store.dispatch(logoutSuccess());
  } else if (register.match(action)) {
    try {
      const { full_name, email, password } = action.payload;
      const response = await axios.post(`/user/register`, {
        full_name,
        email,
        password,
      });

      if (response.status === 200) {
        store.dispatch(
          registerSuccess({
            full_name,
            token: response.data.access_token,
            email,
          })
        );
      } else {
        store.dispatch(loginFailure());
      }
    } catch (error) {
      console.error("Error during registration:", error);
      store.dispatch(loginFailure());
    }
  }

  return next(action);
};

export default authMiddleware;
