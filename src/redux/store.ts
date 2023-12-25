// store.ts
import { configureStore } from "@reduxjs/toolkit";
import authMiddleware from "./auth/authMiddleware";
import authReducer from "./auth/authSlice";
import baggageListReducer from "./baggage/baggageListSlice";
import baggageDetailsReducer from "./baggage/baggageDetailsSlice";
import deliveryListReducer from "./delivery/deliveryListSlice";
import deliveryDetailsReducer from "./delivery/deliveryDetailsSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    baggageList: baggageListReducer,
    baggageDetails: baggageDetailsReducer,
    deliveryList: deliveryListReducer,
    deliveryDetails: deliveryDetailsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(authMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
