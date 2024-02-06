import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../utils/axiosConfig";
import { setRequestDetails } from "./requestDetailsSlice";
import { handleError, handleSuccess } from "../../utils/notificationConfig";
import { setRequestID } from "../ship/shipListSlice";
import { loading } from "../additional/additionalSlice";

export const getRequestDetails = createAsyncThunk(
  "request/getRequestDetails",
  async (id: string, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.get(`/request/${id}`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setRequestDetails(response.data.request));
      return response.data.request;
    } catch (error) {
      handleError(error, dispatch);
      throw error; // Необходимо бросить ошибку снова, чтобы сигнализировать об ошибке в вызывающем коде
    } finally {
      clearTimeout(timer);
    }
  }
);

export const deleteDraftRequest = createAsyncThunk(
  "request/deleteRequest",
  async (id: string, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.delete(`/request/${id}`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setRequestDetails(response.data.request));
      handleSuccess(response, dispatch);
      return response.data.request;
    } catch (error) {
      handleError(error, dispatch);
      throw error; // Необходимо бросить ошибку снова, чтобы сигнализировать об ошибке в вызывающем коде
    } finally {
      clearTimeout(timer);
    }
  }
);

export const formRequest = createAsyncThunk(
  "request/formRequest",
  async (id: string, { dispatch }) => {
    let timer;
    try {
      timer = setTimeout(() => {
        dispatch(loading(true));
      }, 250);
      const response = await axios.put(`/request/${id}/status/user`);
      dispatch(loading(false));
      clearTimeout(timer);
      dispatch(setRequestID(0));
      dispatch(setRequestDetails(response.data.request));
      handleSuccess(response, dispatch);
      return response.data.request;
    } catch (error) {
      handleError(error, dispatch);
      throw error; // Необходимо бросить ошибку снова, чтобы сигнализировать об ошибке в вызывающем коде
    } finally {
      clearTimeout(timer);
    }
  }
);
