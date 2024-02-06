// requestDetailsSelectors.ts
import { RootState } from "../store";

export const selectRequestDetails = (state: RootState) =>
  state.requestDetails.data;
