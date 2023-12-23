import { BACKEND_URL_FULL } from "@/constants/backendUrl";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const login = createAsyncThunk(
  "account/login",
  async ({ email, password }: { email: string; password: string }) => {
    try {
      const response = await axios.post(`${BACKEND_URL_FULL}/account/login`, {
        email,
        password,
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
  canLogin: boolean | null;
  token: string | null;
  isSuccess: boolean;
  isLoading: boolean;
  isError: boolean;
}

const initialState: InitialState = {
  message: "",
  canLogin: null,
  token: null,
  isSuccess: false,
  isLoading: true,
  isError: false,
};

export const loginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
        state.token = action.payload.token;
        state.canLogin = action.payload.canLogin;
        state.message = action.payload.message;
      });
  },
});

export const {} = loginSlice.actions;

export default loginSlice.reducer;
