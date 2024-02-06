// shipListActions.ts
import { createAction } from "@reduxjs/toolkit";

export const setshipName = createAction<string>("shipList/setshipName");
export const setShipData = createAction<any[]>("shipList/setShipData");
export const setNoResults = createAction<boolean>("shipList/setNoResults");
export const setRequestID = createAction<number>("shipList/setRequestID");
export const setShipAdded = createAction<number>("shipList/setShipAdded");
export const setRemoveShip = createAction<number>("shipList/setRemoveShip");
