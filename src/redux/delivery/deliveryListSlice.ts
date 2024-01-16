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
  startFormationDate: string | null; // Добавлены типы для фильтров
  endFormationDate: string | null;
  deliveryStatus: string | null;
  searchFlightNumber: string | null;
}

const initialState: DeliveryState = {
  deliveries: [],
  startFormationDate: null,
  endFormationDate: null,
  deliveryStatus: null,
  searchFlightNumber: null,
};

const deliverySlice = createSlice({
  name: "deliveryList",
  initialState,
  reducers: {
    setDeliveries: (state, action: PayloadAction<Delivery[]>) => {
      state.deliveries = action.payload;
    },
    setStartFormationDate: (state, action: PayloadAction<string | null>) => {
      state.startFormationDate = action.payload;
    },
    setEndFormationDate: (state, action: PayloadAction<string | null>) => {
      state.endFormationDate = action.payload;
    },
    setDeliveryStatus: (state, action: PayloadAction<string | null>) => {
      state.deliveryStatus = action.payload;
    },
    setsearchFlightNumber: (state, action: PayloadAction<string | null>) => {
      state.searchFlightNumber = action.payload;
    },
  },
});

export const {
  setDeliveries,
  setStartFormationDate,
  setEndFormationDate,
  setDeliveryStatus,
  setsearchFlightNumber,
} = deliverySlice.actions;
export default deliverySlice.reducer;
