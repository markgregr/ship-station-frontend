// baggageListThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import {
  setBaggageData,
  setDeliveryID,
  Baggage,
  setRemoveBaggage,
} from "./baggageListSlice";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";

interface GetBaggagesRepsonse {
  baggages: Baggage[];
  deliveryID: number;
}

export const getBaggageList = createAsyncThunk<GetBaggagesRepsonse, string>(
  "baggageList/getBaggageList",
  async (searchCode, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.get<GetBaggagesRepsonse>(
        `/baggage/?searchCode=${searchCode}`
      );
      dispatch(setBaggageData(response.data.baggages));
      dispatch(setDeliveryID(response.data.deliveryID));
      return response.data;
    } catch (error) {
      handleError(error, dispatch);
      return { baggages: [], deliveryID: 0 };
    } finally {
      clearTimeout(timer);
    }
  }
);

export const addDelivery = createAsyncThunk<void, number>(
  "baggageList/addDelivery",
  async (baggageID, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.post(`/baggage/${baggageID}/delivery`);
      dispatch(setBaggageData(response.data.baggages));
      dispatch(setDeliveryID(response.data.deliveryID));
      handleSuccess(response, dispatch);
    } catch (error: any) {
      handleError(error, dispatch);
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }
);

export const deleteDelivery = createAsyncThunk<void, number>(
  "baggageList/deleteDelivery",
  async (baggageID, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.delete(`/baggage/${baggageID}/delivery`);
      dispatch(setRemoveBaggage(baggageID));
      handleSuccess(response, dispatch);
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      clearTimeout(timer);
    }
  }
);
