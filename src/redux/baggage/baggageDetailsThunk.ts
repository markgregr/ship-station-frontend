// baggageDetailsThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setBaggageDetails } from "./baggageDetailsSlice";

interface BaggageDetailsResponse {
  airline: string;
  baggage_code: string;
  baggage_id: number;
  baggage_status: string;
  baggage_type: string;
  owner_name: string;
  pasport_details: string;
  photo: string;
  size: string;
  weight: number;
}

export const getBaggageDetails = createAsyncThunk<
  BaggageDetailsResponse,
  string,
  {
    rejectValue: string; // Тип для значения отклоненной промисса
  }
>(
  "baggageDetails/getBaggageDetails",
  async (id, { dispatch, rejectWithValue }) => {
    try {
      const response = await axios.get<BaggageDetailsResponse>(
        `/baggage/${id}`
      );

      dispatch(setBaggageDetails(response.data));

      return response.data;
    } catch (error) {
      // Обработка ошибок при загрузке деталей багажа
      return rejectWithValue("Ошибка при загрузке деталей багажа");
    }
  }
);
