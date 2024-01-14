// deliveryDetailsSelectors.ts
import { RootState } from "../store";

export const selectDeliveryDetails = (state: RootState) =>
  state.deliveryDetails.data;
export const selectFlightNumber = (state: RootState) =>
  state.deliveryDetails.flight_number;
export const selectloading = (state: RootState) =>
  state.deliveryDetails.loading;
export const selectError = (state: RootState) => state.deliveryDetails.error;
