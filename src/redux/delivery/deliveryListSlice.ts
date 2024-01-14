// deliverySlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Delivery {
  delivery_id: number;
  flight_number: string;
  creation_date: string;
  formation_date: string;
  completion_date: string;
  delivery_status: string;
  full_name: string;
}

interface DeliveryState {
  deliveries: Delivery[];
  noResults: boolean;
  startFormationDate: string | null; // Добавлены типы для фильтров
  endFormationDate: string | null;
  deliveryStatus: string | null;
  searchFlightNumber: string | null;
  loading: boolean;
}

const initialState: DeliveryState = {
  deliveries: [],
  noResults: false,
  startFormationDate: null,
  endFormationDate: null,
  deliveryStatus: null,
  searchFlightNumber: null,
  loading: false,
};

const deliverySlice = createSlice({
  name: "deliveryList",
  initialState,
  reducers: {
    setDeliveries: (state, action: PayloadAction<Delivery[]>) => {
      state.deliveries = action.payload;
      state.loading = false;
    },
    setNoResults: (state, action: PayloadAction<boolean>) => {
      state.noResults = action.payload;
      state.loading = false;
    },
    setStartFormationDate: (state, action: PayloadAction<string | null>) => {
      state.startFormationDate = action.payload;
      state.loading = false;
    },
    setEndFormationDate: (state, action: PayloadAction<string | null>) => {
      state.endFormationDate = action.payload;
      state.loading = false;
    },
    setDeliveryStatus: (state, action: PayloadAction<string | null>) => {
      state.deliveryStatus = action.payload;
      state.loading = false;
    },
    setSearchFlightNumber: (state, action: PayloadAction<string | null>) => {
      state.searchFlightNumber = action.payload;
      state.loading = false;
    },
    loadingStart: (state) => {
      state.loading = true;
    },
  },
});

export const {
  setDeliveries,
  setNoResults,
  setStartFormationDate,
  setEndFormationDate,
  setDeliveryStatus,
  setSearchFlightNumber,
  loadingStart,
} = deliverySlice.actions;
export default deliverySlice.reducer;
