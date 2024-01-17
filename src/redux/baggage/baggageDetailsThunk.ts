// baggageDetailsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setBaggageDetails } from "./baggageDetailsSlice";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";
import { Baggage } from "./baggageListSlice";
import { NavigateFunction } from "react-router-dom";

interface BaggageDetailsResponse {
  airline: string;
  baggage_code: string;
  baggage_id: number;
  baggage_status: string;
  baggage_type: string;
  owner_name: string;
  pasport_details: string;
  photo_url: string;
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

export interface BaggageRequest {
  airline: string;
  baggage_code: string;
  baggage_type: string;
  owner_name: string;
  pasport_details: string;
  size: string;
  weight: number;
}

interface UpdateBaggagePayload {
  id: number; // Используем id как идентификатор багажа
  baggage: BaggageRequest; // Используем BaggageRequest для передачи данных
  navigate?: NavigateFunction | undefined;
}

export const updateBaggage = createAsyncThunk<
  BaggageDetailsResponse,
  UpdateBaggagePayload
>("baggageDetails/updateBaggage", async (payload, { dispatch }) => {
  try {
    const { navigate, ...restPayload } = payload;
    const timer = setTimeout(() => {
      dispatch(loading(true));
    }, 250);

    const response = await axios.put<BaggageDetailsResponse>(
      `/baggage/${payload.id}`,
      payload.baggage
    );

    dispatch(loading(false));
    clearTimeout(timer);
    dispatch(setBaggageDetails(response.data));

    if (navigate) {
      navigate("/baggage");
    }
    handleSuccess(response, dispatch);
    return response.data;
  } catch (error) {
    handleError(error, dispatch);
    throw error;
  }
});

export const updateBaggageImage = createAsyncThunk<
  BaggageDetailsResponse,
  { id: number; imageData: FormData }
>(
  "baggageDetails/createBaggageWithImage",
  async ({ id, imageData }, { dispatch }) => {
    try {
      const timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);

      const response = await axios.post<BaggageDetailsResponse>(
        `/baggage/${id}/image`,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setBaggageDetails(response.data));
      handleSuccess(response, dispatch);
      return response.data;
    } catch (error) {
      handleError(error, dispatch);
      throw error;
    }
  }
);
