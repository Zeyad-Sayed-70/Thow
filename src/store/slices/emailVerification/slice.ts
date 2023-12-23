import { BACKEND_URL_FULL } from "@/constants/backendUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const sendVerificationCode = createAsyncThunk(
  "verificationCode/send",
  async ({ username, email }: { username: string; email: string }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_FULL}/account/verification/email`,
        { username, email }
      );
      const data = await response.data;

      // return a boolean ###
      return data;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

export const checkVerificationCodeValid = createAsyncThunk(
  "verificationCode/check",
  async ({
    verificationCode,
    email,
  }: {
    verificationCode: string;
    email: string;
  }) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_FULL}/account/verification/email/check`,
        { email, verificationCode }
      );

      const data = await response.data;

      // return a boolean ###
      return data;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

interface InitialState {
  message: string;
  isValid: boolean | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  message: "",
  isValid: null,
  isSuccess: false,
  isLoading: true,
  isError: false,
};

export const emailVerificationSlice = createSlice({
  name: "emailVerification",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkVerificationCodeValid.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(checkVerificationCodeValid.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isValid = action.payload.isValid;
        state.message = action.payload.message;
      });
  },
});

export const {} = emailVerificationSlice.actions;

export default emailVerificationSlice.reducer;
