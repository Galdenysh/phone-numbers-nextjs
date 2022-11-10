import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import { numberSlice } from "./reducers/number";
import { socketSlice } from "./reducers/socket";

const store = () =>
  configureStore({
    reducer: {
      [numberSlice.name]: numberSlice.reducer,
      [socketSlice.name]: socketSlice.reducer,
    },
    devTools: true,
  });

export type AppStore = ReturnType<typeof store>;
export type AppState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppState, unknown, Action>;

export const wrapper = createWrapper<AppStore>(store);
