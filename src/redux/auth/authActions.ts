// authActions.ts
import { createAction } from "@reduxjs/toolkit";

export const logout = createAction("auth/logout");

export const register = createAction<{
  full_name: string;
  email: string;
  password: string;
}>("auth/register");
export const login = createAction<{ email: string; password: string }>(
  "auth/login"
);
