import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { postNumber } from "../actions/number";

export interface INumberState {
  isLoading: boolean;
  error: string;
}

const initialState: INumberState = {
  isLoading: false,
  error: "",
};

export const numberSlice = createSlice({
  name: "number",
  initialState,
  reducers: {
    setNumberState(state, action: PayloadAction<string>) {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNumber.fulfilled.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = "";
      })
      .addCase(postNumber.pending.type, (state, action: PayloadAction<string>) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(postNumber.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default numberSlice.reducer;
