// baggageListSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Baggage {
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

interface BaggageListState {
  searchCode: string;
  baggageData: Baggage[];
  noResults: boolean;
}

const initialState: BaggageListState = {
  searchCode: "",
  baggageData: [],
  noResults: false,
};

const baggageListSlice = createSlice({
  name: "baggageList",
  initialState,
  reducers: {
    setSearchCode: (state, action: PayloadAction<string>) => {
      state.searchCode = action.payload;
    },
    setBaggageData: (state, action: PayloadAction<Baggage[]>) => {
      state.baggageData = action.payload;
    },
    setNoResults: (state, action: PayloadAction<boolean>) => {
      state.noResults = action.payload;
    },
  },
});

export const { setSearchCode, setBaggageData, setNoResults } =
  baggageListSlice.actions;
export default baggageListSlice.reducer;

export type { Baggage };
