import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { removeItem } from "../../utils/funcs";
import { IPhoneNumber } from "../../utils/types";
import { fetchNumbers, postNumber, removeNumber } from "../actions/number";

export interface INumberState {
  data: (IPhoneNumber | undefined)[];
  isLoadingPost: boolean;
  isLoadingFetch: boolean;
  isLoadingDelete: boolean;
  errorPost: string;
  errorFetch: string;
  errorDelete: string;
}

const initialState: INumberState = {
  data: [],
  isLoadingPost: false,
  isLoadingFetch: false,
  isLoadingDelete: false,
  errorPost: "",
  errorFetch: "",
  errorDelete: "",
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
      })
      .addCase(removeNumber.fulfilled.type, (state, action: PayloadAction<IPhoneNumber>) => {
        state.data = removeItem(state.data, action.payload);
        // console.log(action.payload);
        state.isLoadingDelete = false;
        state.errorDelete = "";
      })
      .addCase(removeNumber.pending.type, (state) => {
        state.isLoadingDelete = true;
        state.errorDelete = "";
      })
      .addCase(removeNumber.rejected.type, (state, action: PayloadAction<string>) => {
        state.isLoadingDelete = false;
        state.errorDelete = action.payload;
      });
  },
});

export default numberSlice.reducer;
