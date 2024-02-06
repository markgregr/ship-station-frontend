import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Ship {
  flag: string; //есть
  ship_name: string; //есть
  ship_id: number; //есть
  ship_status: string; //есть
  ship_type: string; //есть
  classification: string; //есть
  pasport_details: string;
  photo: string; //есть
  crew_capacity: number; //есть
  passenger_capacity: number; //есть
  cargo_capacity: number; //есть
  max_depth: number;
  max_length: number;
  year_built: number;
}

interface ShipChange {
  flag: string; //есть
  ship_name: string; //есть
  ship_type: string; //есть
  classification: string; //есть
  pasport_details: string;
  crew_capacity: number; //есть
  passenger_capacity: number; //есть
  cargo_capacity: number; //есть
  max_depth: number;
  max_length: number;
  year_built: number;
}

interface ShipListState {
  shipName: string;
  ships: Ship[];
  requestID: number;
  formData: ShipChange;
}

const initialState: ShipListState = {
  shipName: "",
  ships: [],
  requestID: 0,
  formData: {
    flag: "",
    ship_name: "",
    ship_type: "",
    classification: "",
    pasport_details: "",
    crew_capacity: 0,
    passenger_capacity: 0,
    cargo_capacity: 0,
    max_depth: 0,
    max_length: 0,
    year_built: 0,
  },
};

const shipListSlice = createSlice({
  name: "shipList",
  initialState,
  reducers: {
    setshipName: (state, action: PayloadAction<string>) => {
      state.shipName = action.payload;
    },
    setRequestID: (state, action: PayloadAction<number>) => {
      state.requestID = action.payload;
    },
    setShipData: (state, action: PayloadAction<Ship[]>) => {
      state.ships = action.payload;
    },
    setRemoveShip: (state, action: PayloadAction<number>) => {
      const { ships } = state;
      const shipIdToRemove = action.payload;

      state.ships = ships.filter((ship) => ship.ship_id !== shipIdToRemove);
    },
    setFormData: (state, action: PayloadAction<ShipChange>) => {
      state.formData = action.payload;
    },
  },
});

export const {
  setshipName,
  setShipData,
  setRequestID,
  setRemoveShip,
  setFormData,
} = shipListSlice.actions;
export default shipListSlice.reducer;

export type { Ship, ShipListState };
