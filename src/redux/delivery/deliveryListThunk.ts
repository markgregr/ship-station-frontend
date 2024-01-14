// deliveryListThunk.ts
import { createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { loadingStart, setDeliveries, setNoResults } from "./deliveryListSlice";
import { RootState } from "../store";

interface GetDeliveriesParams {
  startFormationDate: string | null;
  endFormationDate: string | null;
  deliveryStatus: string | null;
  searchFlightNumber: string | null;
}

export const getDeliveries = createAsyncThunk<
  any,
  GetDeliveriesParams,
  { state: RootState; dispatch: ThunkDispatch<RootState, any, any> }
>("delivery/getDeliveries", async (params, { dispatch }) => {
  try {
    dispatch(loadingStart());
    const response = await axios.get("/delivery/", { params });
    dispatch(setNoResults(false));
    dispatch(setDeliveries(response.data.deliveries));
    return response.data;
  } catch (error) {
    dispatch(setNoResults(true));
    throw error;
  }
});
