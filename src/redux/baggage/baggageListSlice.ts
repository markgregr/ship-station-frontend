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
  noResults: boolean;
  added: number[];
  loading: boolean;
}

const initialState: BaggageListState = {
  searchCode: "",
  baggages: [],
  deliveryID: 0,
  noResults: false,
  added: [],
  loading: false,
};

const baggageListSlice = createSlice({
  name: "baggageList",
  initialState,
  reducers: {
    setSearchCode: (state, action: PayloadAction<string>) => {
      state.searchCode = action.payload;
      state.loading = false;
    },
    setDeliveryID: (state, action: PayloadAction<number>) => {
      state.deliveryID = action.payload;
      state.loading = false;
    },
    setBaggageData: (state, action: PayloadAction<Baggage[]>) => {
      state.baggages = action.payload;
      state.loading = false;
    },
    setNoResults: (state, action: PayloadAction<boolean>) => {
      state.noResults = action.payload;
      state.loading = false;
    },
    setBaggageAdded: (state, action: PayloadAction<number>) => {
      state.added.push(action.payload);
      state.loading = false;
    },
    setRemoveBaggage: (state, action: PayloadAction<number>) => {
      const { baggages, added } = state;
      const baggageIdToRemove = action.payload;

      state.baggages = baggages.filter(
        (baggage) => baggage.baggage_id !== baggageIdToRemove
      );
      state.added = added.filter((id) => id !== baggageIdToRemove);
      state.loading = false;
    },
    loadingStart: (state) => {
      state.loading = true;
    },
  },
});

export const {
  setSearchCode,
  setBaggageData,
  setNoResults,
  setBaggageAdded,
  setDeliveryID,
  setRemoveBaggage,
  loadingStart,
} = baggageListSlice.actions;
export default baggageListSlice.reducer;

export type { Baggage, BaggageListState };
