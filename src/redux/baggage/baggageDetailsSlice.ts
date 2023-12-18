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
}

const initialState: BaggageDetailsState = {
  data: null,
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
  },
});

export const { setBaggageDetails } = baggageDetailsSlice.actions;
export default baggageDetailsSlice.reducer;

// baggageDetailsActions.ts (если необходимо)
// ... Можете добавить дополнительные действия, если нужно

// baggageDetailsThunk.ts (если необходимо)
// ... Можете добавить асинхронные действия, если нужно
