// baggageListSelectors.ts
import { RootState } from "../store";

export const selectSearchCode = (state: RootState) =>
  state.baggageList.searchCode as string;
export const selectBaggageData = (state: RootState) =>
  state.baggageList.baggageData;
export const selectNoResults = (state: RootState) =>
  state.baggageList.noResults;
