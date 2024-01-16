// deliveryListSelectors.ts
import { RootState } from "../store";

export const selectStartFormationDate = (state: RootState) =>
  state.deliveryList.startFormationDate;

export const selectEndFormationDate = (state: RootState) =>
  state.deliveryList.endFormationDate;

export const selectDeliveryStatus = (state: RootState) =>
  state.deliveryList.deliveryStatus;

export const selectsearchFlightNumber = (state: RootState) =>
  state.deliveryList.searchFlightNumber;

export const selectDeliveries = (state: RootState) =>
  state.deliveryList.deliveries;
