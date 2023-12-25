// authSelectors.ts
import { RootState } from "../store";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
export const selectfull_name = (state: RootState) => state.auth.full_name;
// Добавьте другие селекторы, если необходимо
