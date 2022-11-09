import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPhoneNumber } from "../../utils/types";
import { fetchNumbers, postNumber } from "../actions/number";

export interface INumberState {
  data: (IPhoneNumber | undefined)[];
  isLoadingPost: boolean;
  isLoadingFetch: boolean;
  errorPost: string;
  errorFetch: string;
}

const initialState: INumberState = {
  data: [],
  isLoadingPost: false,
  isLoadingFetch: false,
  errorPost: "",
  errorFetch: "",
};

export const numberSlice = createSlice({
  name: "number",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(postNumber.fulfilled.type, (state, action: PayloadAction<IPhoneNumber>) => {
        state.data.push(action.payload);
        state.isLoadingPost = false;
        state.errorPost = "";
      })
      .addCase(postNumber.pending.type, (state) => {
        state.isLoadingPost = true;
        state.errorPost = "";
      })
      .addCase(postNumber.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoadingPost = false;
        state.errorPost = action.payload;
      })
      .addCase(fetchNumbers.fulfilled.type, (state, action: PayloadAction<IPhoneNumber[]>) => {
        state.data = action.payload;
        state.isLoadingFetch = false;
        state.errorFetch = "";
      })
      .addCase(fetchNumbers.pending.type, (state) => {
        state.isLoadingFetch = true;
        state.errorFetch = "";
      })
      .addCase(fetchNumbers.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoadingFetch = false;
        state.errorFetch = action.payload;
      });
  },
});

export default numberSlice.reducer;
