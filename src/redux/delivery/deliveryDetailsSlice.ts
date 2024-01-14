// deliveryDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Baggage } from "../baggage/baggageListSlice";

interface DeliveryDetails {
  delivery_id: number;
  flight_number: string;
  creation_date: string;
  formation_date: string;
  completion_date: string;
  delivery_status: string;
  full_name: string;
  baggages: Baggage[];
}

interface DeliveryDetailsState {
  data: DeliveryDetails | null;
  flight_number: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: DeliveryDetailsState = {
  data: null,
  flight_number: null,
  loading: false,
  error: null,
};

const deliveryDetailsSlice = createSlice({
  name: "deliveryDetails",
  initialState,
  reducers: {
    setDeliveryDetails: (
      state,
      action: PayloadAction<DeliveryDetails | null>
    ) => {
      state.data = action.payload;
      state.loading = false;
    },
    setFlightNumber: (state, action: PayloadAction<string | null>) => {
      state.flight_number = action.payload;
      state.loading = false;
    },
    loadingStart: (state) => {
      state.loading = true;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setDeliveryDetails, setFlightNumber, loadingStart, setError } =
  deliveryDetailsSlice.actions;
export default deliveryDetailsSlice.reducer;
