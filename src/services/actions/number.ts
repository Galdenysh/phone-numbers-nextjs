import { createAsyncThunk } from "@reduxjs/toolkit";

export const postNumber = createAsyncThunk("postNumber", (number: string, thunkAPI) => {
  fetch("/api/numbers", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      number,
    }),
  })
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.error(`[/api/numbers] ${err}`);
    });
});
