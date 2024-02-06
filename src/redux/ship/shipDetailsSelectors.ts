// shipDetailsSelectors.ts
import { RootState } from "../store";

export const selectShipDetails = (state: RootState) => state.shipDetails.data;
export const selectUpdateFormData = (state: RootState) =>
  state.shipDetails.formData;
