// shipDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ship } from "./shipListSlice";

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
  formData: Ship;
}

const initialState: ShipDetailsState = {
  data: null,
  formData: {
    flag: "",
    ship_name: "#",
    ship_id: 0,
    ship_status: "",
    ship_type: "",
    classification: "",
    pasport_details: "",
    photo: "",
    crew_capacity: 0,
    passenger_capacity: 0,
    cargo_capacity: 0,
    max_depth: 0,
    max_length: 0,
    year_built: 0,
  },
};

const shipDetailsSlice = createSlice({
  name: "shipDetails",
  initialState,
  reducers: {
    setShipDetails: (state, action: PayloadAction<ShipDetails | null>) => {
      state.data = action.payload;
    },
    setFormData: (state, action: PayloadAction<Ship>) => {
      state.formData = action.payload;
    },
  },
});

export const { setShipDetails, setFormData } = shipDetailsSlice.actions;
export default shipDetailsSlice.reducer;
