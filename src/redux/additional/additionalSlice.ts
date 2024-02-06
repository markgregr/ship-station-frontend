// additionalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addRequest, getShipList, deleteRequest } from "../ship/shipListThunk";
import { getShipDetails } from "../ship/shipDetailsThunk";
import { getRequests } from "../request/requestListThunk";
import {
  deleteDraftRequest,
  formRequest,
  getRequestDetails,
} from "../request/requestDetailsThunk";
export interface INotification {
  id: string;
  message: string;
  isError: boolean;
}

interface AdditionalState {
  loading: boolean;
  notifications: INotification[];
  result: boolean;
  isAdmin: boolean;
}
const authState = localStorage.getItem("authState");
let isAdmin = false;

if (authState) {
  const authData = JSON.parse(authState);
  isAdmin = authData.role === "модератор";
}
const initialState: AdditionalState = {
  loading: false,
  notifications: [],
  result: true,
  isAdmin: isAdmin,
};
function generateUniqueString(): string {
  return (
    Math.random().toString(36).substring(2) + new Date().getTime().toString(36)
  );
}
const additionalSlice = createSlice({
  name: "additional",
  initialState,
  reducers: {
    loading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
    result(state, action: PayloadAction<boolean>) {
      state.result = action.payload;
    },
    toggleAdmin(state, action: PayloadAction<boolean>) {
      state.isAdmin = action.payload;
    },
    addNotification: (
      state,
      action: PayloadAction<{ message: string; isError?: boolean }>
    ) => {
      state.notifications.push({
        message: action.payload.message,
        id: generateUniqueString(),
        isError: action.payload.isError || false,
      });
    },
    deleteNotification: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      const queue = state.notifications;
      const new_queue = queue.filter((item) => item.id !== id);
      state.notifications = new_queue;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addRequest.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getShipList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getShipList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteRequest.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getShipDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getShipDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getRequests.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getRequests.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getRequestDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getRequestDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDraftRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDraftRequest.rejected, (state) => {
        state.loading = false;
      })
      .addCase(formRequest.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(formRequest.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const {
  loading,
  result,
  addNotification,
  deleteNotification,
  toggleAdmin,
} = additionalSlice.actions;

export default additionalSlice.reducer;
