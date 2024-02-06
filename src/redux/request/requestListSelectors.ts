// requestListSelectors.ts
import { RootState } from "../store";

export const selectStartFormationDate = (state: RootState) =>
  state.requestList.startFormationDate;

export const selectEndFormationDate = (state: RootState) =>
  state.requestList.endFormationDate;

export const selectRequestStatus = (state: RootState) =>
  state.requestList.requestStatus;

export const selectRequests = (state: RootState) => state.requestList.requests;

export const selectOwnerName = (state: RootState) =>
  state.requestList.ownerName;
