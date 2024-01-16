// baggageDetailsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setBaggageDetails } from "./baggageDetailsSlice";
import { handleError } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";

interface BaggageDetailsResponse {
  airline: string;
  baggage_code: string;
  baggage_id: number;
  baggage_status: string;
  baggage_type: string;
  owner_name: string;
  pasport_details: string;
  photo: string;
  size: string;
  weight: number;
}

export const getBaggageDetails = createAsyncThunk<
  BaggageDetailsResponse,
  string
>("baggageDetails/getBaggageDetails", async (id, { dispatch }) => {
  try {
    const timer = setTimeout(() => {
      dispatch(loading(true));
    }, 250);
    const response = await axios.get<BaggageDetailsResponse>(`/baggage/${id}`);
    dispatch(loading(false));
    clearTimeout(timer);
    dispatch(setBaggageDetails(response.data));
    return response.data;
  } catch (error) {
    handleError(error, dispatch);
    throw error;
  }
});
