// baggageDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Baggage } from "./baggageListSlice";

export interface BaggageDetails {
  airline: string;
  baggage_code: string;
  baggage_id: number;
  baggage_status: string;
  baggage_type: string;
  owner_name: string;
  pasport_details: string;
  photo_url: string;
  size: string;
  weight: number;
}

interface BaggageDetailsState {
  data: BaggageDetails | null;
  formData: Baggage;
}

const initialState: BaggageDetailsState = {
  data: null,
  formData: {
    airline: "",
    baggage_code: "#",
    baggage_id: 0,
    baggage_status: "",
    baggage_type: "",
    owner_name: "",
    pasport_details: "",
    photo_url: "",
    size: "",
    weight: 0,
  },
};

const baggageDetailsSlice = createSlice({
  name: "baggageDetails",
  initialState,
  reducers: {
    setBaggageDetails: (
      state,
      action: PayloadAction<BaggageDetails | null>
    ) => {
      state.data = action.payload;
    },
    setFormData: (state, action: PayloadAction<Baggage>) => {
      state.formData = action.payload;
    },
  },
});

export const { setBaggageDetails, setFormData } = baggageDetailsSlice.actions;
export default baggageDetailsSlice.reducer;
