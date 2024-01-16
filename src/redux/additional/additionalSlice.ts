// additionalSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  addDelivery,
  getBaggageList,
  deleteDelivery,
} from "../baggage/baggageListThunk";
import { getBaggageDetails } from "../baggage/baggageDetailsThunk";
import { getDeliveries } from "../delivery/deliveryListThunk";
import {
  deleteDraftDelivery,
  formDelivery,
  getDeliveryDetails,
  updateFlightNumber,
} from "../delivery/deliveryDetailsThunk";
export interface INotification {
  id: string;
  message: string;
  isError: boolean;
}

interface AdditionalState {
  loading: boolean;
  notifications: INotification[];
  result: boolean;
}

const initialState: AdditionalState = {
  loading: false,
  notifications: [],
  result: true,
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
      .addCase(addDelivery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addDelivery.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBaggageList.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getBaggageList.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDelivery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDelivery.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getBaggageDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getBaggageDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDeliveries.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getDeliveries.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getDeliveryDetails.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(getDeliveryDetails.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteDraftDelivery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(deleteDraftDelivery.rejected, (state) => {
        state.loading = false;
      })
      .addCase(formDelivery.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(formDelivery.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateFlightNumber.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(updateFlightNumber.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { loading, result, addNotification, deleteNotification } =
  additionalSlice.actions;

export default additionalSlice.reducer;
