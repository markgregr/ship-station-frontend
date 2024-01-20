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
import { NavigateFunction } from "react-router";

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

export const addDelivery = createAsyncThunk<
  void,
  { baggageID: number; searchCode: string }
>(
  "baggageList/addDelivery",
  async ({ baggageID, searchCode }, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.post(`/baggage/${baggageID}/delivery`);
      handleSuccess(response, dispatch);

      // После успешного добавления доставки вызываем метод getBaggageList
      dispatch(getBaggageList(searchCode));
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
export const deleteBaggage = createAsyncThunk<void, number>(
  "baggageList/deleteBaggage",
  async (baggageID, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.delete(`/baggage/${baggageID}`);
      dispatch(setBaggageData(response.data.baggages));
      dispatch(setDeliveryID(response.data.deliveryID));
      handleSuccess(response, dispatch);
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      clearTimeout(timer);
    }
  }
);

interface CreateBaggagePayload {
  airline: string;
  baggage_code: string;
  baggage_type: string;
  owner_name: string;
  pasport_details: string;
  size: string;
  weight: number;
  navigate?: NavigateFunction;
}

export const createBaggage = createAsyncThunk<
  GetBaggagesRepsonse,
  CreateBaggagePayload
>("baggageDetails/createBaggage", async (payload, { dispatch }) => {
  try {
    const { navigate, ...restPayload } = payload; // Извлекаем navigate из payload
    const timer = setTimeout(() => {
      dispatch(loading(true));
    }, 250);
    const response = await axios.post<GetBaggagesRepsonse>(
      `/baggage/`,
      { ...restPayload } // Используем оставшуюся часть payload
    );
    dispatch(loading(false));
    clearTimeout(timer);
    dispatch(setBaggageData(response.data.baggages));
    dispatch(setDeliveryID(response.data.deliveryID));

    // Проверяем наличие функции navigate и вызываем ее, если она есть
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
