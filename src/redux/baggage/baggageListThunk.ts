// baggageListThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import {
  setNoResults,
  setBaggageData,
  setDeliveryID,
  Baggage,
  setBaggageAdded,
  setRemoveBaggage,
  loadingStart,
} from "./baggageListSlice";

interface GetBaggagesRepsonse {
  baggages: Baggage[];
  deliveryID: number;
}

export const getBaggageList = createAsyncThunk<GetBaggagesRepsonse, string>(
  "baggageList/getBaggageList",
  async (searchCode, { dispatch }) => {
    try {
      dispatch(loadingStart());
      const response = await axios.get<GetBaggagesRepsonse>(
        `/baggage/?searchCode=${searchCode}`
      );
      dispatch(setNoResults(false));
      dispatch(setBaggageData(response.data.baggages));
      dispatch(setDeliveryID(response.data.deliveryID));

      return response.data;
    } catch (error) {
      dispatch(setNoResults(true));
      return { baggages: [], deliveryID: 0 };
    }
  }
);

export const addDelivery = createAsyncThunk<void, number>(
  "baggageList/addDelivery",
  async (baggageID, { dispatch }) => {
    try {
      dispatch(loadingStart()); // Начало загрузки

      const response = await axios.post(`/baggage/${baggageID}/delivery`);
      dispatch(setBaggageData(response.data.baggages));
      dispatch(setDeliveryID(response.data.deliveryID));
      dispatch(setBaggageAdded(baggageID));
    } catch (error) {
      console.error("Error adding delivery:", error);
      throw error;
    }
  }
);

export const deleteDelivery = createAsyncThunk<void, number>(
  "baggageList/deleteDelivery",
  async (baggageID, { dispatch }) => {
    try {
      dispatch(loadingStart()); // Начало загрузки
      await axios.delete(`/baggage/${baggageID}/delivery`);
      dispatch(setRemoveBaggage(baggageID)); // Обновляем список багажей после удаления доставки
    } catch (error) {
      console.error("Error deleting delivery:", error);
    }
  }
);
