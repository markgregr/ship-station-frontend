// baggageListThunk.ts
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { setNoResults, setBaggageData, Baggage } from "./baggageListSlice";

interface ApiResponse {
  baggages: Baggage[];
  delivery_id: number;
}

export const getBaggageList = createAsyncThunk<ApiResponse, string>(
  "baggageList/getBaggageList",
  async (searchCode, { dispatch }) => {
    try {
      const response = await axios.get<ApiResponse>(
        `/api/baggage/?searchCode=${searchCode}`
      );

      dispatch(setNoResults(false));
      dispatch(setBaggageData(response.data.baggages));

      return response.data;
    } catch (error) {
      dispatch(setNoResults(true));

      // Здесь можно добавить обработку ошибок или дополнительные действия при неудачном запросе

      return { baggages: [], delivery_id: 0 };
    }
  }
);
