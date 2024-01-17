import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setDeliveryDetails } from "./deliveryDetailsSlice";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { setDeliveryID } from "../baggage/baggageListSlice";
import { loading } from "../additional/additionalSlice";

export const getDeliveryDetails = createAsyncThunk(
  "delivery/getDeliveryDetails",
  async (id: string, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.get(`/delivery/${id}`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setDeliveryDetails(response.data.delivery));
      return response.data.delivery;
    } catch (error) {
      handleError(error, dispatch);
      throw error; // Необходимо бросить ошибку снова, чтобы сигнализировать об ошибке в вызывающем коде
    } finally {
      clearTimeout(timer);
    }
  }
);

export const deleteDraftDelivery = createAsyncThunk(
  "delivery/deleteDelivery",
  async (id: string, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.delete(`/delivery/${id}`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setDeliveryDetails(response.data.delivery));
      handleSuccess(response, dispatch);
      return response.data.delivery;
    } catch (error) {
      handleError(error, dispatch);
      throw error; // Необходимо бросить ошибку снова, чтобы сигнализировать об ошибке в вызывающем коде
    } finally {
      clearTimeout(timer);
    }
  }
);

export const formDelivery = createAsyncThunk(
  "delivery/formDelivery",
  async (id: string, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.put(`/delivery/${id}/status/user`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setDeliveryID(0));
      dispatch(setDeliveryDetails(response.data.delivery));
      handleSuccess(response, dispatch);
      return response.data.delivery;
    } catch (error) {
      handleError(error, dispatch);
      throw error; // Необходимо бросить ошибку снова, чтобы сигнализировать об ошибке в вызывающем коде
    } finally {
      clearTimeout(timer);
    }
  }
);

export const updateFlightNumber = createAsyncThunk(
  "delivery/updateFlightNumber",
  async (
    { id, flight_number }: { id: string; flight_number: string },
    { dispatch }
  ) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.put(`/delivery/${id}`, {
        flight_number,
      });
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setDeliveryDetails(response.data.delivery));
      handleSuccess(response, dispatch);
      return response.data.delivery;
    } catch (error) {
      handleError(error, dispatch);
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
);

export const updateDeliveryStatusForModerator = createAsyncThunk(
  "delivery/updateDeliveryStatusForModerator",
  async (
    {
      deliveryId,
      deliveryStatus,
    }: { deliveryId: string; deliveryStatus: string },
    { dispatch }
  ) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.put(
        `/delivery/${deliveryId}/status/moderator`,
        {
          delivery_status: deliveryStatus,
        }
      );
      dispatch(loading(false));
      clearTimeout(timer);
      // Можно добавить дополнительные действия, если нужно
      handleSuccess(response, dispatch);
      return response.data.delivery;
    } catch (error) {
      handleError(error, dispatch);
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
);
