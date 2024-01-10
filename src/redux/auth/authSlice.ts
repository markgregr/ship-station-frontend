import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isAuthenticated: boolean;
  loading: boolean;
  full_name: string | null;
  token: string | null;
  email: string | null;
}

const loadAuthState = (): AuthState => {
  const storedState = localStorage.getItem("authState");
  return storedState ? JSON.parse(storedState) : getInitialState();
};

const getInitialState = (): AuthState => {
  return {
    isAuthenticated: false,
    loading: false,
    full_name: null,
    token: null,
    email: null,
  };
};

const initialState: AuthState = loadAuthState();

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginSuccess: (
      state,
      action: PayloadAction<{ token: string; email: string; full_name: string }>
    ) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.full_name = action.payload.full_name;
      localStorage.setItem("authState", JSON.stringify(state));
    },
    loginStart: (state) => {
      state.loading = true;
    },
    loginFailure: (state) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.token = null;
      state.email = null;
      state.full_name = null;
      localStorage.removeItem("authState");
    },
    logoutSuccess: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      state.full_name = null;
      localStorage.removeItem("authState");
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.token = null;
      state.email = null;
      state.full_name = null;
      localStorage.removeItem("authState");
    },
    registerSuccess: (
      state,
      action: PayloadAction<{ full_name: string; token: string; email: string }>
    ) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.full_name = action.payload.full_name;
      state.token = action.payload.token;
      state.email = action.payload.email;
      state.full_name = action.payload.full_name;
      localStorage.setItem("authState", JSON.stringify(state));
    },
  },
});

export const {
  loginSuccess,
  loginStart,
  loginFailure,
  logoutSuccess,
  logout,
  registerSuccess,
} = authSlice.actions;
export default authSlice.reducer;

export const logoutAsync = () => (dispatch: any) => {
  dispatch(logout());
};
