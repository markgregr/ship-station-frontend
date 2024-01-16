// deliveryListThunk.ts
import { createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setDeliveries } from "./deliveryListSlice";
import { RootState } from "../store";
import { handleError } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";

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
  // let timer;
  try {
    // timer = setTimeout(() => {
    //   dispatch(loading(true));
    // }, 1000);
    const response = await axios.get("/delivery/", { params });
    dispatch(loading(false));
    // clearTimeout(timer);
    dispatch(setDeliveries(response.data.deliveries));
    return response.data;
  } catch (error) {
    handleError(error, dispatch);
    throw error;
  } finally {
    // clearTimeout(timer);
  }
});
