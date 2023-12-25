// deliveryDetailsSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Baggage {
  // ... (ваш интерфейс Baggage)
}

interface DeliveryDetails {
  delivery_id: number;
  flight_number: string;
  creation_date: string;
  formation_date: string;
  completion_date: string;
  delivery_status: string;
  full_name: string;
  baggages: Baggage[];
}

interface DeliveryDetailsState {
  data: DeliveryDetails | null;
}

const initialState: DeliveryDetailsState = {
  data: null,
};

const deliveryDetailsSlice = createSlice({
  name: "deliveryDetails",
  initialState,
  reducers: {
    setDeliveryDetails: (
      state,
      action: PayloadAction<DeliveryDetails | null>
    ) => {
      state.data = action.payload;
    },
  },
});

export const { setDeliveryDetails } = deliveryDetailsSlice.actions;
export default deliveryDetailsSlice.reducer;
