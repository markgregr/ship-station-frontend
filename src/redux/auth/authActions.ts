// authActions.ts
import { createAction } from "@reduxjs/toolkit";

export const login = createAction<{ email: string; password: string }>(
  "auth/login"
);
export const logout = createAction("auth/logout");
