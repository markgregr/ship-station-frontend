import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setDeliveryDetails } from "./deliveryDetailsSlice";

export const getDeliveryDetails = createAsyncThunk(
  "delivery/getDeliveryDetails",
  async (id: string, { dispatch }) => {
    try {
      const response = await axios.get(`/delivery/${id}`);
      dispatch(setDeliveryDetails(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const deleteDraftDelivery = createAsyncThunk(
  "delivery/deleteDelivery",
  async (id: string, { dispatch }) => {
    try {
      const response = await axios.delete(`/delivery/${id}/delete`);
      dispatch(setDeliveryDetails(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);

export const formDelivery = createAsyncThunk(
  "delivery/formDelivery",
  async (id: string, { dispatch }) => {
    try {
      const response = await axios.put(`/delivery/${id}/status/user`);
      dispatch(setDeliveryDetails(response.data));
      return response.data;
    } catch (error) {
      throw error;
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
      const response = await axios.put(`/delivery/${id}/update`, {
        flight_number,
      });
      dispatch(setDeliveryDetails(response.data));
      return response.data;
    } catch (error) {
      throw error;
    }
  }
);
