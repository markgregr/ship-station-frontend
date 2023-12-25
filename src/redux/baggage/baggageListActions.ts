// baggageListActions.ts
import { createAction } from "@reduxjs/toolkit";

export const setSearchCode = createAction<string>("baggageList/setSearchCode");
export const setBaggageData = createAction<any[]>("baggageList/setBaggageData");
export const setNoResults = createAction<boolean>("baggageList/setNoResults");
export const setDeliveryID = createAction<number>("baggageList/setDeliveryID");
export const setBaggageAdded = createAction<number>(
  "baggageList/setBaggageAdded"
);
export const setRemoveBaggage = createAction<number>(
  "baggageList/setRemoveBaggage"
);
