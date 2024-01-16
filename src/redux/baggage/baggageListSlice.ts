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
  baggages: Baggage[];
  deliveryID: number;
}

const initialState: BaggageListState = {
  searchCode: "",
  baggages: [],
  deliveryID: 0,
};

const baggageListSlice = createSlice({
  name: "baggageList",
  initialState,
  reducers: {
    setsearchCode: (state, action: PayloadAction<string>) => {
      state.searchCode = action.payload;
    },
    setDeliveryID: (state, action: PayloadAction<number>) => {
      state.deliveryID = action.payload;
    },
    setBaggageData: (state, action: PayloadAction<Baggage[]>) => {
      state.baggages = action.payload;
    },
    setRemoveBaggage: (state, action: PayloadAction<number>) => {
      const { baggages } = state;
      const baggageIdToRemove = action.payload;

      state.baggages = baggages.filter(
        (baggage) => baggage.baggage_id !== baggageIdToRemove
      );
    },
  },
});

export const {
  setsearchCode,
  setBaggageData,
  setDeliveryID,
  setRemoveBaggage,
} = baggageListSlice.actions;
export default baggageListSlice.reducer;

export type { Baggage, BaggageListState };
