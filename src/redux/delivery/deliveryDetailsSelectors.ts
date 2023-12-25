// deliveryDetailsSelectors.ts
import { RootState } from "../store";

export const selectDeliveryDetails = (state: RootState) =>
  state.deliveryDetails.data;
