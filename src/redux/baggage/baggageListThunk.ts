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
} from "./baggageListSlice";

interface GetBaggagesRepsonse {
  baggages: Baggage[];
  deliveryID: number;
}

export const getBaggageList = createAsyncThunk<GetBaggagesRepsonse, string>(
  "baggageList/getBaggageList",
  async (searchCode, { dispatch }) => {
    try {
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
      const response = await axios.post(`/baggage/${baggageID}/delivery`);
      dispatch(setBaggageAdded(baggageID)); // Обновляем список добавленных багажей
    } catch (error) {
      console.error("Error adding delivery:", error);
    }
  }
);

export const deleteDelivery = createAsyncThunk<void, number>(
  "baggageList/deleteDelivery",
  async (baggageID, { dispatch }) => {
    try {
      await axios.delete(`/baggage/${baggageID}/delivery/delete`);
      dispatch(setRemoveBaggage(baggageID)); // Обновляем список багажей после удаления доставки
    } catch (error) {
      console.error("Error deleting delivery:", error);
    }
  }
);
