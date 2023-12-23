import { BACKEND_URL_FULL } from "@/constants/backendUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createSessionToken = createAsyncThunk(
  "reset-password/create-token",
  async ({ email }: { email: string }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_FULL}/account/reset-password/create-token`,
        {
          email,
        }
      );
      const data = await response.data;

      return data;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

export const verifySessionToken = createAsyncThunk(
  "reset-password/verify-token",
  async ({ email, token }: { email: string; token: string }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_FULL}/account/reset-password/verify-token`,
        {
          email,
          session_token: token,
        }
      );
      const data = await response.data;
      console.log(response);

      return data;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

export const resetPassword = createAsyncThunk(
  "reset-password/reset",
  async ({ email, newPassword }: { email: string; newPassword: string }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_FULL}/account/reset-password/reset`,
        {
          email,
          newPassword,
        }
      );
      const data = await response.data;

      return data;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

interface InitialState {
  message: string;
  isTokenValid: boolean | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  message: "",
  isTokenValid: null,
  isSuccess: false,
  isLoading: true,
  isError: false,
};

export const resetPasswordSlice = createSlice({
  name: "resetPassword",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createSessionToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      })
      .addCase(verifySessionToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isTokenValid = action.payload.isTokenValid;
        state.message = action.payload.message;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.message = action.payload.message;
      });
  },
});

export const {} = resetPasswordSlice.actions;

export default resetPasswordSlice.reducer;
