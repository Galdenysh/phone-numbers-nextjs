import { createAsyncThunk } from "@reduxjs/toolkit";

export const postNumber = createAsyncThunk("number/postNumber", async (number: string, thunkAPI) => {
  try {
    return fetch("/api/numbers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        number,
      }),
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((res) => res.number);
  } catch (err) {
    thunkAPI.rejectWithValue(`[/api/numbers] ${err}`);
  }
});

export const fetchNumbers = createAsyncThunk("number/fetchNumbers", async (_, thunkAPI) => {
  try {
    return fetch("/api/numbers", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
      .then((res) => res.data);
  } catch (err) {
    thunkAPI.rejectWithValue(`[/api/numbers] ${err}`);
  }
});
