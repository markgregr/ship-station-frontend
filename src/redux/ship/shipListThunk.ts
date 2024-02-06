// shipListThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import {
  setShipData,
  setRequestID,
  Ship,
  setRemoveShip,
} from "./shipListSlice";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";
import { NavigateFunction } from "react-router";

interface GetShipsRepsonse {
  ships: Ship[];
  requestID: number;
}

export const getShipList = createAsyncThunk<GetShipsRepsonse, string>(
  "shipList/getShipList",
  async (shipName, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.get<GetShipsRepsonse>(
        `/ship/?shipName=${shipName}`
      );
      dispatch(setShipData(response.data.ships));
      dispatch(setRequestID(response.data.requestID));
      return response.data;
    } catch (error) {
      handleError(error, dispatch);
      return { ships: [], requestID: 0 };
    } finally {
      clearTimeout(timer);
    }
  }
);

export const addRequest = createAsyncThunk<
  void,
  { shipID: number; shipName: string }
>("shipList/addRequest", async ({ shipID, shipName }, { dispatch }) => {
  let timer;
  try {
    timer = setTimeout(() => {
      dispatch(loading(true));
    }, 250);
    const response = await axios.post(`/ship/${shipID}/request`);
    handleSuccess(response, dispatch);

    // После успешного добавления заявки вызываем метод getShipList
    dispatch(getShipList(shipName));
  } catch (error: any) {
    handleError(error, dispatch);
    throw error;
  } finally {
    clearTimeout(timer);
  }
});

export const deleteRequest = createAsyncThunk<void, number>(
  "shipList/deleteRequest",
  async (shipID, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.delete(`/ship/${shipID}/request`);
      dispatch(setRemoveShip(shipID));
      handleSuccess(response, dispatch);
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      clearTimeout(timer);
    }
  }
);
export const deleteShip = createAsyncThunk<void, number>(
  "shipList/deleteShip",
  async (shipID, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.delete(`/ship/${shipID}`);
      dispatch(setShipData(response.data.ships));
      dispatch(setRequestID(response.data.requestID));
      handleSuccess(response, dispatch);
    } catch (error) {
      handleError(error, dispatch);
    } finally {
      clearTimeout(timer);
    }
  }
);

interface CreateShipPayload {
  flag: string;
  ship_name: string;
  ship_type: string;
  classification: string;
  crew_capacity: number;
  passenger_capacity: number;
  cargo_capacity: number;
  max_depth: number;
  max_length: number;
  year_built: number;
  navigate?: NavigateFunction;
}

export const createShip = createAsyncThunk<GetShipsRepsonse, CreateShipPayload>(
  "shipDetails/createShip",
  async (payload, { dispatch }) => {
    try {
      const { navigate, ...restPayload } = payload; // Извлекаем navigate из payload
      const timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.post<GetShipsRepsonse>(
        `/ship/`,
        { ...restPayload } // Используем оставшуюся часть payload
      );
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setShipData(response.data.ships));
      dispatch(setRequestID(response.data.requestID));

      // Проверяем наличие функции navigate и вызываем ее, если она есть
      if (navigate) {
        navigate("/ship");
      }
      handleSuccess(response, dispatch);
      return response.data;
    } catch (error) {
      handleError(error, dispatch);
      throw error;
    }
  }
);
