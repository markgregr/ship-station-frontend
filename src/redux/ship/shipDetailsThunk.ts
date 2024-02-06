// shipDetailsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setShipDetails } from "./shipDetailsSlice";
import { handleError } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";

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
