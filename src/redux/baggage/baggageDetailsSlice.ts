// baggageDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface BaggageDetails {
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

interface BaggageDetailsState {
  data: BaggageDetails | null;
  loading: boolean;
}

const initialState: BaggageDetailsState = {
  data: null,
  loading: false,
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
      state.loading = false;
    },
    loadingStart: (state) => {
      state.loading = true;
    },
  },
});

export const { setBaggageDetails, loadingStart } = baggageDetailsSlice.actions;
export default baggageDetailsSlice.reducer;

// baggageDetailsActions.ts (если необходимо)
// ... Можете добавить дополнительные действия, если нужно

// baggageDetailsThunk.ts (если необходимо)
// ... Можете добавить асинхронные действия, если нужно
