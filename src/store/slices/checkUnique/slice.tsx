import { BACKEND_URL_FULL } from "@/constants/backendUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const checkUsernameUniqueness = createAsyncThunk(
  "check/username",
  async (username: string) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL_FULL}/account/check/username?username=${username}`
      );
      const data = await response.data.isUnique;

      console.log(response);

      return data;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

export const checkEmailUniqueness = createAsyncThunk(
  "check/email",
  async (email: string) => {
    try {
      const response = await axios.get(
        `${BACKEND_URL_FULL}/account/check/email?email=${email}`
      );
      const data = await response.data.isUnique;

      return data;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

export const checkTokensValidation = createAsyncThunk(
  "check/token",
  async (token: string) => {
    try {
      const response = await axios.post(
        `${BACKEND_URL_FULL}/account/check/token`,
        { token }
      );
      const data = await response.data.isValid;

      return data;
    } catch (error) {
      // Handle errors
      throw error;
    }
  }
);

interface InitialState {
  isUsernameUnique: boolean | null;
  isEmailUnique: boolean | null;
  isTokenValid: boolean | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  isUsernameUnique: null,
  isEmailUnique: null,
  isTokenValid: null,
  isSuccess: false,
  isLoading: false,
  isError: false,
};

export const checkUniqueSlice = createSlice({
  name: "checkUnique",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkUsernameUniqueness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkUsernameUniqueness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isUsernameUnique = action.payload;
      })
      .addCase(checkEmailUniqueness.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkEmailUniqueness.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isEmailUnique = action.payload;
      })
      .addCase(checkTokensValidation.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(checkTokensValidation.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.isTokenValid = action.payload;
      });
  },
});

export const {} = checkUniqueSlice.actions;

export default checkUniqueSlice.reducer;
