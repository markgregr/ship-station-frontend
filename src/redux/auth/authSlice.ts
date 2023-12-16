// authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (state) => {
      state.isAuthenticated = true;
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
    },
    // Добавьте другие reducers, если необходимо
  },
});

export const { loginSuccess, loginFailure } = authSlice.actions;
export default authSlice.reducer;
