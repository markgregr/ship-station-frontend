// baggageListSelectors.ts
import { RootState } from "../store";

export const selectSearchCode = (state: RootState) =>
  state.baggageList.searchCode as string;
export const selectBaggageData = (state: RootState) =>
  state.baggageList.baggages;
export const selectNoResults = (state: RootState) =>
  state.baggageList.noResults;
export const selectDeliveryID = (state: RootState) =>
  state.baggageList.deliveryID;
export const selectBaggageAdded = (state: RootState) => state.baggageList.added;
export const selectloading = (state: RootState) => state.baggageList.loading;
