// shipDetailsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setShipDetails } from "./shipDetailsSlice";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";
import { NavigateFunction } from "react-router-dom";

interface ShipDetailsResponse {
  ship: {
    flag: string;
    ship_name: string;
    ship_id: number;
    ship_status: string;
    ship_type: string;
    classification: string;
    pasport_details: string;
    photo: string;
    crew_capacity: number;
    passenger_capacity: number;
    cargo_capacity: number;
    max_depth: number;
    max_length: number;
    year_built: number;
  };
}

export const getShipDetails = createAsyncThunk<ShipDetailsResponse, string>(
  "shipDetails/getShipDetails",
  async (id, { dispatch }) => {
    try {
      const timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.get<ShipDetailsResponse>(`/ship/${id}`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setShipDetails(response.data.ship));
      return response.data;
    } catch (error) {
      handleError(error, dispatch);
      throw error;
    }
  }
);

export interface ShipRequest {
  flag: string;
  ship_name: string;
  ship_type: string;
  classification: string;
  pasport_details: string;
  crew_capacity: number;
  passenger_capacity: number;
  cargo_capacity: number;
  max_depth: number;
  max_length: number;
  year_built: number;
}

interface UpdateShipPayload {
  id: number; // Используем id как идентификатор судна
  ship: ShipRequest; // Используем ShipRequest для передачи данных
  navigate?: NavigateFunction | undefined;
}

export const updateShip = createAsyncThunk<
  ShipDetailsResponse,
  UpdateShipPayload
>("shipDetails/updateShip", async (payload, { dispatch }) => {
  try {
    const { navigate, ...restPayload } = payload;
    const timer = setTimeout(() => {
      dispatch(loading(true));
    }, 250);

    const response = await axios.put<ShipDetailsResponse>(
      `/ship/${payload.id}`,
      payload.ship
    );

    dispatch(loading(false));
    clearTimeout(timer);
    dispatch(setShipDetails(response.data.ship));

    if (navigate) {
      navigate("/ship");
    }
    handleSuccess(response, dispatch);
    return response.data;
  } catch (error) {
    handleError(error, dispatch);
    throw error;
  }
});

export const updateShipImage = createAsyncThunk<
  ShipDetailsResponse,
  { id: number; imageData: FormData }
>(
  "shipDetails/createShipWithImage",
  async ({ id, imageData }, { dispatch }) => {
    try {
      const timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);

      const response = await axios.post<ShipDetailsResponse>(
        `/ship/${id}/image`,
        imageData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setShipDetails(response.data.ship));
      handleSuccess(response, dispatch);
      return response.data;
    } catch (error) {
      handleError(error, dispatch);
      throw error;
    }
  }
);
