import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Baggage {
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

interface BaggageListState {
  searchCode: string;
  baggages: Baggage[];
  deliveryID: number;
  formData: Baggage;
}

const initialState: BaggageListState = {
  searchCode: "",
  baggages: [],
  deliveryID: 0,
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
    setFormData: (state, action: PayloadAction<Baggage>) => {
      state.formData = action.payload;
    },
  },
});

export const {
  setsearchCode,
  setBaggageData,
  setDeliveryID,
  setRemoveBaggage,
  setFormData,
} = baggageListSlice.actions;
export default baggageListSlice.reducer;

export type { Baggage, BaggageListState };
