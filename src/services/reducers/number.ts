import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppState } from "../store";

export interface INumberState {
  text: string;
}

const initialState: INumberState = {
  text: "default",
};

export const numberSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    setNumberState(state, action: PayloadAction<string>) {
      state.text = action.payload;
    },
  },
});

export default numberSlice.reducer;
