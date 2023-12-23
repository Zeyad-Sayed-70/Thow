import { BACKEND_URL_FULL } from "@/constants/backendUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createAccount = createAsyncThunk(
  "account/create",
  async ({
    username,
    email,
    password,
    by,
  }: {
    username: string;
    email: string;
    password?: string;
    by?: "google" | "facebook";
  }) => {
    try {
      const response = await axios.post(`${BACKEND_URL_FULL}/account/create`, {
        username,
        email,
        password,
        by,
      });
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
  token: string | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  message: "",
  token: null,
  isSuccess: false,
  isLoading: true,
  isError: false,
};

export const createAccountSlice = createSlice({
  name: "createAccount",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createAccount.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createAccount.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.token = action.payload.token;
        state.message = action.payload.message;
      });
  },
});

export const {} = createAccountSlice.actions;

export default createAccountSlice.reducer;
