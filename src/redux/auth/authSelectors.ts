// authSelectors.ts
import { RootState } from "../store";

export const selectIsAuthenticated = (state: RootState) =>
  state.auth.isAuthenticated;
// Добавьте другие селекторы, если необходимо
