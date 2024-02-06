//store.ts;
import { configureStore } from "@reduxjs/toolkit";
import authMiddleware from "./auth/authMiddleware";
import authReducer from "./auth/authSlice";
import shipListReducer from "./ship/shipListSlice";
import shipDetailsReducer from "./ship/shipDetailsSlice";
import requestListReducer from "./request/requestListSlice";
import requestDetailsReducer from "./request/requestDetailsSlice";
import additionalReducer from "./additional/additionalSlice";
const store = configureStore({
  reducer: {
    auth: authReducer,
    shipList: shipListReducer,
    shipDetails: shipDetailsReducer,
    requestList: requestListReducer,
    requestDetails: requestDetailsReducer,
    additional: additionalReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
