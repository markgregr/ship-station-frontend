// authActions.ts
import { createAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

export const logout = createAction<{ navigate: NavigateFunction }>(
  "auth/logout"
);

export const register = createAction<{
  email: string;
  password: string;
  full_name: string;
  navigate: NavigateFunction;
}>("auth/register");

export const login = createAction<{
  email: string;
  password: string;
  navigate: NavigateFunction;
}>("auth/login");
