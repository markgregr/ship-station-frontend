// requestListThunk.ts
import { createAsyncThunk, ThunkDispatch } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setRequests } from "./requestListSlice";
import { RootState } from "../store";
import { handleError } from "../../utils/notificationConfig";
import { loading } from "../additional/additionalSlice";

interface GetRequestsParams {
  startFormationDate: string | null;
  endFormationDate: string | null;
  requestStatus: string | null;
}

export const getRequests = createAsyncThunk<
  any,
  GetRequestsParams,
  { state: RootState; dispatch: ThunkDispatch<RootState, any, any> }
>("request/getRequests", async (params, { dispatch }) => {
  // let timer;
  try {
    // timer = setTimeout(() => {
    //   dispatch(loading(true));
    // }, 1000);
    const response = await axios.get("/request/", { params });
    dispatch(loading(false));
    // clearTimeout(timer);
    dispatch(setRequests(response.data.requests));
    return response.data;
  } catch (error) {
    handleError(error, dispatch);
    throw error;
  } finally {
    // clearTimeout(timer);
  }
});
