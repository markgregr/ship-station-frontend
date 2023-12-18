// baggageDetailsSelectors.ts
import { RootState } from "../store";

export const selectBaggageDetails = (state: RootState) =>
  state.baggageDetails.data;
