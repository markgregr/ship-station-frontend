// requestSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Request {
  request_id: number;
  creation_date: string;
  formation_date: string;
  completion_date: string;
  request_status: string;
  full_name: string;
}

interface RequestState {
  requests: Request[];
  startFormationDate: string | null; // Добавлены типы для фильтров
  endFormationDate: string | null;
  requestStatus: string | null;
  ownerName: string | null;
}

const initialState: RequestState = {
  requests: [],
  startFormationDate: null,
  endFormationDate: null,
  requestStatus: null,
  ownerName: null,
};

const requestSlice = createSlice({
  name: "requestList",
  initialState,
  reducers: {
    setRequests: (state, action: PayloadAction<Request[]>) => {
      state.requests = action.payload;
    },
    setStartFormationDate: (state, action: PayloadAction<string | null>) => {
      state.startFormationDate = action.payload;
    },
    setEndFormationDate: (state, action: PayloadAction<string | null>) => {
      state.endFormationDate = action.payload;
    },
    setRequestStatus: (state, action: PayloadAction<string | null>) => {
      state.requestStatus = action.payload;
    },
    setOwnerName: (state, action: PayloadAction<string | null>) => {
      state.ownerName = action.payload;
    },
  },
});

export const {
  setRequests,
  setStartFormationDate,
  setEndFormationDate,
  setRequestStatus,
  setOwnerName,
} = requestSlice.actions;
export default requestSlice.reducer;
