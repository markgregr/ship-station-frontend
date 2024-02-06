// shipDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ShipDetails {
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
}

interface ShipDetailsState {
  data: ShipDetails | null;
}

const initialState: ShipDetailsState = {
  data: null,
};

const shipDetailsSlice = createSlice({
  name: "shipDetails",
  initialState,
  reducers: {
    setShipDetails: (state, action: PayloadAction<ShipDetails | null>) => {
      state.data = action.payload;
    },
  },
});

export const { setShipDetails } = shipDetailsSlice.actions;
export default shipDetailsSlice.reducer;
