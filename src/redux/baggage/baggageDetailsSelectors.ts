// baggageDetailsSelectors.ts
import { RootState } from "../store";

export const selectBaggageDetails = (state: RootState) =>
  state.baggageDetails.data;
export const selectloading = (state: RootState) => state.baggageDetails.loading;
