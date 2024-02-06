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
