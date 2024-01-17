// baggageListSelectors.ts
import { RootState } from "../store";

export const selectsearchCode = (state: RootState) =>
  state.baggageList.searchCode as string;
export const selectBaggageData = (state: RootState) =>
  state.baggageList.baggages;
export const selectDeliveryID = (state: RootState) =>
  state.baggageList.deliveryID;
export const selectFormData = (state: RootState) => state.baggageList.formData;
