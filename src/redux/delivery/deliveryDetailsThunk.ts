import { createAsyncThunk } from "@reduxjs/toolkit";
import axios, { isAxiosError } from "../../utils/axiosConfig";
import {
  loadingStart,
  setDeliveryDetails,
  setError,
} from "./deliveryDetailsSlice";
import { AxiosError } from "axios";

export const getDeliveryDetails = createAsyncThunk(
  "delivery/getDeliveryDetails",
  async (id: string, { dispatch }) => {
    try {
      dispatch(loadingStart());
      const response = await axios.get(`/delivery/${id}`);
      dispatch(setDeliveryDetails(response.data.delivery));
      return response.data.delivery;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const axiosError = error as AxiosError<{ error: string }, any>; // Уточняем тип
        const errorMessage =
          axiosError.response?.data.error || "An unexpected error occurred.";
        dispatch(setError(errorMessage));
      } else {
        dispatch(setError("An unexpected error occurred."));
      }
    }
  }
);

export const deleteDraftDelivery = createAsyncThunk(
  "delivery/deleteDelivery",
  async (id: string, { dispatch }) => {
    try {
      dispatch(loadingStart());
      const response = await axios.delete(`/delivery/${id}`);
      dispatch(setDeliveryDetails(response.data));
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const axiosError = error as AxiosError<{ error: string }, any>; // Уточняем тип
        const errorMessage =
          axiosError.response?.data.error || "An unexpected error occurred.";
        dispatch(setError(errorMessage));
      } else {
        dispatch(setError("An unexpected error occurred."));
      }
    }
  }
);

export const formDelivery = createAsyncThunk(
  "delivery/formDelivery",
  async (id: string, { dispatch }) => {
    try {
      dispatch(loadingStart());
      const response = await axios.put(`/delivery/${id}/status/user`);
      dispatch(setDeliveryDetails(response.data));
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const axiosError = error as AxiosError<{ error: string }, any>; // Уточняем тип
        const errorMessage =
          axiosError.response?.data.error || "An unexpected error occurred.";
        dispatch(setError(errorMessage));
      } else {
        dispatch(setError("An unexpected error occurred."));
      }
    }
  }
);

export const updateFlightNumber = createAsyncThunk(
  "delivery/updateFlightNumber",
  async (
    { id, flight_number }: { id: string; flight_number: string },
    { dispatch }
  ) => {
    try {
      dispatch(loadingStart());
      const response = await axios.put(`/delivery/${id}`, {
        flight_number,
      });
      dispatch(setDeliveryDetails(response.data));
      return response.data;
    } catch (error) {
      if (isAxiosError(error) && error.response) {
        const axiosError = error as AxiosError<{ error: string }, any>; // Уточняем тип
        const errorMessage =
          axiosError.response?.data.error || "An unexpected error occurred.";
        dispatch(setError(errorMessage));
      } else {
        dispatch(setError("An unexpected error occurred."));
      }
    }
  }
);
