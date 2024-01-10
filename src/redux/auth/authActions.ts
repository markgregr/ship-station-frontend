// authActions.ts
import { createAction } from "@reduxjs/toolkit";

export const logout = createAction("auth/logout");

export const register = createAction<{
  email: string;
  password: string;
  full_name: string;
}>("auth/register");
export const login = createAction<{ email: string; password: string }>(
  "auth/login"
);
