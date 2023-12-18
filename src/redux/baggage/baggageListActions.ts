// baggageListActions.ts
import { createAction } from "@reduxjs/toolkit";

export const setSearchCode = createAction<string>("baggageList/setSearchCode");
export const setBaggageData = createAction<any[]>("baggageList/setBaggageData");
export const setNoResults = createAction<boolean>("baggageList/setNoResults");
