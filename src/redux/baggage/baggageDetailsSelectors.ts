// baggageDetailsSelectors.ts
import { RootState } from "../store";

export const selectBaggageDetails = (state: RootState) =>
  state.baggageDetails.data;
export const selectUpdateFormData = (state: RootState) =>
  state.baggageDetails.formData;
