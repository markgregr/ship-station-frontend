// requestDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Ship } from "../ship/shipListSlice";

interface RequestDetails {
  request_id: number;
  creation_date: string;
  formation_date: string;
  completion_date: string;
  request_status: string;
  full_name: string;
  ships: Ship[];
}

interface RequestDetailsState {
  data: RequestDetails | null;
}

const initialState: RequestDetailsState = {
  data: null,
};

const requestDetailsSlice = createSlice({
  name: "requestDetails",
  initialState,
  reducers: {
    setRequestDetails: (
      state,
      action: PayloadAction<RequestDetails | null>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setRequestDetails } = requestDetailsSlice.actions;
export default requestDetailsSlice.reducer;
