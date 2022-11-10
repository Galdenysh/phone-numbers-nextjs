import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ISocket } from "../../utils/types";

export interface ISocketState {
  id: string;
  connect: boolean;
}

const initialState: ISocketState = {
  id: "",
  connect: false,
};

export const socketSlice = createSlice({
  name: "socket",
  initialState,
  reducers: {
    addSocketStatus(state, action: PayloadAction<ISocket>) {
      state.id = action.payload.id;
      state.connect = action.payload.connect;
    },
  },
});

export default socketSlice.reducer;
