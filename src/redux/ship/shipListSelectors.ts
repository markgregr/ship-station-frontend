// shipListSelectors.ts
import { RootState } from "../store";

export const selectshipName = (state: RootState) =>
  state.shipList.shipName as string;
export const selectShipData = (state: RootState) => state.shipList.ships;
export const selectRequestID = (state: RootState) => state.shipList.requestID;
