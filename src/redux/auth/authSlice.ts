// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  full_name: string | null;
  token: string | null;
  email: string | null;
}

const initialState: AuthState = {
  isAuthenticated: false,
  full_name: null,
  token: null,
  email: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; email: string }>
    ) => {
      state.isAuthenticated = true;
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem("access_token", action.payload.token);
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("access_token");
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("access_token");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      localStorage.removeItem("access_token");
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ full_name: string; token: string; email: string }>
    ) => {
      state.isAuthenticated = true;
      state.full_name = action.payload.full_name;
      state.token = action.payload.token;
      state.email = action.payload.email;
      localStorage.setItem("access_token", action.payload.token);
    },
  },
});

export const {
  loginSuccess,
  loginFailure,
  logoutSuccess,
  logout,
  registerSuccess,
} = authSlice.actions;
export default authSlice.reducer;

export const logoutAsync = () => (dispatch: any) => {
  dispatch(logout());
};
